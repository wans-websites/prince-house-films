// studio/schemaTypes/footerType.ts
// Footer singleton — logo, socials, legal link, copyright.
// socials[] is a SEPARATE list from Get In Touch (includes YouTube).

import {defineField, defineType} from 'sanity'
import {socialLinkType} from './socialLinkType'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Logo shown in the footer.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'media',
      description: 'Accessible alt text for the footer logo image.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Prince House Films',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      group: 'links',
      description: 'Footer social icons (separate list from Get In Touch — includes YouTube).',
      of: [{type: 'socialLink'}],
      initialValue: [
        {_key: 'footer-instagram', platform: 'instagram', handle: '@princehouse_films', url: 'https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs', iconClass: 'bi bi-instagram', color: '#E1306C'},
        {_key: 'footer-youtube', platform: 'youtube', handle: 'Prince House Films', url: 'https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w', iconClass: 'bi bi-youtube', color: '#FF0000'},
        {_key: 'footer-tiktok', platform: 'tiktok', handle: '@princehousefilms', url: 'https://www.tiktok.com/@princehousefilms?_r=1&_t=ZS-93Two21vb3y', iconClass: 'bi bi-tiktok', color: '#000000'},
        {_key: 'footer-facebook', platform: 'facebook', handle: 'Prince House Films', url: 'https://www.facebook.com/Princehousefilms?mibextid=wwXIfr&rdid=aouG8uGzL9Uk0Kvw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17PyRWjWCT%2F%3Fmibextid%3DwwXIfr%26ref%3D1#', iconClass: 'bi bi-facebook', color: '#1877F2'},
      ],
    }),
    defineField({
      name: 'privacyLink',
      title: 'Privacy Policy Link',
      type: 'string',
      group: 'links',
      description: 'Route path of the Privacy Policy link in the footer.',
      validation: (Rule) => Rule.required(),
      initialValue: '/privacy-policy',
    }),
    defineField({
      name: 'privacyLabel',
      title: 'Privacy Policy Label',
      type: 'string',
      group: 'links',
      description: 'Label text of the Privacy Policy link.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Privacy Policy',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'content',
      description: 'Footer bottom copyright text (brand name portion; year is computed).',
      validation: (Rule) => Rule.required(),
      initialValue: 'Prince House Films',
    }),
  ],
  preview: {
    select: {title: 'copyrightText'},
    prepare() {
      return {title: 'Footer', subtitle: 'Site footer'}
    },
  },
})
