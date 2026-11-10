// studio/schemaTypes/internalLinkType.ts
// Shared object: internal route link.

import {defineField, defineType} from 'sanity'

export const internalLinkType = defineType({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Internal route path (e.g. "/", "/about", "/privacy-policy").',
      initialValue: '/',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Link text.',
      initialValue: 'Link',
    }),
  ],
  preview: {
    select: {label: 'label', path: 'path'},
    prepare({label, path}) {
      return {title: label, subtitle: path}
    },
  },
})
