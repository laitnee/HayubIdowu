import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** All non-draft posts sorted newest first */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** All unique tags across all posts */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach(post => post.data.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/** All unique categories */
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const catSet = new Set(posts.map(p => p.data.category));
  return Array.from(catSet).sort();
}

/** Posts filtered by a specific tag */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(p => p.data.tags.includes(tag));
}

/** Posts filtered by a specific category */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter(p => p.data.category.toLowerCase() === category.toLowerCase());
}

/** Convert a string to a URL-safe slug */
export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
}

/** Reverse slugify for display (best-effort) */
export function deslugify(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
