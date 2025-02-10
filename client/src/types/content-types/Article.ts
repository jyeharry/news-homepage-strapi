import { z } from 'astro:content';
import { ResponsiveImageSchema } from '../components/ResponsiveImage';
import { BlocksContentSchema } from '../strapi/BlocksContent';
import { MediaImageSchema } from '../strapi/MediaImage';

export const ArticleSchema = z.object({
  id: z.union([z.number(), z.string()]),
  documentId: z.string(),
  title: z.string(),
  preview: z.string(),
  body: BlocksContentSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
  slug: z.string(),
  isFeatured: z.boolean(),
  popularityRank: z.number().nullable(),
  displayImage: ResponsiveImageSchema,
  thumbnailImage: MediaImageSchema.nullable().optional()
})

export type Article = z.infer<typeof ArticleSchema>
