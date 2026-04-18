import os, asyncio, uuid
from dotenv import load_dotenv
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from apify_client import ApifyClient
from typing import Optional

load_dotenv()

APIFY_KEY = os.getenv("APIFY_API_KEY")
client = ApifyClient(APIFY_KEY)

app = FastAPI(title="Grameen GTM API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory job store (fine for hackathon)
jobs: dict[str, dict] = {}


class PipelineRequest(BaseModel):
    brand: str
    category: str
    country: str = "Bangladesh"
    description: str = ""


class SocialRequest(BaseModel):
    keywords: list[str]
    platform: str = "instagram"


# ── helpers ──────────────────────────────────────────────────────────

def apify_google_search(query: str, max_results: int = 20) -> list[dict]:
    """Run apify/google-search-scraper and return results."""
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


def build_gtm_report(brand: str, category: str, buyer_results: list, social_results: list) -> dict:
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
        "leads_found": len(leads),
        "top_leads": leads[:10],
        "suggested_channels": suggested,
        "social_intel": social_results[:5],
        "status": "complete",
    }


async def run_pipeline_async(job_id: str, brand: str, category: str, country: str, description: str):
    jobs[job_id]["status"] = "running"
    jobs[job_id]["stage"] = "Scanning US buyers via Apify…"

    try:
        # 1 — Buyer intelligence scrape
        query = f'"{category}" buyer OR sourcing manager OR wholesale supplier United States ethical'
        buyer_results = await asyncio.to_thread(apify_google_search, query, 20)
        jobs[job_id]["buyer_results"] = buyer_results
        jobs[job_id]["stage"] = "Scraping social intelligence…"

        # 2 — Social intelligence scrape (hashtag / trend research)
        social_query = f'{brand} {category} ethical sustainable US consumer Instagram TikTok'
        social_results = await asyncio.to_thread(apify_google_search, social_query, 10)
        jobs[job_id]["social_results"] = social_results
        jobs[job_id]["stage"] = "Building GTM report…"

        # 3 — Compile report
        report = build_gtm_report(brand, category, buyer_results, social_results)
        jobs[job_id].update({"status": "complete", "stage": "Done", "report": report})

    except Exception as e:
        jobs[job_id].update({"status": "error", "error": str(e)})


# ── routes ───────────────────────────────────────────────────────────

@app.post("/api/pipeline/run")
async def start_pipeline(req: PipelineRequest, background_tasks: BackgroundTasks):
    job_id = str(uuid.uuid4())
    jobs[job_id] = {"status": "queued", "stage": "Starting…", "brand": req.brand}
    background_tasks.add_task(
        run_pipeline_async, job_id, req.brand, req.category, req.country, req.description
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


@app.get("/api/health")
async def health():
    return {"ok": True, "apify_key_set": bool(APIFY_KEY)}


# Social scrape endpoint (for reel content ideas)
@app.post("/api/social/scrape")
async def social_scrape(req: SocialRequest):
    query = " ".join(req.keywords) + f" {req.platform} trending US ethical artisan"
    results = await asyncio.to_thread(apify_google_search, query, 10)
    return {"platform": req.platform, "results": results}
