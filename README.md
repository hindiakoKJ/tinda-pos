# TindaPOS

**Ang POS ng bawat tindahan** — a simple, offline-first Point-of-Sale app for Filipino sari-sari stores.

All data stays on the device (IndexedDB). No login, no cloud, no backend.

---

## Modules

| Route | Filipino Name | What it does |
|---|---|---|
| `/buod` | Buod | Dashboard — today's sales, profit, expenses, top sellers, low stock |
| `/pos` | Benta | POS terminal — tap to add, cart, checkout, sukli |
| `/paninda` | Paninda | Inventory — add/edit/delete products, low stock alerts |
| `/benta` | Kasaysayan | Sales history — by day/week/month, per-sale breakdown |
| `/kita` | Kita | Profit tracking — COGS vs revenue, margin % per product |
| `/gastos` | Gastos | Expense tracker — daily expenses, by category, reduces net profit |

---

## Running Locally

```bash
cd tinda-pos
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/buod`.

On first load, 12 sample sari-sari store products are seeded automatically.

---

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** — amber/gold design system ("Palengke Meets Digital")
- **Dexie** (IndexedDB) — all data on device, offline-first
- **Zustand** — cart state
- **`@ducanh2912/next-pwa`** — service worker + offline cache
- **Radix UI** + **shadcn/ui patterns** — accessible components

---

## Deploying to Cloudflare Pages

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: initial TindaPOS"
git remote add origin https://github.com/YOUR_USERNAME/tinda-pos.git
git push -u origin main
```

### 2. Cloudflare Pages setup
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project**
2. Connect your GitHub repo
3. Set build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run build`
   - **Build output directory:** `.next`
4. Add environment variable: `NODE_VERSION = 20`
5. Deploy

Your app will be live at `https://tindapos.hnscorpph.com` (or your custom domain).

### 3. Custom domain (optional)
In Cloudflare Pages → your project → **Custom domains** → add your domain.

---

## Google Play Store via TWA (Trusted Web Activity)

After your Cloudflare Pages URL is live:

### Prerequisites
- Java JDK 11+ installed
- Android SDK / Android Studio installed
- Google Play Developer account ($25 one-time fee)

### Steps

```bash
# Install Bubblewrap CLI
npm install -g @bubblewrap/cli

# Initialize TWA project (replace URL with your Cloudflare Pages URL)
mkdir tinda-pos-twa && cd tinda-pos-twa
bubblewrap init --manifest https://tindapos.hnscorpph.com/manifest.json
```

When prompted:
- **Package name:** `com.hnscorp.tindapos`
- **App name:** `TindaPOS`
- **Display mode:** `standalone`
- **Theme color:** `#F59E0B`

```bash
# Build the APK/AAB
bubblewrap build
```

### Digital Asset Links
Bubblewrap generates a `assetlinks.json` fingerprint. Replace the placeholder in:
```
public/.well-known/assetlinks.json
```
Then redeploy to Cloudflare Pages.

### Upload to Play Console
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app → **TindaPOS**
3. Upload the signed `.aab` from `bubblewrap build` output
4. Start with **Internal Testing** → promote to Production

---

## Data & Privacy

- All data is stored locally on the device in IndexedDB (`tinda-pos-db`)
- No data is sent to any server — no analytics, no tracking
- To reset: browser Settings → Site Data → Clear for this site
