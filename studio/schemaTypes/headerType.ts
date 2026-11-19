// studio/schemaTypes/headerType.ts
// Header singleton — navigation + brand logo.

import {defineField, defineType} from 'sanity'

export const headerType = defineType({
  name: 'header',
  title: 'Header',
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
      description: 'Brand logo in the header (top-left), linking to the homepage.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'media',
      description: 'Accessible alt text for the header logo image.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Prince House Films',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      group: 'links',
      description: 'Top navigation items. Renders in order; lower order numbers appear first.',
      of: [
        {
          type: 'object',
          name: 'navLinkItem',
          title: 'Nav Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Link text shown in the nav.',
              initialValue: 'Home',
            }),
            defineField({
              name: 'path',
              title: 'Path',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Internal route path (e.g. "/", "/about"). Structural — do not change unless adding a route.',
              initialValue: '/',
            }),
          ],
          preview: {
            select: {label: 'label', path: 'path'},
            prepare({label, path}) {
              return {title: label, subtitle: path}
            },
          },
        },
      ],
      initialValue: [
        {_key: 'nav-home', label: 'Home', path: '/'},
        {_key: 'nav-about', label: 'Who We Are', path: '/about'},
        {_key: 'nav-services', label: 'What We Do', path: '/services'},
        {_key: 'nav-partnerships', label: 'partnerships', path: '/partnerships'},
        {_key: 'nav-team', label: 'The Team', path: '/team'},
        {_key: 'nav-contact', label: 'Contact', path: '/contact'},
      ],
    }),
    defineField({
      name: 'menuOpenAria',
      title: 'Menu Open ARIA Label',
      type: 'string',
      group: 'content',
      description: 'aria-label on the mobile menu toggle when the menu is closed.',
      initialValue: 'Open menu',
    }),
    defineField({
      name: 'menuCloseAria',
      title: 'Menu Close ARIA Label',
      type: 'string',
      group: 'content',
      description: 'aria-label on the mobile menu toggle when the menu is open.',
      initialValue: 'Close menu',
    }),
  ],
  preview: {
    select: {title: 'navLinks'},
    prepare() {
      return {title: 'Header', subtitle: 'Navigation'}
    },
  },
})
