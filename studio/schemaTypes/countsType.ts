// studio/schemaTypes/countsType.ts
// Counts singleton — "Our Impact in Numbers" section.
// stats[] and achievements[] are embedded objects (A3).

import {defineField, defineType} from 'sanity'

export const countsType = defineType({
  name: 'counts',
  title: 'Our Impact in Numbers (Counts)',
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
      description: 'Appears as the H2 at the top of the Counts section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Impact in Numbers',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'content',
      description: 'Animated counter cards: number, suffix, label, description, icon key.',
      of: [
        {
          type: 'object',
          name: 'stat',
          title: 'Stat',
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
              title: 'Number',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(0),
              description: 'Animated counter end value.',
              initialValue: 10,
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Character appended after the number (e.g. "+" or "%").',
              initialValue: '+',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Stat heading shown below the number.',
              initialValue: 'Years of Excellence',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Stat sub-description shown below the label.',
              initialValue: 'A decade of cinematic storytelling mastery',
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              options: {
                list: [
                  {title: 'Camera Movie', value: 'camera-movie'},
                  {title: 'Trophy', value: 'trophy'},
                  {title: 'Globe', value: 'globe'},
                  {title: 'Happy', value: 'happy'},
                  {title: 'Star', value: 'star'},
                  {title: 'World', value: 'world'},
                ],
              },
              description: 'Icon key mapped to a bootstrap-icons element.',
              initialValue: 'camera-movie',
            }),
          ],
          preview: {
            select: {label: 'label', number: 'number', suffix: 'suffix'},
            prepare({label, number, suffix}) {
              return {title: `${number}${suffix || ''} — ${label}`, subtitle: 'Stat'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'stat-years',
          order: 1,
          number: 10,
          suffix: '+',
          label: 'Years of Excellence',
          description: 'A decade of cinematic storytelling mastery',
          iconKey: 'camera-movie',
        },
        {
          _key: 'stat-projects',
          order: 2,
          number: 200,
          suffix: '+',
          label: 'Projects Completed',
          description: 'Successful film and video productions',
          iconKey: 'trophy',
        },
        {
          _key: 'stat-clients',
          order: 3,
          number: 150,
          suffix: '+',
          label: 'Happy Clients',
          description: 'Brands and organizations served globally',
          iconKey: 'globe',
        },
        {
          _key: 'stat-satisfaction',
          order: 4,
          number: 98,
          suffix: '%',
          label: 'Client Satisfaction',
          description: 'Consistent 5-star reviews and referrals',
          iconKey: 'happy',
        },
      ],
    }),
    defineField({
      name: 'achievements',
      title: 'Achievement Badges',
      type: 'array',
      group: 'content',
      description: 'Badge cards shown below the stats (icon, title, description).',
      of: [
        {
          type: 'object',
          name: 'achievement',
          title: 'Achievement Badge',
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
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Badge card heading.',
              initialValue: 'Premium Quality',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Badge card body text.',
              initialValue: 'Broadcast standard',
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              options: {
                list: [
                  {title: 'Star', value: 'star'},
                  {title: 'World', value: 'world'},
                ],
              },
              description: 'Icon key mapped to a bootstrap-icons element.',
              initialValue: 'star',
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare() {
              return {title: 'Achievement Badge'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'achievement-1',
          order: 1,
          title: 'Premium Quality',
          description: 'Broadcast standard',
          iconKey: 'star',
        },
        {
          _key: 'achievement-2',
          order: 2,
          title: 'Global Reach',
          description: 'International projects',
          iconKey: 'world',
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Counts', subtitle: 'Our Impact in Numbers'}
    },
  },
})
