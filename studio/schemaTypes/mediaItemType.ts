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
          {title: 'Video', value: 'video'},
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
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessible alt text for images or descriptive text for video.',
    }),
    defineField({
      name: 'image',
      title: 'Sanity Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'image',
      description: 'Uploaded image asset.',
    }),
    defineField({
      name: 'imageUrl',
      title: 'External Image URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'image',
      description: 'External image URL used if no Sanity image is set.',
    }),
    defineField({
      name: 'videoFile',
      title: 'Sanity Video File',
      type: 'file',
      hidden: ({parent}) => parent?.type !== 'video',
      description: 'Uploaded video file asset. Note: Sanity stores the file but does not provide video transcoding or adaptive streaming.',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'video',
      description: 'YouTube, Vimeo, or direct video file URL (mp4, webm, etc.).',
    }),
    defineField({
      name: 'videoPoster',
      title: 'Poster Image (Sanity)',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.type !== 'video',
      description: 'Uploaded poster/thumbnail image shown before video playback.',
    }),
    defineField({
      name: 'videoPosterUrl',
      title: 'Poster Image URL (External)',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'video',
      description: 'External poster/thumbnail image URL shown before video playback.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'video',
      description: 'Video duration (e.g. "45 min", "2:30").',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Link',
      type: 'url',
      description: 'Optional redirect link opened when the media item is clicked.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order. Lower numbers appear first.',
      initialValue: 1,
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
