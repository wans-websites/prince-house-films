// studio/schemaTypes/socialLinkType.ts
// Shared object: social link used by footer.socials[] and getInTouch.socials[].

import {defineField, defineType} from 'sanity'

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'X', value: 'x'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Social platform (controls the icon key).',
      initialValue: 'instagram',
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'string',
      description: 'Social handle (display name).',
      initialValue: '@princehouse_films',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Profile URL.',
      initialValue: 'https://instagram.com/princehouse_films',
    }),
    defineField({
      name: 'iconClass',
      title: 'Icon Class',
      type: 'string',
      description: 'Icon class string mapped to a bootstrap-icons / react-icons element.',
      initialValue: 'bi bi-instagram',
    }),
    defineField({
      name: 'color',
      title: 'Color (CSS var)',
      type: 'string',
      description: 'CSS color value used for the icon (e.g. "#E1306C"). Stored as a style value.',
      initialValue: '#E1306C',
    }),
  ],
  preview: {
    select: {title: 'platform', subtitle: 'handle'},
    prepare({title, subtitle}) {
      return {title: title || 'Social Link', subtitle: subtitle || ''}
    },
  },
})
