import type { BlocksContent } from '@strapi/blocks-react-renderer'

export type Article = {
  id: number,
  documentId: string,
  title: string,
  preview: string,
  body: BlocksContent,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  slug: string,
  isFeatured: boolean,
  popularityRank: number | null,
  displayImage: ResponsiveImage
  thumbnailImage?: MediaImage | null
}

type MediaImageFormat = {
  ext: string,
  url: string,
  hash: string,
  mime: string,
  name: string,
  path: string | null,
  size: number,
  width: number,
  height: number,
  sizeInBytes: number
}

type MediaImageFormatMap = {
  [key in 'thumbnail' | 'small' | 'medium' | 'large']?: MediaImageFormat
}

type MediaImage = {
  id: number,
  documentId: string,
  name: string,
  alternativeText: string | null,
  caption: string | null,
  width: number,
  height: number,
  formats: MediaImageFormatMap,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string | null,
  provider: string,
  provider_metadata: null,
  createdAt: string,
  updatedAt: string,
  publishedAt: string
}

type ResponsiveImageSource = {
  id: number,
  screenWidth: string,
  source: MediaImage
}

type ResponsiveImage = {
  id: number,
  sources: ResponsiveImageSource[],
  default: MediaImage
}
