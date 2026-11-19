// studio/schemaTypes/teamSectionType.ts
// Team singleton — "Meet Our Creative Team" section.
// groupPhoto is decorative background (not rendered as ; alt not used).

import {defineField, defineType} from 'sanity'

export const teamSectionType = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Appears as the H2 at the top of the Team section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Meet Our Creative Team',
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
        'A passionate collective of storytellers, cinematographers, and innovators',
    }),
    defineField({
      name: 'groupPhoto',
      title: 'Group Photo',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Decorative background image behind the team section overlay. Not rendered as  so alt is not used.',
    }),
    defineField({
      name: 'groupPhotoTitle',
      title: 'Group Photo Title',
      type: 'string',
      group: 'content',
      description: 'Title shown on the group photo overlay.',
      initialValue: 'The Creative Minds',
    }),
    defineField({
      name: 'groupPhotoDescription',
      title: 'Group Photo Description',
      type: 'string',
      group: 'content',
      description: 'Description shown on the group photo overlay.',
      initialValue: 'United by passion, driven by innovation',
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Team Section', subtitle: 'Meet Our Creative Team'}
    },
  },
})
