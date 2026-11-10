// studio/schemaTypes/partnershipSectionType.ts
// Partnership singleton — "Our Valued Partnerships" section.
// partners[] and types[] are embedded objects (A3).

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
      name: 'partners',
      title: 'Partner Logos',
      type: 'array',
      group: 'content',
      description: 'Partner logos shown in the infinite carousel (name, logo image, alt, optional URL).',
      of: [
        {
          type: 'object',
          name: 'partnerItem',
          title: 'Partner Logo',
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
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Partner name shown in the overlay and as alt text.',
              initialValue: 'Coca Cola',
            }),
            defineField({
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              options: {hotspot: true},
              description: 'Partner logo image shown in the carousel.',
            }),
            defineField({
              name: 'logoAlt',
              title: 'Logo Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Accessible alt text for the partner logo.',
              initialValue: 'Coca Cola logo',
            }),
            defineField({
              name: 'url',
              title: 'Partner URL',
              type: 'url',
              description: 'Optional external link opened when the partner card is clicked.',
            }),
          ],
          preview: {
            select: {title: 'name', media: 'logo'},
            prepare({title, media}) {
              return {title: title || 'Partner', media}
            },
          },
        },
      ],
      initialValue: [
        {_key: 'partner-1', order: 1, name: 'Coca Cola', logoAlt: 'Coca Cola logo'},
        {_key: 'partner-2', order: 2, name: 'Darling', logoAlt: 'Darling logo'},
        {_key: 'partner-3', order: 3, name: 'Delish', logoAlt: 'Delish logo'},
        {_key: 'partner-4', order: 4, name: 'Dr. Mattress', logoAlt: 'Dr. Mattress logo'},
        {_key: 'partner-5', order: 5, name: 'EABL', logoAlt: 'EABL logo'},
        {_key: 'partner-6', order: 6, name: 'Furniture Place', logoAlt: 'Furniture Place logo'},
        {_key: 'partner-7', order: 7, name: 'LC Waikiki', logoAlt: 'LC Waikiki logo'},
        {_key: 'partner-8', order: 8, name: 'Mega Growth', logoAlt: 'Mega Growth logo'},
        {_key: 'partner-9', order: 9, name: 'Orient', logoAlt: 'Orient logo'},
        {_key: 'partner-10', order: 10, name: 'Prestige', logoAlt: 'Prestige logo'},
        {_key: 'partner-11', order: 11, name: 'Sarit', logoAlt: 'Sarit logo'},
        {_key: 'partner-12', order: 12, name: 'Titi', logoAlt: 'Titi logo'},
        {_key: 'partner-13', order: 13, name: 'Two Rivers', logoAlt: 'Two Rivers logo'},
        {_key: 'partner-14', order: 14, name: 'V Spa', logoAlt: 'V Spa logo'},
      ],
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
