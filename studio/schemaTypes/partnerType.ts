// studio/schemaTypes/partnerType.ts
// Partner Logo collection doc.

import {defineField, defineType} from 'sanity'

export const partnerType = defineType({
  name: 'partner',
  title: 'Partner Logo',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.required().integer().min(0),
      description: 'Lower numbers appear first.',
      initialValue: 1,
    }),
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Partner name shown in the carousel overlay and as alt text.',
      initialValue: 'Coca Cola',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Partner logo image shown in the carousel.',
    }),
    defineField({
      name: 'logoUrl',
      title: 'Logo URL (External)',
      type: 'url',
      group: 'media',
      description: 'External logo URL used if no Sanity logo image is set.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'media',
      validation: (Rule) => Rule.required(),
      description: 'Accessible alt text for the partner logo.',
      initialValue: 'Coca Cola logo',
    }),
    defineField({
      name: 'url',
      title: 'Partner URL',
      type: 'url',
      group: 'links',
      description: 'Optional external link opened when the partner card is clicked.',
    }),
  ],
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', media: 'logo'},
    prepare({title, media}) {
      return {title: title || 'Untitled Partner', media}
    },
  },
})
