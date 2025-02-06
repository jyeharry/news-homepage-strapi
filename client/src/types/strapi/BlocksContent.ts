import { z } from 'astro:content';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

const TextInlineNodeSchema = z.object({
  type: z.literal('text'),
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  code: z.boolean().optional()
})

const LinkInlineNodeSchema = z.object({
  type: z.literal('link'),
  url: z.string(),
  children: TextInlineNodeSchema.array(),
})

const DefaultInlineNodeSchema = z.union([TextInlineNodeSchema, LinkInlineNodeSchema])

const ListItemInlineNodeSchema = z.object({
  type: z.literal('list-item'),
  children: DefaultInlineNodeSchema.array(),
})

const ParagraphBlockNodeSchema = z.object({
  type: z.literal('paragraph'),
  children: DefaultInlineNodeSchema.array(),
});

const QuoteBlockNodeSchema = z.object({
  type: z.literal('quote'),
  children: DefaultInlineNodeSchema.array(),
});

const CodeBlockNodeSchema = z.object({
  type: z.literal('code'),
  children: DefaultInlineNodeSchema.array(),
});

const HeadingBlockNodeSchema = z.object({
  type: z.literal('heading'),
  level: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]),
  children: DefaultInlineNodeSchema.array(),
});

const BaseListBlockNodeSchema = z.object({
  type: z.literal('list'),
  format: z.union([z.literal('ordered'), z.literal('unordered')]),
});

type ListBlockNode = z.infer<typeof BaseListBlockNodeSchema> & {
  children: (z.infer<typeof ListItemInlineNodeSchema> | ListBlockNode)[];
};

const ListBlockNodeSchema: z.ZodType<ListBlockNode> = BaseListBlockNodeSchema.extend({
  children: z.lazy(() => z.union([ListItemInlineNodeSchema, ListBlockNodeSchema]).array()),
});

const ImageBlockNodeSchema = z.object({
  type: z.literal('image'),
  image: z.object({
    name: z.string(),
    alternativeText: z.string().nullable().optional(),
    url: z.string(),
    caption: z.string().nullable().optional(),
    width: z.number(),
    height: z.number(),
    formats: z.record(z.string(), z.unknown()).optional(),
    hash: z.string(),
    ext: z.string(),
    mime: z.string(),
    size: z.number(),
    previewUrl: z.string().nullable().optional(),
    provider: z.string(),
    provider_metadata: z.unknown().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  children: z.tuple([z.object({
    type: z.literal('text'),
    text: z.literal(''),
  })]),
});

const RootNodeSchema = z.union([ParagraphBlockNodeSchema, QuoteBlockNodeSchema, CodeBlockNodeSchema, HeadingBlockNodeSchema, ListBlockNodeSchema, ImageBlockNodeSchema])

export const BlocksContentSchema: z.ZodType<BlocksContent> = RootNodeSchema.array();

