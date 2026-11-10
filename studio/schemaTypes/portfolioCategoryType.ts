// studio/schemaTypes/portfolioCategoryType.ts
// Portfolio Category collection doc (filter label).

import {defineField, defineType} from 'sanity'

export const portfolioCategoryType = defineType({
  name: 'portfolioCategory',
  title: 'Portfolio Category',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
      description: 'Lower numbers appear first.',
      initialValue: 1,
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Filter button label shown in the Portfolio section.',
      initialValue: 'All Projects',
    }),
  ],
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'label'},
    prepare() {
      return {title: 'Portfolio Category'}
    },
  },
})
