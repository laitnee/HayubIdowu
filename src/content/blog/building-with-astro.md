---
title: "What I Learned Building with Astro"
description: "Content Collections, static paths, and the island architecture — a practical rundown."
pubDate: 2026-02-01
tags: ["astro", "web-dev", "tutorial"]
category: "Development"
heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
---

After building this blog entirely in Astro, here are the key concepts worth understanding before you start.

## Content Collections

Content Collections are Astro's answer to type-safe markdown. You define a schema once in `src/content/config.ts` using Zod, and Astro validates every markdown file against it at build time.

```ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});
```

No more silent frontmatter typos causing runtime errors. If a post has an invalid date or missing required field, the build fails immediately.

## Static Paths

Dynamic routes like `blog/[slug].astro` require a `getStaticPaths()` export. Astro calls this at build time to enumerate every page to generate.

```ts
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

This same pattern powers the tag pages — every tag in your posts automatically gets a pre-rendered listing page.

## The Island Architecture

By default, every Astro component renders to static HTML. To add client-side interactivity, you use a `client:*` directive:

- `client:load` — hydrates immediately on page load
- `client:idle` — hydrates when the browser is idle
- `client:visible` — hydrates when the element enters the viewport

For this blog, only the theme toggle uses a small inline `<script>` tag. Everything else is pure HTML.

## Build Performance

Running `astro build` on this blog takes under two seconds. The output is a folder of static HTML, CSS, and minimal JS — easily deployed to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
