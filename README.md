# Plumbing Techs of Michigan — Website

Multi-page marketing website for **Plumbing Techs of Michigan** (Oak Park & Wixom, MI).
Family-owned and operated for 40+ years. *"Quality doesn't cost, it pays."*

---

## Pages

| File | Page |
|---|---|
| `index.html` | Home — 5-second logo animation, then an **Open Website** button |
| `services.html` | All Services hub |
| `water-heaters.html` | Water Heater Services |
| `drain-cleaning.html` | Drain Cleaning |
| `repiping.html` | Whole-Home Repiping |
| `sump-pumps.html` | Sump Pumps |
| `backflow-testing.html` | Backflow Testing |
| `reviews.html` | Customer Reviews |
| `contact.html` | Contact |

## Structure

```
.
├── index.html              Home page (logo intro)
├── services.html           Services hub
├── water-heaters.html      Service page
├── drain-cleaning.html     Service page
├── repiping.html           Service page
├── sump-pumps.html         Service page
├── backflow-testing.html   Service page
├── reviews.html            Reviews page
├── contact.html            Contact page
├── styles.css              All site styling (shared by every page)
├── site.js                 Nav, icon hydration, scroll reveal, FAQ, intro
├── *.png                   Brand photography (12 images)
└── .github/workflows/      GitHub Pages deployment
```

## Running locally

Open `index.html` in a browser. No build step, no dependencies.

## Navigation

- **Services dropdown** — All Services, Water Heaters, Drain Cleaning, Repiping, Sump Pumps, Backflow Testing
- **Main nav** — Home, Services, Why Us, Reviews, Specials, Contact
- **Footer** — Quick Links and Service Pages columns

## Business details

- **Plumbing Techs of Michigan** (Pipecon, Inc.)
- Oak Park: 12700 Capital St, Oak Park, MI 48237 — **(248) 548-7488**
- Wixom: 50160 Pontiac Trail Unit 1, Wixom, MI 48393 — **(248) 438-6536**
- Hours: Monday–Friday, 8:00 AM – 4:30 PM
- Rating: 4.9★ across 767 Google reviews
- Licenses: Plumbing Contractors 8001200 · Master Plumbers 8108197–8113736

## Deployment (GitHub Pages)

This folder is ready to push to a repository as-is.

1. Push every file to the `main` branch, keeping the folder layout — including the
   hidden `.github/workflows/deploy-pages.yml`.
2. In **Settings → Pages**, set **Source** to **GitHub Actions** if it is not already set.
3. The `Deploy to GitHub Pages` workflow runs on every push to `main` and publishes
   the site at `https://<user>.github.io/<repo>/`.

The workflow uses `actions/configure-pages@v5` with `enablement: true`, which will
create the Pages site automatically when the token is permitted to do so.

### Using this ZIP to finish the GitHub upload

If the repository is missing files, extract this ZIP and drag the contents onto the
repository's upload page (`https://github.com/<user>/<repo>/upload/main`). That
creates the `main` branch and commits everything in one go, including the workflow.

## Images

Twelve PNGs live in the repository root and are referenced directly by the HTML and CSS:

`hero.png`, `vans.png`, `portrait.png`, `tankless.png`, `sump-pump.png`,
`backflow.png`, `team.png`, `handshake.png`, `dispatch.png`, `hydro-jet.png`,
`repipe.png`, `bathroom.png`.
