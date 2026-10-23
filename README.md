# A&D Billiards website

Marketing site for **A&D Billiards LLC** (North Olmsted, OH). It covers pool table moving, refelting, recushioning, installs and table sales.

Built with [Astro](https://astro.build) as a fully static site, deployed by GitHub Actions to an nginx box on EC2.

## Quick start

```bash
nvm use            # Node 22.23.4+ (Astro 7 requirement)
npm install
npm run dev        # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check `.astro` and `.ts` files |
| `npm run todos` | List every placeholder still waiting on A&D |

## Project layout

```
src/
  data/site.ts        business info, prices, services, listings, service area  ← edit content here first
  data/faqs.ts        all FAQ copy (feeds the pages and FAQPage schema)
  layouts/Base.astro  <head>, SEO tags, LocalBusiness JSON-LD, header/footer
  components/         Header, Footer, PageHero, PriceBoard, FaqList, QuoteForm, CtaBand, Todo
  pages/              one file per route
    index.astro                 /
    pool-table-moving.astro     /pool-table-moving/
    refelting-repair.astro      /refelting-repair/
    pool-tables-for-sale.astro  /pool-tables-for-sale/
    faq.astro                   /faq/  (FAQ + service area)
    service-area/[city].astro   /service-area/<city>/  (only cities with a written intro)
  assets/photos/      source photos (Astro resizes them and converts to WebP at build time)
  styles/global.css   design tokens and shared classes
deploy/               nginx config and one-time EC2 setup script
```

## Placeholders

Copy A&D still needs to confirm shows as **highlighted `[bracketed]` text** on the page. To find all of them:

- `<Todo>…</Todo>` in `.astro` files
- `null` prices and `// TODO` lines in `src/data/site.ts`. Set a price and it renders as "from $X".
- `[…]` text and `todo: true` in `src/data/faqs.ts`. Placeholder answers are left out of the FAQ schema until they're filled in.

Run `npm run todos` for the full list. Launch checklist:

- [ ] Starting prices (`prices` in `site.ts`)
- [ ] Hours, and the licensed/insured line
- [ ] Guarantee and insurance answer (moving FAQ)
- [ ] Cloth brands offered (standard and tournament)
- [ ] Delivery and setup terms for tables they sell
- [ ] Confirm the service-area city list
- [ ] Real reviews (Google or Facebook) for the home page
- [ ] Logo file (the header is a text wordmark for now)
- [ ] Original full-res photos to replace the Facebook thumbnails in `src/assets/photos/`
- [ ] Listing photos, plus a decision on how listings get updated
- [ ] Domain, then set `SITE_URL`
- [ ] Form endpoint, then set `PUBLIC_FORM_ENDPOINT`

## Quote form

The form posts to `PUBLIC_FORM_ENDPOINT`, which can be any hosted form backend (Formspree, Web3Forms, Basin and so on). If that's unset it falls back to a `mailto:` link. A hidden `_gotcha` field acts as a honeypot for Formspree-style spam filtering.

## SEO notes

- Each page has its own title, description, canonical URL and Open Graph tags.
- `LocalBusiness` JSON-LD goes on every page. Service pages also get `Service` and `FAQPage` JSON-LD.
- `sitemap-index.xml` and `robots.txt` are generated at build time.
- City pages are opt-in. Add an `intro` to a city in `serviceArea` (in `site.ts`) and it gets a page at `/service-area/<slug>/`. Write a real, specific intro for each one: the local competitors run templated city lists, and thin copy-paste city pages are something Google discounts.
- After launch, set up a Google Business Profile and link it to the site. That matters more than anything on-page for local search.

## Deploying (GitHub → EC2)

`.github/workflows/deploy.yml` runs on every push and pull request:

1. **build** (GitHub-hosted): `npm ci`, `astro check`, then `astro build`. `SITE_URL` and `PUBLIC_FORM_ENDPOINT` come from Actions variables. The build is uploaded as an artifact.
2. **deploy** (pushes to `main` only): the self-hosted runner on `ec2-scailable` copies that artifact to `/var/www/adbilliards/releases/<timestamp>`, points `current` at it, and keeps the last 5 releases.

nginx on that box already serves https://ad-billiards.brandsbe.com from `/var/www/adbilliards/current`, with `noindex` while this host is temporary.

### Actions variables

| Name | Value |
| --- | --- |
| `SITE_URL` | `https://ad-billiards.brandsbe.com` (canonical URLs, Open Graph, sitemap) |
| `PUBLIC_FORM_ENDPOINT` | form backend URL (optional; the quote form uses `mailto:` until this is set) |

### Runner

Registered to this repo as user `deploy`, name `adbilliards-ec2`, label `adbilliards`. The unit is `actions.runner.devon-brandsbe-a-and-d-billiards-site.adbilliards-ec2.service`.

To register it again, from a fresh runner directory on the server (config must not run as root):

```bash
# token: gh api -X POST repos/devon-brandsbe/a-and-d-billiards-site/actions/runners/registration-token --jq .token
./config.sh --unattended \
  --url https://github.com/devon-brandsbe/a-and-d-billiards-site \
  --token <token> \
  --name adbilliards-ec2 \
  --labels adbilliards
sudo ./svc.sh install deploy
sudo ./svc.sh start
```

**Rollback:** `ln -sfn /var/www/adbilliards/releases/<older-release> /var/www/adbilliards/current`

### Handing off to A&D later

Because the site is static, it can move almost anywhere: Netlify, Cloudflare Pages, Vercel, or GitHub Pages (none need a server), or their own host. Transfer the GitHub repo, point the domain, and set the same variables.
