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

`.github/workflows/deploy.yml` runs on every push and PR:

1. **build**: `npm ci`, `astro check`, then `astro build`, uploading `dist/` as an artifact.
2. **deploy** (pushes to `main` only, and only when enabled): rsyncs the build to `releases/<timestamp>` on the server, atomically points `current` at it, and keeps the last 5 releases for rollback.

### One-time setup

**On the EC2 instance:**

```bash
APP_DIR=/var/www/adbilliards DEPLOY_USER=ubuntu bash deploy/ec2-setup.sh
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/adbilliards   # edit server_name
sudo ln -s /etc/nginx/sites-available/adbilliards /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**Create a deploy key** (on your machine, no passphrase):

```bash
ssh-keygen -t ed25519 -f ad-deploy -C "github-actions-adbilliards" -N ""
# then append ad-deploy.pub to ~ubuntu/.ssh/authorized_keys on the server
```

**In GitHub**, under Settings → Secrets and variables → Actions:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `EC2_HOST` | server IP or hostname |
| Secret | `EC2_USER` | e.g. `ubuntu` |
| Secret | `EC2_SSH_KEY` | contents of the private key `ad-deploy` |
| Secret | `EC2_PATH` | e.g. `/var/www/adbilliards` |
| Variable | `DEPLOY_ENABLED` | `true` (deploys are skipped until this is set) |
| Variable | `SITE_URL` | e.g. `https://adbilliards.example.com` |
| Variable | `PUBLIC_FORM_ENDPOINT` | form backend URL (optional) |

The EC2 security group needs to allow SSH (port 22) from GitHub Actions runners. If your SSH is locked down to known IPs, open it for deploys or switch to a self-hosted runner.

**Rollback:** `ln -sfn /var/www/adbilliards/releases/<older-release> /var/www/adbilliards/current`

### Handing off to A&D later

Because the site is static, it can move almost anywhere: Netlify, Cloudflare Pages, Vercel, or GitHub Pages (none need a server), or their own host. Transfer the GitHub repo, point the domain, and set the same variables.
