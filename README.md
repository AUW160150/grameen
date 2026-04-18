# 🌾 Grameen — GTM Platform for South Asian & African Premium Brands

> **Hackathon project** — Turn established artisan brands like Aarong into US market contenders using autonomous GTM agents, Apify web intelligence, and social automation.

---

## What is Grameen?

Grameen is a B2B GTM platform that helps premium South Asian and African brands (think **Aarong**, **Fab India**, **Khaadi**) crack the US market. These brands already have world-class handloom textiles, organic foods, and artisan goods — they just lack the US distribution, buyer relationships, and marketing infrastructure to reach American consumers.

**Grameen fixes that with autonomous agents:**

1. **Brand onboarding** — field worker or brand manager speaks in any language (Bengali, Hindi, Swahili…); OpenAI Whisper transcribes and an agent builds a US market GTM brief
2. **Apify Buyer Intelligence** — scrapes US ethical retailers, specialty stores, and LinkedIn procurement managers that match the brand's ICP
3. **Automated outreach** — personalized pitch emails and buyer decks drafted and sent autonomously
4. **Social content & reels** — Instagram Reels and TikTok scripts generated from brand imagery, optimized for US audiences
5. **Live GTM dashboard** — watch every agent run in real-time; see buyer pipeline, open rates, and revenue projections

---

## Product focus

| Category | Example products | US channel |
|---|---|---|
| Handloom textiles | Jamdani sarees, kantha quilts, block-print apparel | Anthropologie, World Market, Reformation |
| Organic food | Cold-pressed wheat, moringa, mustard oil, turmeric | Whole Foods, Thrive Market, Sprouts |
| Handicrafts | Jute bags, brass Dhokra, terracotta | Ten Thousand Villages, West Elm |
| Beauty & wellness | Raw shea butter, virgin coconut oil | Credo Beauty, The Detox Market |

---

## Tech stack

### Frontend
- **React 18 + Vite** — fast SPA with React Router
- **Tailwind CSS** — earthy warm palette (terracotta, cream, sage)
- **Framer Motion** — organic animations
- **lucide-react** — icons

### Backend
- **FastAPI** (Python) — REST API for pipeline orchestration
- **Apify Client** — fires real actor runs (Google Search scraper for US buyer discovery)
- **python-dotenv** — env management

### AI / Agents
- **OpenAI Whisper** — voice transcription in any language (brand onboarding flow)
- **Apify actors** — web intelligence: buyer scraping, social trend analysis, pricing benchmarks
- **GPT-4o** — GTM brief generation, pitch drafting, reel scripts

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing — full-bleed hero, brand pitch, signup |
| `/dashboard` | Live Apify GTM agent orchestration dashboard |
| `/signup` | Brand application form |

---

## Getting started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Apify account + API key

### 1. Clone

```bash
git clone https://github.com/AUW160150/grameen.git
cd grameen
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # add your keys
npm run dev
```

Frontend runs at **http://localhost:5173**

### 3. Backend

```bash
# From project root — activate the venv
source grameen/bin/activate   # or: python -m venv grameen && source grameen/bin/activate
pip install -r backend/requirements.txt

cd backend
cp .env.example .env   # add your Apify key
uvicorn main:app --reload --port 8000
```

Backend runs at **http://localhost:8000**  
API docs: **http://localhost:8000/docs**

---

## Environment variables

### `frontend/.env`
```
VITE_APIFY_API_KEY=your_apify_key
VITE_APIFY_USER_ID=your_apify_user_id
VITE_API_BASE=http://localhost:8000
```

### `backend/.env`
```
APIFY_API_KEY=your_apify_key
APIFY_USER_ID=your_apify_user_id
```

---

## How the GTM pipeline works

```
Brand speaks (any language)
        ↓
  Whisper transcribes
        ↓
  Agent builds GTM brief
        ↓
  Apify scrapes US buyers ──→ Contact enrichment ──→ Outreach emails
        ↓
  Social scraper (hashtags, trends)
        ↓
  Reel + content generator
        ↓
  Live dashboard (leads · open rates · revenue projection)
```

When you press **"Run pipeline"** on the dashboard, it:
1. Fires a real Apify actor run (Google Search scraper) targeting US ethical buyers for the brand's category
2. Runs an animated demo in parallel so the UX is immediate
3. Injects real scraped leads into the log when the Apify run completes (~2–3 min)

---

## API endpoints

```
GET  /api/health                    — health check + Apify key status
POST /api/pipeline/run              — start a GTM pipeline run
GET  /api/pipeline/status/{job_id}  — poll run status
GET  /api/pipeline/results/{job_id} — fetch scraped leads + GTM report
POST /api/social/scrape             — social trend intelligence scrape
```

---

## Hackathon context

**Theme:** Turn GTM busywork into autonomous agents  
**Target prize:** Apify ($500) — platform is built around Apify as the core web intelligence layer  
**Differentiator:** Real-world impact (artisan cooperative supply chains) + complete autonomous GTM funnel

---

## Project structure

```
grameen/
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx     # Main landing page
│   │   │   ├── Dashboard.jsx   # Live Apify agent dashboard
│   │   │   └── Signup.jsx      # Brand application
│   │   └── components/
│   │       ├── Hero.jsx            # Full-bleed image hero
│   │       ├── VoiceWidget.jsx     # Whisper voice onboarding demo
│   │       ├── BrandPartners.jsx   # Target brand showcase
│   │       ├── Features.jsx        # Platform feature cards
│   │       ├── HowItWorks.jsx      # 5-step process
│   │       ├── Impact.jsx          # Market opportunity stats
│   │       ├── SignupSection.jsx   # Early access form
│   │       ├── Nav.jsx             # Sticky navigation
│   │       └── Footer.jsx
│   └── public/
│       ├── grameen1.jpg        # Cooperative members photo
│       └── grameen2.jpg        # Artisan weaving photo
├── backend/                # FastAPI + Apify integration
│   ├── main.py
│   └── requirements.txt
└── README.md
```

---

## License

MIT
