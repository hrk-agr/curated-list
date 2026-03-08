# How to Add a Product

This is a step-by-step guide for adding a new product to the directory.
It is safe to follow these steps without breaking any existing functionality.

## Step 1: Create the Markdown File

Create a new file in `src/content/products/`. The filename becomes the URL slug.

**Naming rules:**
- Use lowercase letters and hyphens only
- No spaces, underscores, or special characters
- Be descriptive: `apple-magic-keyboard.md`, not `keyboard.md`

```
src/content/products/apple-magic-keyboard.md
```

This will generate the route: `/product/apple-magic-keyboard`

## Step 2: Add the Frontmatter

The frontmatter must be valid YAML between `---` delimiters at the top of the file.

```yaml
---
title: Apple Magic Keyboard with Touch ID
description: Apple's slim wireless keyboard with Touch ID for fast, secure authentication. Designed for Mac with a full-size layout.
price: $129
image: /images/apple-magic-keyboard.jpg
category: office
affiliate_link: https://www.apple.com/shop/product/MK2C3LL/A/magic-keyboard-with-touch-id-for-mac-models-with-apple-silicon-us-english
featured: false
tags:
  - keyboard
  - wireless
  - apple
  - mac
---
```

**Field rules:**
- `title` — Product name, shown as heading. Keep under 80 characters.
- `description` — 1-2 sentences. Shown on cards (truncated to 2 lines) and in meta tags.
- `price` — Display string. Include currency symbol. Examples: `$99`, `$1,299`, `€89`.
- `image` — Root-relative path to an image in `public/images/`. Example: `/images/apple-magic-keyboard.jpg`.
- `category` — Lowercase string. Use an existing category (`office`, `audio`, `productivity`) or a new one.
- `affiliate_link` — Must be a valid URL (http:// or https://). Will fail validation otherwise.
- `featured` — Set to `true` to show in the "Featured" section on the homepage.
- `tags` — Array of lowercase strings. Used for display only (shown on product page).

## Step 3: Add the Product Image

Place the image in `public/images/` with the same filename referenced in frontmatter.

```
public/images/apple-magic-keyboard.jpg
```

**Image recommendations:**
- Aspect ratio: 4:3 (matches the card and detail page layout)
- Recommended dimensions: 800×600px
- Format: JPEG or WebP
- Keep file size under 200KB for performance

If no image is available, the image container will show the background color (`#f9fafb`).

## Step 4: Add Optional Body Content

Below the closing `---` of the frontmatter, write Markdown content.
This renders in the `<div class="product-content">` section on the product detail page.

```markdown
---
(frontmatter here)
---

The Apple Magic Keyboard is Apple's flagship wireless keyboard...

## Why We Recommend It

For Mac users who want a keyboard that just works...

## Key Features

- Touch ID for biometric authentication
- Scissor mechanism keys with 1mm travel
- Bluetooth and USB-C connectivity
- Up to a month of battery per charge

## Who It's For

Mac owners who want a minimal, reliable keyboard...
```

The body supports: headings (h2, h3), paragraphs, unordered lists, ordered lists.
Avoid h1 (the product title already uses h1).

## Step 5: Rebuild

```bash
npm run build
```

If there are frontmatter validation errors, the build will fail with a clear error message pointing to the file and field. Fix the error and run the build again.

For development, run `npm run dev` — changes to `.md` files hot-reload automatically.

## Verification Checklist

After adding a product, verify:
- [ ] File created at `src/content/products/your-slug.md`
- [ ] All required frontmatter fields are present
- [ ] `affiliate_link` starts with `http://` or `https://`
- [ ] Image file exists at the path specified in `image` field
- [ ] Build succeeds: `npm run build`
- [ ] Product appears on homepage at `/`
- [ ] Product appears on its category page at `/category/yourcategory`
- [ ] Product detail page loads at `/product/your-slug`
- [ ] If `featured: true`, product appears in the "Featured" section

## Adding a New Category

No extra steps. Just use a new string for `category` in the frontmatter.
Astro will automatically generate the `/category/your-new-category` page.

To add the new category to the sticky navigation header, edit `src/layouts/Layout.astro`
and add a link in the `<nav class="site-nav">` block:

```astro
<a href="/category/your-new-category">Your Category</a>
```
