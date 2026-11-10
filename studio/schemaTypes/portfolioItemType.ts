// studio/schemaTypes/portfolioItemType.ts
// Portfolio Item collection doc.
// coverImage (Sanity) OR coverImageUrl (external URL) — component picks one (Batch 4).
// coverAlt is required.

import {defineField, defineType} from 'sanity'

export const portfolioItemType = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'links', title: 'Links'},
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
      description: 'Portfolio item title shown on the card overlay and in the modal.',
      initialValue: 'Wildlife Conservation Documentary',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Filter category this item belongs to (must match a Portfolio Category label).',
      initialValue: 'documentary',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      group: 'content',
      description: 'Short description shown on the card overlay.',
      initialValue: 'Award-winning documentary on African wildlife conservation',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      group: 'content',
      rows: 5,
      description: 'Full details shown in the portfolio modal body.',
      initialValue: 'This groundbreaking documentary took us across 5 African countries over 18 months.',
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
      initialValue: 'Wildlife Conservation Documentary',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'content',
      description: 'Client name shown in the portfolio modal details.',
      initialValue: 'National Geographic',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'content',
      description: 'Year shown in the portfolio modal details.',
      initialValue: '2023',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      group: 'content',
      description: 'Duration shown in the portfolio modal details.',
      initialValue: '45 min',
    }),
    defineField({
      name: 'awards',
      title: 'Awards & Recognition',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      description: 'Award names shown in the portfolio modal.',
      initialValue: ['Best Documentary 2023', 'Wildlife Film Festival Winner'],
    }),
    defineField({
      name: 'watchCtaLabel',
      title: 'Watch CTA Label',
      type: 'string',
      group: 'links',
      description: 'Label of the "Watch Film" button in the portfolio modal.',
      initialValue: 'Watch Film',
    }),
  ],
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', category: 'category', media: 'coverImage'},
    prepare({title, category, media}) {
      return {title: title || 'Untitled Portfolio Item', subtitle: category, media}
    },
  },
})
