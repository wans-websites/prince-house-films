// studio/schemaTypes/siteSettingsType.ts
// Site Settings singleton — brand-wide editable content.
// initialValue mirrors current hardcoded site-wide values (AUDIT.md §2).

import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'content',
      description: 'Appears in the footer copyright, Privacy Policy, About body, and SEO.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Prince House Films',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Header logo (top-left) and footer logo (bottom). Used as the brand mark across the site.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'media',
      description: 'Accessible alt text for the logo image (header and footer).',
      validation: (Rule) => Rule.required(),
      initialValue: 'Prince House Films',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Site favicon / browser tab icon. Stored for future use; public/index.html remains authoritative.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'links',
      description: 'Canonical site URL (e.g. https://www.princehousefilms.com). Stored for the future SEO phase; not rendered yet.',
      initialValue: 'https://www.princehousefilms.com',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      group: 'content',
      description: 'Appears in Get In Touch, Privacy Policy contact block, and SEO structured data.',
      validation: (Rule) => Rule.required().email(),
      initialValue: 'info@princehousefilms.com',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      group: 'content',
      description: 'Appears in Get In Touch (tel link), Privacy Policy contact block, and SEO structured data.',
      validation: (Rule) => Rule.required(),
      initialValue: '+254 715 130 028',
    }),
    defineField({
      name: 'address',
      title: 'Contact Address',
      type: 'string',
      group: 'content',
      description: 'Appears in Get In Touch Location card and Privacy Policy.',
      initialValue: 'Nairobi, Kenya',
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'links',
      description: 'Appears in the Service Modal CTA ("View Full Portfolio on Instagram"). Single Instagram account reused across all services.',
      initialValue: 'https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs',
    }),
    defineField({
      name: 'instagramCtaLabel',
      title: 'Instagram CTA Label',
      type: 'string',
      group: 'links',
      description: 'Button label in the Service Modal that links to Instagram.',
      initialValue: 'View Full Portfolio on Instagram',
    }),
  ],
  preview: {
    select: {
      title: 'brandName',
      subtitle: 'email',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Site Settings',
        subtitle: subtitle || '',
      }
    },
  },
})
