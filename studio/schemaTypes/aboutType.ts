// studio/schemaTypes/aboutType.ts
// About singleton — "Who We Are" section.

import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Appears as the H2 at the top of the About section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Who We Are',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'text',
      group: 'content',
      rows: 6,
      description: 'Main paragraph of the About section.',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Prince House Films is a full-service creative production company specializing in visual storytelling. We help brands, businesses and organizations bring their ideas to life through high-quality video production, creative content, and digital media solutions. With a passion for excellence and innovation, we transform concepts into powerful visuals that inspire, engage, and connect with audiences',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      group: 'links',
      description: 'Href of the "Work With Us" button in the About section.',
      validation: (Rule) => Rule.required(),
      initialValue: '#contact',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Label',
      type: 'string',
      group: 'links',
      description: 'Button label of the CTA in the About section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Work With Us',
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare() {
      return {title: 'About', subtitle: 'Who We Are section'}
    },
  },
})
