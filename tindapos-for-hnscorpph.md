# TindaPOS — Add to HNScorpPH Website

## What this file is
A handoff document for the HNScorpPH website session. Add TindaPOS as a new product card in the ecosystem — same pattern as Clerque and Steady.

---

## Product Details

| Field | Value |
|---|---|
| **Name** | TindaPOS |
| **Tagline (English)** | POS for every sari-sari store |
| **Tagline (Filipino)** | Ang POS ng bawat tindahan |
| **Status** | COMING SOON |
| **URL** | https://tindapos.hnscorpph.com |
| **Accent color** | `#F59E0B` (amber / gold) |
| **Category** | Point-of-sale · Offline-first · Micro-retail |
| **Target user** | Filipino sari-sari store owners (tindero / tindera) |

### Short description (for product card)
> Offline-first POS for sari-sari stores. Tap to sell, track stock, view profit — works without internet. Coming to Google Play.

### One-liner (for roadmap)
> Standalone mobile POS for Filipino micro-retailers. Offline, no login, no backend.

---

## App Icon SVG

Save this as `tindapos-icon.svg` in the HNScorpPH website's assets folder:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="96" fill="#F59E0B"/>
  <path d="M168 218 L344 218 L316 370 H196 Z" fill="white"/>
  <path d="M204 218 C204 160 256 148 256 148 C256 148 308 160 308 218"
        fill="none" stroke="white" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="256" y="322"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial Black, Arial, sans-serif"
        font-size="108"
        font-weight="900"
        fill="#F59E0B">₱</text>
</svg>
```

---

## Website Sections to Update

### 1. Brand Architecture — Products grid
Add a new product card alongside Clerque and Steady:

```
Icon:        [TindaPOS amber bag icon]
Status:      COMING SOON
Name:        TindaPOS
Tagline:     Ang POS ng bawat tindahan
By:          HNScorpPH
```

### 2. Roadmap — "Next" column
Add entry under the Next / UPCOMING column:

```
TindaPOS                          COMING SOON
Offline-first POS for sari-sari stores. Tap to
sell, track inventory, and view daily profit —
no internet required.
```

### 3. Brand System page (if it exists)
Add TindaPOS card alongside HNScorpPH, Clerque, Steady:

```
Icon:         [amber bag icon]
Name:         TindaPOS
Description:  Offline POS for Filipino micro-retailers. No
              login, no backend — all data stays on device.
              Ang POS ng bawat tindahan.
Button:       TindaPOS  →  https://tindapos.hnscorpph.com
```

---

## Brand / Visual Guidelines

- **Accent:** `#F59E0B` amber — warm gold, "palengke meets digital"
- **Background:** `#FAFAF8` warm white
- **Text:** `#1A1714` near-black
- **Font:** Inter (same as HNScorpPH)
- **Icon shape:** Same rounded square geometry as Clerque and Steady icons
- **Icon content:** White shopping bag + amber ₱ peso sign

---

## Tech Stack (for any About/Ecosystem deep-dive)
- Next.js 16 (static export) · React 19 · TypeScript
- Dexie (IndexedDB) — 100% offline, no backend
- Tailwind CSS v4 · Zustand · Sonner
- PWA — installable, works offline
- Hosted on Cloudflare Pages
- Google Play via TWA (in progress)

---

## Links
- **Live PWA:** https://tindapos.hnscorpph.com
- **Manifest:** https://tindapos.hnscorpph.com/manifest.json
- **GitHub:** https://github.com/hindiakoKJ/tinda-pos
