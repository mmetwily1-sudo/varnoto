# VARNOTO — Modern Menswear 🇪🇬
*Built for the Bold.*

Final brand name (verified 2026-09-09): `varnoto.com` ✅ available + no existing clothing brand under this name (independent RDAP + web-search verification).

Original demo e-commerce inspired by galvanoegy.com (layout vibe only — all text, code & design are original, no copied images).

Live demo: GitHub Pages (after push → Settings → Pages → Deploy from branch).

## Features
- Bilingual AR (RTL) / EN with one-click toggle
- Announcement bar (free shipping 1999+ EGP)
- Hero + 8 collections (T-shirts, Linen, Jeans, Sweatpants, Tailored, Knitted, Tank, Regular)
- Best sellers grid with filters + search + discounts + sold-out badges
- Cart drawer with localStorage + quantities + total
- Quick-view modal + sizes S–XXL
- Checkout via WhatsApp order message + COD note
- Responsive + SEO meta

## Brand decision (verified 2026-09-09 via RDAP + brand-conflict search)
- **VARNOTO** → varnoto.com ✅ AVAILABLE, no clothing-brand conflict (chosen)
- Rejected: VELMORA/VELMO (existing fashion uses), VARNO (active UK streetwear competitor), VARENO/VELARO/ELVARO (active fashion uses), ROVANO (active menswear)

## Photography
Real model photography via Pexels (free license, no attribution required) in `assets/` — every image visually verified before publishing. Rejected AI generation (rate-limited + off-brief) and heavy GitHub mockup SaaS boilerplates (ThreadForge etc.) as overkill for a static store.
## Cloud backend (Supabase)
- `supabase-schema.sql` — run once in Supabase SQL Editor (table `store_config` + public read/write policies).
- `app.js` — `boot()` pulls the cloud config on every visit (localStorage fallback), live Realtime updates included.
- `admin.html` — every save writes locally + PATCHes Supabase; sync status shown in the dashboard.
- To activate: create a free project at supabase.com → run the SQL → paste Project URL + anon key into `app.js` + `admin.html` (`__SUPABASE_URL__` / `__SUPABASE_KEY__`) → push.

## Run locally
```bash
cd velmora
python -m http.server 8000
# open http://localhost:8000
```

## Deploy
Push to GitHub → enable Pages.
