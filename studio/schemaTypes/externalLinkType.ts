// studio/schemaTypes/externalLinkType.ts
// Shared object: external URL link.

import {defineField, defineType} from 'sanity'

export const externalLinkType = defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'External URL.',
      initialValue: 'https://example.com',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Whether the link opens in a new tab.',
      initialValue: true,
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Link text.',
      initialValue: 'Link',
    }),
  ],
  preview: {
    select: {label: 'label', url: 'url'},
    prepare({label, url}) {
      return {title: label, subtitle: url}
    },
  },
})
