import os, asyncio, uuid, io
from dotenv import load_dotenv
from fastapi import FastAPI, BackgroundTasks, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from apify_client import ApifyClient
from typing import Optional
import pdfplumber
import docx
import httpx

load_dotenv()

APIFY_KEY = os.getenv("APIFY_API_KEY")
APOLLO_KEY = os.getenv("APOLLO_API_KEY", "")
client = ApifyClient(APIFY_KEY)

app = FastAPI(title="Grameen GTM API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

jobs: dict[str, dict] = {}


class PipelineRequest(BaseModel):
    brand: str
    category: str
    country: str = "Bangladesh"
    description: str = ""
    brand_brief: str = ""  # parsed content from URL or document


class SocialRequest(BaseModel):
    keywords: list[str]
    platform: str = "instagram"


# ── helpers ──────────────────────────────────────────────────────────

def apify_google_search(query: str, max_results: int = 20) -> list[dict]:
    run = client.actor("apify/google-search-scraper").call(run_input={
        "queries": query,
        "maxPagesPerQuery": 1,
        "resultsPerPage": max_results,
        "languageCode": "en",
        "countryCode": "us",
    })
    items = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        for r in item.get("organicResults", []):
            items.append({
                "title": r.get("title"),
                "url": r.get("url"),
                "description": r.get("description"),
            })
    return items[:max_results]


def apollo_people_search(company: str, titles: list[str] | None = None) -> list[dict]:
    """
    Search Apollo.io for buyers at a given company.
    Returns name, title, LinkedIn URL, and (masked) email from Apollo free tier.
    Falls back to Apify LinkedIn Google search if no Apollo key is set.
    """
    if not APOLLO_KEY:
        return _linkedin_search_fallback(company)

    if titles is None:
        titles = ["sourcing manager", "buyer", "procurement manager",
                  "category manager", "VP sourcing", "director of sourcing"]
    try:
        resp = httpx.post(
            "https://api.apollo.io/api/v1/mixed_people/search",
            headers={"Content-Type": "application/json", "Cache-Control": "no-cache"},
            json={
                "api_key": APOLLO_KEY,
                "q_organization_names": [company],
                "person_titles": titles,
                "per_page": 5,
                "page": 1,
            },
            timeout=20,
        )
        resp.raise_for_status()
        data = resp.json()
        contacts = []
        for p in data.get("people", []):
            email = p.get("email") or ""
            # Apollo masks emails on free tier as "u***@domain.com" — mark as masked
            email_display = email if (email and "***" not in email) else f"Reveal via Apollo ({email})"
            contacts.append({
                "name": p.get("name", "Unknown"),
                "role": p.get("title", "Buyer"),
                "company": company,
                "linkedin_url": p.get("linkedin_url"),
                "email": email_display,
                "source": "Apollo.io",
            })
        return contacts
    except Exception as e:
        # Fall back to Apify LinkedIn search if Apollo fails
        return _linkedin_search_fallback(company)


def _linkedin_search_fallback(company: str) -> list[dict]:
    """Apify Google search for LinkedIn profiles — used when Apollo key is absent or fails."""
    query = f'site:linkedin.com/in "{company}" (sourcing OR buyer OR procurement)'
    results = apify_google_search(query, max_results=5)
    contacts = []
    for r in results:
        parts = (r.get("title") or "").split(" - ")
        contacts.append({
            "name": parts[0].strip() if parts else "Unknown",
            "role": parts[1].strip() if len(parts) > 1 else "Buyer",
            "company": company,
            "linkedin_url": r.get("url"),
            "email": "Add Apollo.io key to reveal email",
            "source": "Apify LinkedIn search (fallback)",
        })
    return contacts


def apify_scrape_url(url: str) -> str:
    """Scrape a brand website using Apify website-content-crawler. Returns extracted text."""
    try:
        run = client.actor("apify/website-content-crawler").call(run_input={
            "startUrls": [{"url": url}],
            "maxCrawlPages": 5,
            "maxCrawlDepth": 1,
            "outputFormats": ["markdown"],
        })
        chunks = []
        for item in client.dataset(run["defaultDatasetId"]).iterate_items():
            text = item.get("markdown") or item.get("text") or ""
            if text:
                chunks.append(text[:2000])
            if len(chunks) >= 3:
                break
        return "\n\n".join(chunks)[:5000]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"URL scrape failed: {str(e)}")


