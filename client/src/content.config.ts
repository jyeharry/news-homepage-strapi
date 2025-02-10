import { defineCollection } from 'astro:content'
import { ArticleSchema, type Article } from './types/content-types/Article'
import fetchApi from './lib/strapi';

const articles = defineCollection({
  loader: async () => {
    const data = await fetchApi<Article[]>({
      endpoint: 'articles', query: {
        populate: [
          'displayImage',
          'displayImage.default',
          'displayImage.sources',
          'displayImage.sources.source',
          'thumbnailImage',
        ]
      }
    })
    return data.map((article) => ({
      ...article,
      id: article.slug,
    }))
  },
  schema: ArticleSchema,
});

export const collections = { articles }
