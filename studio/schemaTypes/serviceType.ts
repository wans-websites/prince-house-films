// studio/schemaTypes/serviceType.ts

import {defineArrayMember, defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Key',
      type: 'string',
      options: {
        list: [
          {title: 'Pen', value: 'pen'},
          {title: 'Slideshow', value: 'slideshow'},
          {title: 'Palette', value: 'palette'},
          {title: 'Video', value: 'video'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(0),
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video/GIF URL', value: 'videoUrl'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({document}) => document?.backgroundType !== 'image',
    }),
    defineField({
      name: 'backgroundVideoUrl',
      title: 'Background Video/GIF URL',
      type: 'url',
      hidden: ({document}) => document?.backgroundType !== 'videoUrl',
    }),
    defineField({
      name: 'mediaItems',
      title: 'Modal Media Items',
      type: 'array',
      of: [defineArrayMember({type: 'mediaItem'})],
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'orderRank', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text',
      media: 'backgroundImage',
    },
  },
})
