import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('General'),
    draft: z.boolean().default(false),
    author: z.string().default('Hayub Idowu'),
  }),
});

export const collections = {
  blog: blogCollection,
};
