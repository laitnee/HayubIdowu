import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Hayub Idowu — Blog',
    description: 'Thoughts on web development, design systems, and building things.',
    site: context.site!.toString(),
    items: sorted.map(post => ({
      title:       post.data.title,
      description: post.data.description,
      pubDate:     post.data.pubDate,
      link:        `/blog/${post.slug}/`,
      categories:  post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
