// studio/schemaTypes/mediaItemType.ts

import {defineField, defineType} from 'sanity'

export const mediaItemType = defineType({
  name: 'mediaItem',
  title: 'Media Item',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video URL', value: 'video'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Sanity Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'image',
    }),
    defineField({
      name: 'imageUrl',
      title: 'External Image URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'image',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'video',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      media: 'image',
      imageUrl: 'imageUrl',
    },
    prepare({title, type, media, imageUrl}) {
      return {
        title: title || 'Untitled media',
        subtitle: imageUrl ? `${type} • external` : type || 'media',
        media,
      }
    },
  },
})
