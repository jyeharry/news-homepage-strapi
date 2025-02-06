import { z } from 'astro:content';

const MediaImageFormatSchema = z.object({
  ext: z.string(),
  url: z.string(),
  hash: z.string(),
  mime: z.string(),
  name: z.string(),
  path: z.string().nullable(),
  size: z.number(),
  width: z.number(),
  height: z.number(),
  sizeInBytes: z.number()
})

const MediaImageFormatMapSchema = z.record(
  z.union([
    z.literal('thumbnail'),
    z.literal('small'),
    z.literal('medium'),
    z.literal('large'),
  ]),
  MediaImageFormatSchema.optional()
)

export const MediaImageSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: MediaImageFormatMapSchema,
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  previewUrl: z.string().nullable(),
  provider: z.string(),
  provider_metadata: z.literal(null),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string()
})
