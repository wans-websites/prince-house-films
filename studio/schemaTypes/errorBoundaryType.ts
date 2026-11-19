// studio/schemaTypes/errorBoundaryType.ts
// Error Boundary singleton — fallback message for MediaEmbed failures.

import {defineField, defineType} from 'sanity'

export const errorBoundaryType = defineType({
  name: 'errorBoundary',
  title: 'Error Boundary',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'fallbackText',
      title: 'Fallback Text',
      type: 'string',
      group: 'content',
      description: 'Message shown by ErrorBoundary when media fails to load.',
      validation: (Rule) => Rule.required(),
      initialValue: "Couldn't load this media. Try another item.",
    }),
  ],
  preview: {
    select: {title: 'fallbackText'},
    prepare() {
      return {title: 'Error Boundary', subtitle: 'Media load fallback'}
    },
  },
})
