// studio/schemaTypes/partnershipSectionType.ts
// Partnership singleton — "Our Valued Partnerships" section.
// Partner logos live in the separate `partner` collection (partnerType.ts);
// only the partnership type cards are embedded here.

import {defineField, defineType} from 'sanity'

export const partnershipSectionType = defineType({
  name: 'partnershipSection',
  title: 'Partnership Section',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'badgeLabel',
      title: 'Badge Label',
      type: 'string',
      group: 'content',
      description: 'Text in the badge above the section title.',
      initialValue: 'Strategic Alliances',
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Main H2 of the Partnerships section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Valued Partnerships',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Subtitle paragraph under the section title.',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Building lasting relationships that drive creative excellence and mutual success',
    }),
    defineField({
      name: 'partnershipTypes',
      title: 'Partnership Types',
      type: 'array',
      group: 'content',
      description: 'Partnership type cards (currently one: Brand Partnerships). Icons use the iconKey dropdown; colors are CSS vars.',
      of: [
        {
          type: 'object',
          name: 'partnershipType',
          title: 'Partnership Type',
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
              description: 'Partnership type card heading.',
              initialValue: 'Brand Partnerships',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
              description: 'Partnership type card body text.',
              initialValue:
                'Long-term collaborations with brands for consistent content production',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Feature bullets shown under the partnership type.',
              initialValue: [
                'Monthly content production',
                'Brand integration',
                'Performance analytics',
                'Strategic planning',
              ],
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              options: {
                list: [
                  {title: 'Building', value: 'building'},
                  {title: 'Rocket', value: 'rocket'},
                ],
              },
              description: 'Icon key mapped to a bootstrap-icons element.',
              initialValue: 'building',
            }),
            defineField({
              name: 'color',
              title: 'Color (CSS var)',
              type: 'string',
              description: 'CSS custom property used for the card accent (e.g. "#FF2A26"). Stored as a style value.',
              initialValue: '#FF2A26',
            }),
            defineField({
              name: 'accent',
              title: 'Accent (CSS var)',
              type: 'string',
              description: 'CSS custom property used for the card highlight (e.g. "#FF6B66"). Stored as a style value.',
              initialValue: '#FF6B66',
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare() {
              return {title: 'Partnership Type'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'type-1',
          order: 1,
          title: 'Brand Partnerships',
          description:
            'Long-term collaborations with brands for consistent content production',
          features: [
            'Monthly content production',
            'Brand integration',
            'Performance analytics',
            'Strategic planning',
          ],
          iconKey: 'building',
          color: '#FF2A26',
          accent: '#FF6B66',
        },
      ],
    }),
    defineField({
      name: 'actionButtonLabel',
      title: 'Action Button Label',
      type: 'string',
      group: 'content',
      description: 'Label of the "Explore Partnership" hover button on each type card.',
      initialValue: 'Explore Partnership',
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Partnership Section', subtitle: 'Our Valued Partnerships'}
    },
  },
})
