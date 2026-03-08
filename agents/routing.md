# Routing

## How Astro Routing Works

Astro uses **file-based routing**. Every `.astro` file in `src/pages/` becomes a route.

## Static Routes

| File | Route |
|------|-------|
| `src/pages/index.astro` | `/` |

## Dynamic Routes

Dynamic routes use bracket notation `[param]` in the filename. They **require** a `getStaticPaths()` export that tells Astro which pages to generate.

| File | Route Pattern | Example |
|------|--------------|---------|
| `src/pages/category/[category].astro` | `/category/:category` | `/category/office` |
| `src/pages/product/[slug].astro` | `/product/:slug` | `/product/keychron-k2` |

## getStaticPaths() Pattern

```ts
export async function getStaticPaths() {
  const allProducts = await getCollection('products');

  return allProducts.map((product) => ({
    params: { slug: product.slug },   // fills in [slug]
    props: { product },               // available as Astro.props in the component
  }));
}
```

- `params` must match the bracket names in the filename.
- `props` are passed directly to `Astro.props` — use them instead of re-fetching where possible.
- `getStaticPaths()` runs once at build time. The component script runs once per generated page.

## Category Page Path Generation

```ts
export async function getStaticPaths() {
  const allProducts = await getCollection('products');
  const categories = [...new Set(allProducts.map(p => p.data.category))];

  return categories.map((category) => ({
    params: { category },
    props: {
      products: allProducts.filter(p => p.data.category === category),
      allCategories: categories.sort(),
    },
  }));
}
```

Categories are derived from product data. Adding a product with a new category automatically creates a new route.

## URL ↔ File Mapping

```
/                           <- src/pages/index.astro
/category/office            <- src/pages/category/[category].astro (params: { category: "office" })
/category/audio             <- src/pages/category/[category].astro (params: { category: "audio" })
/product/keychron-k2        <- src/pages/product/[slug].astro      (params: { slug: "keychron-k2" })
/product/sony-wh1000xm5     <- src/pages/product/[slug].astro      (params: { slug: "sony-wh1000xm5" })
```

## Adding a New Static Page

1. Create `src/pages/my-page.astro`
2. It will be available at `/my-page`
3. No configuration needed

## Adding a New Dynamic Route

1. Create `src/pages/[param]/index.astro` or `src/pages/thing/[param].astro`
2. Export `getStaticPaths()` that returns all param values
3. Astro generates one HTML file per returned path

## Named Slots in Layout

The Layout accepts a named `head` slot for injecting content into `<head>`:

```astro
<Layout title="...">
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(data)} />
  </Fragment>
  <!-- page body content -->
</Layout>
```

This is used by the product detail page to inject JSON-LD structured data.
