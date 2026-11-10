// studio/schemaTypes/galleryItemType.ts
// Gallery Item collection doc.
// coverImage (Sanity) OR coverImageUrl (external URL) — component picks one (Batch 4).
// coverAlt is required. date is a free-form string (A5).

import {defineField, defineType} from 'sanity'

export const galleryItemType = defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.required().integer().min(0),
      description: 'Lower numbers appear first.',
      initialValue: 1,
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Gallery item title shown on the card overlay and in the lightbox.',
      initialValue: 'Wildlife Documentary Shoot',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Filter category this item belongs to (must match a Gallery Category label).',
      initialValue: 'behind-scenes',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Gallery item description shown on the card overlay and in the lightbox.',
      initialValue: 'Capturing rare wildlife moments in Maasai Mara',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (Sanity)',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Uploaded cover image. Takes priority over Cover Image URL if both are set.',
    }),
    defineField({
      name: 'coverImageUrl',
      title: 'Cover Image URL (External)',
      type: 'url',
      group: 'media',
      description: 'External image URL used if no Sanity cover image is set (preserves current behavior).',
    }),
    defineField({
      name: 'coverAlt',
      title: 'Cover Alt Text',
      type: 'string',
      group: 'media',
      validation: (Rule) => Rule.required(),
      description: 'Accessible alt text for the cover image (rendered as aria-label on the background wrapper).',
      initialValue: 'Wildlife Documentary Shoot',
    }),
    defineField({
      name: 'date',
      title: 'Date / Year',
      type: 'string',
      group: 'content',
      description: "Free-form date or year shown in the lightbox (e.g. '2023', 'March 2023', 'Q1 2023').",
      initialValue: '2023',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'content',
      description: 'Location shown in the lightbox details.',
      initialValue: 'Maasai Mara, Kenya',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Photo', value: 'photo'},
          {title: 'Video', value: 'video'},
        ],
      },
      validation: (Rule) => Rule.required(),
      description: 'Whether the item is a photo or video (controls the play icon and lightbox label).',
      initialValue: 'photo',
    }),
  ],
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', mediaType: 'mediaType', media: 'coverImage'},
    prepare({title, mediaType, media}) {
      return {title: title || 'Untitled Gallery Item', subtitle: mediaType, media}
    },
  },
})