def extract_text_from_pdf(data: bytes) -> str:
    with pdfplumber.open(io.BytesIO(data)) as pdf:
        pages = [p.extract_text() or "" for p in pdf.pages[:10]]
    return "\n".join(pages)[:5000]


def extract_text_from_docx(data: bytes) -> str:
    doc = docx.Document(io.BytesIO(data))
    return "\n".join(p.text for p in doc.paragraphs if p.text.strip())[:5000]


def build_buyer_query(brand: str, category: str, brand_brief: str) -> str:
    """Build a smart buyer search query, enriched by brand brief if provided."""
    base = f'"{category}" buyer OR "sourcing manager" OR "wholesale supplier" United States ethical'
    if brand_brief:
        # Extract up to 3 keyword phrases from the brief to sharpen the query
        words = [w for w in brand_brief.lower().split() if len(w) > 5]
        unique = list(dict.fromkeys(words))[:6]
        extras = " ".join(unique[:3])
        return f'{base} {extras}'
    return base


def build_gtm_report(brand: str, category: str, buyer_results: list, social_results: list, brand_brief: str = "") -> dict:
    category_map = {
        "Handloom textiles & apparel": ["Anthropologie", "World Market", "Reformation", "Eileen Fisher"],
        "Organic food & agriculture":  ["Whole Foods Market", "Thrive Market", "Sprouts", "Natural Grocers"],
        "Handicrafts & home goods":    ["West Elm", "Ten Thousand Villages", "World Market", "Crate & Barrel"],
        "Beauty & wellness":           ["The Detox Market", "Credo Beauty", "Grove Collaborative", "Erewhon"],
    }
    suggested = category_map.get(category, ["Specialty US retailers"])

    leads = []
    for r in buyer_results:
        title = r.get("title", "")
        url   = r.get("url", "")
        desc  = r.get("description", "")
        score = 0.70
        for name in suggested:
            if name.lower() in title.lower() or name.lower() in url.lower():
                score = 0.90
                break
        if "buyer" in desc.lower() or "sourcing" in desc.lower() or "wholesale" in desc.lower():
            score = min(score + 0.05, 0.98)
        leads.append({"company": title[:60], "url": url, "snippet": desc[:120], "score": round(score, 2)})

    leads.sort(key=lambda x: x["score"], reverse=True)

    return {
        "brand": brand,
        "category": category,
        "brand_brief_used": bool(brand_brief),
        "leads_found": len(leads),
        "top_leads": leads[:10],
        "suggested_channels": suggested,
        "social_intel": social_results[:5],
        "status": "complete",
    }


