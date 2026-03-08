# Curated

A fast, minimal static product directory built with Astro and Markdown.

## Tech Stack

- **[Astro](https://astro.build)** — static site generation
- **Content Collections** — Zod-validated Markdown product data
- **Vanilla CSS** — no framework, minimal and responsive
- **TypeScript** — type-safe throughout

## Features

- Homepage with featured products and full product grid
- Category pages (auto-generated from product frontmatter)
- Product detail pages with affiliate links and structured data (JSON-LD)
- Category filter navigation
- Related products on each product page
- SEO: meta tags, Open Graph, Twitter cards, canonical URLs
- Mobile responsive
- No JavaScript shipped to the browser

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321)

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview production build locally |

## Folder Structure

```
src/
  content/
    products/          <- Markdown product files (add products here)
    config.ts          <- Content Collection schema (Zod)
  layouts/
    Layout.astro       <- Base HTML layout
  components/
    ProductCard.astro
    ProductGrid.astro
    CategoryFilter.astro
    SEOHead.astro
  pages/
    index.astro        <- /
    category/
      [category].astro <- /category/:category
    product/
      [slug].astro     <- /product/:slug
  styles/
    global.css
public/
  images/              <- Product images
agents/                <- AI agent documentation
docs/                  <- Deployment guide
llms.txt               <- Machine-readable project summary
llms-full.txt          <- Full machine-readable documentation
```

## Adding a Product

1. Create a file in `src/content/products/your-product-name.md`
2. Add frontmatter:

```yaml
---
title: Product Name
description: Short description of the product.
price: $99
image: /images/your-product.jpg
category: office
affiliate_link: https://example.com/product
featured: false
tags:
  - tag1
  - tag2
---
```

3. Optionally add Markdown body content below the frontmatter
4. Add the product image to `public/images/`
5. Run `npm run build`

See [`agents/how-to-add-product.md`](agents/how-to-add-product.md) for the full guide.

## Product Schema

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Product name |
| `description` | string | Yes | Short summary |
| `price` | string | Yes | e.g. `$99` |
| `image` | string | Yes | e.g. `/images/product.jpg` |
| `category` | string | Yes | lowercase, e.g. `office` |
| `affiliate_link` | string (URL) | Yes | Must be a valid URL |
| `featured` | boolean | No | Default: `false` |
| `tags` | string[] | No | Default: `[]` |

## Deploying

The site builds to `dist/` — deploy to any static host.

- **Netlify**: Connect repo, set build command `npm run build`, publish dir `dist`
- **Vercel**: Auto-detected, just connect and deploy
- **Cloudflare Pages**: Build command `npm run build`, output dir `dist`

See [`docs/deployment.md`](docs/deployment.md) for detailed instructions.

## For AI Agents

See the [`agents/`](agents/) directory:
- [`architecture.md`](agents/architecture.md) — system overview and invariants
- [`content-system.md`](agents/content-system.md) — how content collections work
- [`routing.md`](agents/routing.md) — how pages are generated and routes work
- [`how-to-add-product.md`](agents/how-to-add-product.md) — step-by-step product guide

Machine-readable summaries: [`llms.txt`](llms.txt) and [`llms-full.txt`](llms-full.txt)
