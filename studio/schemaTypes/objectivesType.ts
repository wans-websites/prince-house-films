// studio/schemaTypes/objectivesType.ts
// Objectives singleton — "Our Vision & Mission" section.

import {defineField, defineType} from 'sanity'

export const objectivesType = defineType({
  name: 'objectives',
  title: 'Our Vision & Mission (Objectives)',
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
      description: 'Appears as the H2 at the top of the Objectives section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Vision & Mission',
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
        'At Prince House Films, we\'re driven by more than just producing content. We\'re committed to creating meaningful visual stories that inspire action and leave lasting impact.',
    }),
    defineField({
      name: 'vision',
      title: 'Vision Card',
      type: 'object',
      group: 'content',
      description: "The 'Our Vision' card (singleton card, left side).",
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Our Vision',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 5,
          validation: (Rule) => Rule.required(),
          initialValue:
            'To become Africa\'s foremost creative production powerhouse, revolutionizing visual storytelling through innovation, cultural authenticity, and cinematic excellence. We envision a future where African narratives dominate global screens, inspiring generations and shaping perceptions worldwide.',
        }),
      ],
      preview: {
        select: {title: 'title'},
        prepare() {
          return {title: 'Vision Card'}
        },
      },
    }),
    defineField({
      name: 'mission',
      title: 'Mission Card',
      type: 'object',
      group: 'content',
      description: "The 'Our Mission' card (singleton card, right side).",
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
          initialValue: 'Our Mission',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 5,
          validation: (Rule) => Rule.required(),
          initialValue:
            'To empower brands, organizations, and individuals with compelling visual stories that drive growth, foster emotional connections, and inspire meaningful action. Through technical mastery, creative innovation, and collaborative partnerships, we transform concepts into captivating cinematic experiences.',
        }),
      ],
      preview: {
        select: {title: 'title'},
        prepare() {
          return {title: 'Mission Card'}
        },
      },
    }),
    defineField({
      name: 'valuesHeading',
      title: 'Values Heading',
      type: 'string',
      group: 'content',
      description: 'Heading above the Core Values grid.',
      initialValue: 'Our Core Values',
    }),
    defineField({
      name: 'values',
      title: 'Core Values',
      type: 'array',
      group: 'content',
      description: 'Value cards shown in the values grid (icon, title, description). Icons use the iconKey dropdown.',
      of: [
        {
          type: 'object',
          name: 'objective',
          title: 'Core Value',
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
              description: 'Value card heading.',
              initialValue: 'Innovation',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Value card body text.',
              initialValue:
                'Pushing creative boundaries with fresh ideas and cutting-edge techniques',
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              options: {
                list: [
                  {title: 'Bulb', value: 'bulb'},
                  {title: 'Heart', value: 'heart'},
                  {title: 'Trending Up', value: 'trending-up'},
                  {title: 'Group', value: 'group'},
                  {title: 'Award', value: 'award'},
                ],
              },
              description: 'Icon key mapped to a bootstrap-icons element.',
              initialValue: 'bulb',
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare() {
              return {title: 'Core Value'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'value-1',
          order: 1,
          title: 'Innovation',
          description: 'Pushing creative boundaries with fresh ideas and cutting-edge techniques',
          iconKey: 'bulb',
        },
        {
          _key: 'value-2',
          order: 2,
          title: 'Passion',
          description: 'Driven by genuine love for storytelling and visual excellence',
          iconKey: 'heart',
        },
        {
          _key: 'value-3',
          order: 3,
          title: 'Excellence',
          description: 'Uncompromising quality in every frame and every project',
          iconKey: 'trending-up',
        },
        {
          _key: 'value-4',
          order: 4,
          title: 'Collaboration',
          description: 'Partnering closely with clients to achieve shared vision',
          iconKey: 'group',
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Objectives', subtitle: 'Our Vision & Mission'}
    },
  },
})
