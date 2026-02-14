# DadLifts — Deployment & Maintenance Guide

## The World Needs Strong Dads.

---

## What's In This Project

```
dadlifts/
├── public/
│   └── favicon.svg          # Browser tab icon (D-L barbell mark)
├── src/
│   ├── App.jsx              # The entire app (all screens, data, styles)
│   └── main.jsx             # React entry point
├── index.html               # HTML shell with SEO meta tags
├── package.json             # Dependencies and scripts
├── vite.config.js           # Build config + PWA settings
├── vercel.json              # Vercel routing config
├── .gitignore               # Files to exclude from Git
└── README.md                # This file
```

---

## Step-by-Step Deployment

### 1. Create a GitHub Repository

Go to github.com and create a new repository called `dadlifts` (or whatever you prefer). Keep it public or private — either works with Vercel.

### 2. Push the Code

Open your terminal and run:

```bash
cd dadlifts
git init
git add .
git commit -m "DadLifts v1.0 — The World Needs Strong Dads"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/dadlifts.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 3. Install Dependencies Locally (Optional — for local testing)

```bash
npm install
npm run dev
```

This runs the app locally at http://localhost:5173. You can test everything before deploying.

### 4. Deploy to Vercel

1. Go to **vercel.com** and sign in with your GitHub account
2. Click **"Add New Project"**
3. Select your `dadlifts` repository
4. Vercel will auto-detect it's a Vite project — no configuration needed
5. Click **"Deploy"**
6. Wait about 60 seconds. Your app is now live at a `.vercel.app` URL.

### 5. Connect Your Custom Domain

1. In Vercel, go to your project → **Settings** → **Domains**
2. Type in your domain (e.g., `dadlifts.com` or `app.dadlifts.com`)
3. Vercel will give you DNS records to add at your domain registrar
4. Add those records (usually a CNAME or A record)
5. Wait a few minutes for DNS to propagate
6. Your app is now live at your custom domain with automatic HTTPS

---

## How to Make Changes

### Edit workout content, exercises, tips:
All workout data is in `src/App.jsx` in the `WORKOUTS` object. Each equipment tier (`fullGym`, `dumbbellBench`) contains three workout days, each with exercises. Just edit the text and push to GitHub — Vercel auto-deploys.

### Edit educational articles:
The `EDUCATION` array in `src/App.jsx` contains all Learn tab content. Add, remove, or edit articles there.

### Change colors:
The color palette is defined in the `c` object near the top of `src/App.jsx`. Every color in the app references this object.

### Add the bodyweight equipment tier:
1. Add a `bodyweight` array to the `WORKOUTS` object following the same structure as `fullGym` and `dumbbellBench`
2. Add a third option to the `EquipmentModal` component
3. Update the `Header` component to show the new option name

### General workflow for any change:
```bash
# Make your edits in src/App.jsx
npm run dev              # Test locally
git add .
git commit -m "Description of change"
git push                 # Vercel auto-deploys
```

---

## PWA Icons (Action Required)

The app is configured as a PWA (installable on phones), but you need to provide icon images. Create these files and put them in the `public/` folder:

- `pwa-192x192.png` — 192x192 pixel version of your logo
- `pwa-512x512.png` — 512x512 pixel version of your logo
- `apple-touch-icon.png` — 180x180 pixel version for iOS
- `og-image.png` — 1200x630 pixel image for social media link previews

Use your D-L barbell mark from the green/cream logo set. The green background (#2B3A2B) with the cream mark (#F2EDE3) will look sharp.

---

## Things to Know

### User Data
Progress is stored in the browser's localStorage. This means:
- Data persists between sessions on the same device/browser
- Clearing browser data wipes progress
- Data doesn't sync across devices
- This is a known V1 limitation — V2 adds user accounts and cloud storage

### Performance
- The entire app is a single page — no server calls, no loading spinners
- Works offline once loaded (PWA service worker caches everything)
- No external API dependencies

### Browser Support
- All modern browsers (Chrome, Safari, Firefox, Edge)
- iOS Safari: full support including "Add to Home Screen"
- Android Chrome: full support including install prompt

---

## V2 Roadmap (When You're Ready)

These are the features to consider once you have users:

1. **User accounts + cloud storage** — Supabase or Firebase backend. Progress syncs across devices.
2. **Bodyweight equipment tier** — Expand to three equipment levels.
3. **Weight logging** — Let dads track actual weights used per exercise.
4. **Progress charts** — Visualize strength gains over time.
5. **Push notifications** — "It's workout day" reminders.
6. **Community features** — Optional accountability with other dads.
7. **Native mobile apps** — React Native for App Store / Google Play.

---

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool (fast builds, hot reload)
- **vite-plugin-pwa** — Service worker + install prompt
- **Vercel** — Hosting and deployment
- **localStorage** — Client-side data persistence

No database. No backend. No API keys. No recurring costs beyond your domain.

---

Built for dads, by a dad.
