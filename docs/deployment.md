# Deployment Guide

The site builds to a static `dist/` folder compatible with any static host.

## Build

```bash
npm install
npm run build
# Output is in dist/
```

## Netlify

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

Or via Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Vercel

Vercel auto-detects Astro. Just connect your repo and deploy.

Or via Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```

## Cloudflare Pages

1. Connect your GitHub repo to Cloudflare Pages
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

## GitHub Pages

1. Update `astro.config.mjs` with your GitHub Pages URL:
   ```js
   site: 'https://yourusername.github.io',
   base: '/your-repo-name', // if not deploying to root
   ```

2. Add a GitHub Actions workflow at `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## Custom Domain

Set the `site` value in `astro.config.mjs` to your custom domain:
```js
site: 'https://yourcustomdomain.com',
```

This ensures canonical URLs and OG tags are correct.

## Environment Variables

This project has no required environment variables. No secrets, no API keys.
All data is in Markdown files committed to the repository.
