// studio/schemaTypes/seoType.ts
// Shared object: SEO metadata (stored but NOT rendered — deferred SEO phase, D3).

import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Page title for search engines.',
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Meta description for search engines.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Image shown when the page is shared on social media.',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare() {
      return {title: 'SEO'}
    },
  },
})
