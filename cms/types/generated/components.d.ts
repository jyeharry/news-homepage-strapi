import type { Schema, Struct } from '@strapi/strapi';

export interface MediaResponsiveImage extends Struct.ComponentSchema {
  collectionName: 'components_media_responsive_images';
  info: {
    description: '';
    displayName: 'responsive image';
    icon: 'picture';
  };
  attributes: {
    default: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    sources: Schema.Attribute.Component<'media.responsive-image-source', true>;
  };
}

export interface MediaResponsiveImageSource extends Struct.ComponentSchema {
  collectionName: 'components_media_responsive_image_sources';
  info: {
    displayName: 'responsive image source';
    icon: 'picture';
  };
  attributes: {
    screenWidth: Schema.Attribute.Enumeration<
      ['(max-width: 450px)', '(max-width: 600px)', '(max-width: 900px)']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'(max-width: 600px)'>;
    source: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'media.responsive-image': MediaResponsiveImage;
      'media.responsive-image-source': MediaResponsiveImageSource;
    }
  }
}
