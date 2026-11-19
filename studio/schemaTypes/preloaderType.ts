// studio/schemaTypes/preloaderType.ts
// Preloader singleton — loading screen content.

import {defineField, defineType} from 'sanity'

export const preloaderType = defineType({
  name: 'preloader',
  title: 'Preloader',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Central logo shown on the preloader screen.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'media',
      description: 'Accessible alt text for the preloader logo image.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Princehouse Films Logo',
    }),
    defineField({
      name: 'loadingText',
      title: 'Loading Text',
      type: 'string',
      group: 'content',
      description: 'The word shown between the loading dots in the progress section.',
      initialValue: 'Loading',
    }),
    defineField({
      name: 'loadingDetails',
      title: 'Loading Details',
      type: 'array',
      group: 'content',
      description: 'Three status labels shown under the progress bar ("Initializing Visuals", "Loading Assets", "Preparing Experience").',
      of: [
        {
          type: 'object',
          name: 'loadingDetail',
          title: 'Loading Detail',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Status label text.',
              initialValue: 'Initializing Visuals',
            }),
          ],
          preview: {
            select: {label: 'label'},
            prepare({label}) {
              return {title: label}
            },
          },
        },
      ],
      initialValue: [
        {_key: 'ld-1', label: 'Initializing Visuals'},
        {_key: 'ld-2', label: 'Loading Assets'},
        {_key: 'ld-3', label: 'Preparing Experience'},
      ],
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Background Video URL',
      type: 'url',
      group: 'media',
      description: 'Decorative background video played on the preloader screen.',
      initialValue: '/assets/img/WildNowLogovideo.mp4',
    }),
  ],
  preview: {
    select: {title: 'loadingText'},
    prepare() {
      return {title: 'Preloader', subtitle: 'Loading screen'}
    },
  },
})
