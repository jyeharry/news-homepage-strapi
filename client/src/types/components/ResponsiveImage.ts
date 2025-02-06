import { z } from 'astro:content';
import { MediaImageSchema } from '../strapi/MediaImage';
import { ResponsiveImageSourceSchema } from './ResponsiveImageSource';

export const ResponsiveImageSchema = z.object({
  id: z.number(),
  sources: ResponsiveImageSourceSchema.array(),
  default: MediaImageSchema,
})

