# Content System

## How Content Collections Work

Astro Content Collections provide a type-safe layer over Markdown files.

**Schema file:** `src/content/config.ts`
**Content directory:** `src/content/products/`

At build time, Astro reads all `.md` files in `src/content/products/`, validates their frontmatter against the Zod schema, and makes them available via `getCollection('products')`.

If any product's frontmatter fails validation (missing required field, wrong type, invalid URL), the build will **fail with a clear error message** — this is intentional and prevents bad data from reaching production.

## Schema Reference

```ts
z.object({
  title: z.string(),               // Product name
  description: z.string(),         // 1-2 sentence summary
  price: z.string(),               // Display string, e.g. "$99" or "$1,299"
  image: z.string(),               // Root-relative path, e.g. /images/product.jpg
  category: z.string(),            // Lowercase, e.g. "office", "audio"
  affiliate_link: z.string().url(),// Must be a valid URL
  featured: z.boolean(),           // Shows in Featured section (default: false)
  tags: z.array(z.string()),       // Array of strings (default: [])
})
```

## Product File Structure

```
src/content/products/
└── my-product.md        <- slug: "my-product"  URL: /product/my-product
```

Each file has two parts:

1. **Frontmatter** (YAML between `---` delimiters) — structured data
2. **Body** (Markdown below the frontmatter) — rendered on the product detail page

The body is optional. If empty, the product detail page just shows no additional content section.

## How Products Are Queried

In page files, products are fetched with:

```ts
import { getCollection } from 'astro:content';
const allProducts = await getCollection('products');
```

This returns an array of `CollectionEntry<'products'>` objects with shape:

```ts
{
  slug: string,           // filename without .md
  data: {                 // validated frontmatter
    title: string,
    description: string,
    price: string,
    image: string,
    category: string,
    affiliate_link: string,
    featured: boolean,
    tags: string[],
  },
  render: () => Promise<{ Content: AstroComponent }>,
}
```

## Rendering Markdown Body

In the product detail page (`src/pages/product/[slug].astro`):

```ts
const { Content } = await product.render();
```

Then in the template:
```astro
<div class="product-content">
  <Content />
</div>
```

The Markdown body renders inside `<div class="product-content">` and is styled by CSS in `global.css` under the "PRODUCT CONTENT" section.

## Adding a New Category

No special steps required. Just:
1. Create a product with `category: yourcategory` in frontmatter
2. A `/category/yourcategory` page will be automatically generated
3. `CategoryFilter` will include a link to it on all pages

The only manual step: add a nav link in `src/layouts/Layout.astro` if you want it in the sticky header.

## Image Handling

Images are stored in `public/images/` and referenced by root-relative paths in frontmatter:

```yaml
image: /images/my-product.jpg
```

Recommended dimensions: **800×600px** (4:3 aspect ratio) to match the card and detail page layout.

Astro does not apply image optimization to images referenced as strings in frontmatter. If you want automatic image optimization, migrate the `image` field to use Astro's `image()` schema helper and update the components to use `<Image />` from `astro:assets`.
