// studio/schemaTypes/gallerySectionType.ts
// Gallery Section singleton — section heading, intro, categories, view-more.

import {defineField, defineType} from 'sanity'

export const gallerySectionType = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Appears as the H2 at the top of the Gallery section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Behind the Scenes Gallery',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Subtitle paragraph under the section title.',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Take a look at the passion, precision, and creativity that goes into every Prince House Films production. From breathtaking locations to intricate setups.',
    }),
    defineField({
      name: 'categories',
      title: 'Filter Categories',
      type: 'array',
      group: 'content',
      description: 'Gallery filter buttons. "All" plus category labels.',
      of: [
        {
          type: 'reference',
          to: [{type: 'galleryCategory'}],
        },
      ],
    }),
    defineField({
      name: 'viewMoreLink',
      title: 'View More Link',
      type: 'string',
      group: 'links',
      description: 'Href of the "View More in Gallery" link.',
      validation: (Rule) => Rule.required(),
      initialValue: '/full-gallery',
    }),
    defineField({
      name: 'viewMoreLabel',
      title: 'View More Label',
      type: 'string',
      group: 'links',
      description: 'Label of the "View More in Gallery" link.',
      validation: (Rule) => Rule.required(),
      initialValue: 'View More in Gallery',
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Gallery Section', subtitle: 'Behind the Scenes Gallery'}
    },
  },
})
