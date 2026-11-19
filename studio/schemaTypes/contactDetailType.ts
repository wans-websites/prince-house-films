// studio/schemaTypes/contactDetailType.ts
// Contact Detail collection doc (Location, Email, Phone cards).

import {defineField, defineType} from 'sanity'

export const contactDetailType = defineType({
  name: 'contactDetail',
  title: 'Contact Detail',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
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
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Contact card heading (e.g. "Location", "Email", "Phone").',
      initialValue: 'Location',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Contact detail value (e.g. address, email, phone number).',
      initialValue: 'Nairobi, Kenya',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      group: 'links',
      description: 'Href of the contact action link (mailto:, tel:, or https:// maps URL).',
      initialValue: 'https://maps.google.com/?q=Nairobi+Kenya',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Label',
      type: 'string',
      group: 'links',
      description: 'Label of the contact action link (e.g. "Directions", "Email Us", "Call Now").',
      initialValue: 'Directions',
    }),
    defineField({
      name: 'external',
      title: 'External Link',
      type: 'boolean',
      group: 'links',
      description: 'Whether the link opens in a new tab.',
      initialValue: true,
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Map', value: 'map'},
          {title: 'Envelope', value: 'envelope'},
          {title: 'Phone', value: 'phone'},
        ],
      },
      description: 'Icon key mapped to a bootstrap-icons element.',
      initialValue: 'map',
    }),
  ],
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', content: 'content'},
    prepare({title, content}) {
      return {title: title || 'Untitled Contact Detail', subtitle: content}
    },
  },
})
