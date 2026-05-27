# narinfazlalipour.com

A quiet, hand-built personal site for Narin Fazlalipour — pre-med, neuroscience,
heart-centered medicine. Static. No framework. No build step.

## Structure

```
narin-site/
├── index.html              # the page itself — all content lives here
├── styles/
│   ├── tokens.css          # design tokens (colors, type, motion) — start here for restyles
│   ├── base.css            # reset, type, paper grain, vignette
│   ├── cursor.css          # custom "candle" cursor
│   └── sections.css        # each section's layout (hero, couch, stations, words, contact)
├── scripts/
│   ├── main.js             # entry point — wires every module
│   ├── cursor.js           # follow-cursor candle + glow
│   ├── reveal.js           # scroll-reveal observer
│   ├── stations.js         # expandable "path" stations
│   ├── couch.js            # yellow-couch interactive vignette
│   └── scripture.js        # rotating scripture / quotes
├── CNAME                   # custom domain for GitHub Pages
├── .nojekyll               # disable Jekyll processing on GH Pages
├── robots.txt
└── sitemap.xml
```

The site is intentionally modular so it iterates cleanly:

- **To change colors / type / motion:** edit `styles/tokens.css` only.
- **To add a new section:** add a `<section>` in `index.html`, write its layout
  styles in `styles/sections.css`, and (if it has behavior) drop a new module
  in `scripts/` and import it from `scripts/main.js`.
- **To add a new "station" on the path:** copy one `.station` block in
  `index.html`. The JS picks it up automatically.
- **To add a new scripture / quote:** add another `<blockquote class="scripture">`
  inside `.scripture-stack` — the rotator handles the rest.

## Local preview

No build step. From inside this folder:

```bash
python3 -m http.server 4000
# then open http://localhost:4000
```

(Plain `open index.html` works too, but ES modules require a local server
in some browsers.)

## Deploying to GitHub Pages + Cloudflare

Domain: `narinfazlalipour.com` (registered on Cloudflare).

### 1. Create the GitHub repo

Create a new GitHub account for Narin, then create a repository named:

```
<her-username>.github.io
```

…and push the **contents** of this `narin-site/` folder to the root of that repo
(not the folder itself — the files inside it).

```bash
cd narin-site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:<her-username>/<her-username>.github.io.git
git push -u origin main
```

### 2. Enable Pages

Repo → **Settings → Pages**

- Source: **Deploy from a branch**
- Branch: **main** / **/ (root)**

GitHub will read the `CNAME` file and serve at `narinfazlalipour.com`.

### 3. Point Cloudflare DNS

In the Cloudflare dashboard for `narinfazlalipour.com`, add **DNS records**:

| Type  | Name | Content                  | Proxy   |
|-------|------|--------------------------|---------|
| A     | @    | 185.199.108.153          | DNS only |
| A     | @    | 185.199.109.153          | DNS only |
| A     | @    | 185.199.110.153          | DNS only |
| A     | @    | 185.199.111.153          | DNS only |
| CNAME | www  | `<her-username>.github.io` | DNS only |

> Set the proxy to **DNS only** (grey cloud) for the first issuance so GitHub
> can provision its Let's Encrypt cert. After "Enforce HTTPS" is available in
> GitHub Pages settings (usually within ~30 min), you can switch the proxy to
> orange and turn on Cloudflare SSL = **Full (strict)**.

### 4. Done

`https://narinfazlalipour.com` will serve this site.

## Design notes — what's intentional

- **Palette:** lifted directly from Narin's mood boards — chocolate, umber,
  sky blue, beige, with warm city-light gold (`--ember`, `--candle`) and a
  cream paper ground.
- **Type:** Cormorant Garamond for warmth and italics that breathe;
  Inter for body; JetBrains Mono for the small, intentional marks.
- **Cursor:** a literal "candle" you carry through the page — small ink dot
  on light sections, warm glow on dark ones. Removed on touch devices.
- **Hero breathing orb:** a 7-second inhale/exhale, matching common 4-3
  meditation cadences.
- **Yellow Couch:** the only literal illustration on the site. Click it —
  the quote that locked everything into place appears.
- **Stations:** each life chapter is collapsible, so the page stays quiet
  by default and rewards curiosity.
- **Words:** scripture and self-notes rotate every 6.5s on a dark, lit ground.

Everything respects `prefers-reduced-motion`.

## Roadmap

- [ ] Add real headshot / brand photography (replace breathing orb in hero?)
- [ ] Add a `/notes` or `/writing` page (the "coming soon" card already links nowhere)
- [ ] Add OG image / social preview cards
- [ ] Add analytics (Plausible or Cloudflare Web Analytics — privacy-first)
