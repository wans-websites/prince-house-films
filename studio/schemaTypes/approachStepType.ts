// studio/schemaTypes/approachStepType.ts
// Approach Step collection doc (reserved; steps are currently embedded in approachType.ts).
// Kept as a collection doc per A2 for future reuse.

import {defineField, defineType} from 'sanity'

export const approachStepType = defineType({
  name: 'approachStep',
  title: 'Approach Step',
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
      name: 'number',
      title: 'Step Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Two-digit step number (e.g. "01").',
      initialValue: '01',
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Heading of the step card.',
      initialValue: 'Discovery & Strategy',
    }),
    defineField({
      name: 'description',
      title: 'Step Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
      description: 'Body text of the step card.',
      initialValue: 'We begin by deeply understanding your vision.',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Feature tags shown under the step description.',
      initialValue: ['Creative Brief', 'Audience Analysis'],
    }),
    defineField({
      name: 'iconKey',
      title: 'Icon Key',
      type: 'string',
      options: {
        list: [
          {title: 'Search Alt', value: 'search-alt'},
          {title: 'Pencil', value: 'pencil'},
          {title: 'Camera', value: 'camera'},
          {title: 'Edit', value: 'edit'},
          {title: 'Check Circle', value: 'check-circle'},
          {title: 'Play Circle', value: 'play-circle'},
        ],
      },
      description: 'Icon key mapped to a react-icons element.',
      initialValue: 'search-alt',
    }),
  ],
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', number: 'number'},
    prepare({title, number}) {
      return {title: `${number} — ${title}`, subtitle: 'Approach step'}
    },
  },
})
