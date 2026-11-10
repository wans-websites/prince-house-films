// studio/schemaTypes/servicesSectionType.ts
// Services Section singleton — section heading only.
// Service cards are the `service` collection docs (existing).

import {defineField, defineType} from 'sanity'

export const servicesSectionType = defineType({
  name: 'servicesSection',
  title: 'Services Section',
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
      description: 'Appears as the H2 above the services bento grid.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Creative Services',
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Services Section', subtitle: 'Section heading only'}
    },
  },
})
