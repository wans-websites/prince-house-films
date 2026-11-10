// studio/schemaTypes/portfolioSectionType.ts
// Portfolio Section singleton — section heading + categories.
// Portfolio items are collection docs referenced separately.

import {defineField, defineType} from 'sanity'

export const portfolioSectionType = defineType({
  name: 'portfolioSection',
  title: 'Portfolio Section',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Appears as the H2 at the top of the Portfolio section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Portolio',
    }),
    defineField({
      name: 'categories',
      title: 'Filter Categories',
      type: 'array',
      group: 'content',
      description: 'Portfolio filter buttons. "All Projects" plus category labels.',
      of: [
        {
          type: 'reference',
          to: [{type: 'portfolioCategory'}],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Portfolio Section', subtitle: 'Section heading + categories'}
    },
  },
})