async def run_pipeline_async(job_id: str, brand: str, category: str, country: str, description: str, brand_brief: str):
    jobs[job_id]["status"] = "running"
    jobs[job_id]["stage"] = "Scanning US buyers via Apify…"

    try:
        # Step 1: Buyer discovery
        query = build_buyer_query(brand, category, brand_brief)
        buyer_results = await asyncio.to_thread(apify_google_search, query, 20)
        jobs[job_id]["buyer_results"] = buyer_results
        jobs[job_id]["stage"] = "Finding buyer contacts via LinkedIn search…"

        # Step 2: Contact enrichment — real LinkedIn search for top companies found
        category_map = {
            "Handloom textiles & apparel": ["Anthropologie", "World Market", "Reformation"],
            "Organic food & agriculture":  ["Whole Foods Market", "Thrive Market", "Sprouts"],
            "Handicrafts & home goods":    ["West Elm", "Ten Thousand Villages", "World Market"],
            "Beauty & wellness":           ["The Detox Market", "Credo Beauty", "Grove Collaborative"],
        }
        top_companies = category_map.get(category, [])[:2]
        linkedin_contacts = []
        for company in top_companies:
            contacts = await asyncio.to_thread(apollo_people_search, company)
            linkedin_contacts.extend(contacts)
        jobs[job_id]["linkedin_contacts"] = linkedin_contacts
        jobs[job_id]["stage"] = "Scraping social intelligence…"

        # Step 3: Social intelligence
        social_query = f'{brand} {category} ethical sustainable US consumer Instagram TikTok'
        social_results = await asyncio.to_thread(apify_google_search, social_query, 10)
        jobs[job_id]["social_results"] = social_results
        jobs[job_id]["stage"] = "Building GTM report…"

        report = build_gtm_report(brand, category, buyer_results, social_results, brand_brief)
        report["linkedin_contacts"] = linkedin_contacts
        jobs[job_id].update({"status": "complete", "stage": "Done", "report": report})

    except Exception as e:
        jobs[job_id].update({"status": "error", "error": str(e)})


# ── routes ───────────────────────────────────────────────────────────

@app.post("/api/pipeline/run")
async def start_pipeline(req: PipelineRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "queued", "stage": "Starting…", "brand": req.brand}
    background_tasks.add_task(
        run_pipeline_async, job_id, req.brand, req.category, req.country, req.description, req.brand_brief
    )
    return {"job_id": job_id, "status": "queued"}


@app.get("/api/pipeline/status/{job_id}")
async def pipeline_status(job_id: str):
    job = jobs.get(job_id)
    if not job:
        return {"status": "not_found"}
    return {
        "job_id": job_id,
        "status": job["status"],
        "stage": job.get("stage"),
        "leads_found": len(job.get("buyer_results", [])),
    }


@app.get("/api/pipeline/results/{job_id}")
async def pipeline_results(job_id: str):
    job = jobs.get(job_id)
    if not job:
        return {"error": "not found"}
    return job.get("report", {"status": job["status"], "stage": job.get("stage")})


@app.post("/api/brand/from-url")
async def brand_from_url(url: str):
    """Scrape a brand website via Apify and return extracted text for the GTM brief."""
    text = await asyncio.to_thread(apify_scrape_url, url)
    return {"url": url, "text": text, "chars": len(text)}


@app.post("/api/brand/from-doc")
async def brand_from_doc(file: UploadFile = File(...)):
    """Parse an uploaded PDF, DOCX, or TXT file and return extracted text."""
    data = await file.read()
    filename = (file.filename or "").lower()

    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(data)
    elif filename.endswith(".docx"):
        text = extract_text_from_docx(data)
    elif filename.endswith(".txt"):
        text = data.decode("utf-8", errors="replace")[:5000]
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type. Upload PDF, DOCX, or TXT.")

    return {"filename": file.filename, "text": text, "chars": len(text)}


@app.get("/api/brand/enrich-contacts")
async def enrich_contacts(company: str):
    """Find buyer contacts at a company via Apollo.io (with Apify LinkedIn search fallback)."""
    contacts = await asyncio.to_thread(apollo_people_search, company)
    source = "Apollo.io" if APOLLO_KEY else "Apify google-search-scraper → site:linkedin.com (fallback)"
    return {"company": company, "contacts": contacts, "source": source, "apollo_key_set": bool(APOLLO_KEY)}


@app.get("/api/health")
async def health():
    return {"ok": True, "apify_key_set": bool(APIFY_KEY)}


@app.post("/api/social/scrape")
async def social_scrape(req: SocialRequest):
    query = " ".join(req.keywords) + f" {req.platform} trending US ethical artisan"
    results = await asyncio.to_thread(apify_google_search, query, 10)
    return {"platform": req.platform, "results": results}
