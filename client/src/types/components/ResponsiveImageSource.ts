import { z } from 'astro:content';
import { MediaImageSchema } from '../strapi/MediaImage';

export const ResponsiveImageSourceSchema = z.object({
  id: z.number(),
  screenWidth: z.string(),
  source: MediaImageSchema,
})
