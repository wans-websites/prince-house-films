// studio/schemaTypes/getInTouchType.ts
// Get In Touch singleton — contact cards, socials, CTA.
// No form exists on the site (audit P4 confirmed).

import {defineField, defineType} from 'sanity'
import {socialLinkType} from './socialLinkType'

export const getInTouchType = defineType({
  name: 'getInTouch',
  title: 'Get In Touch',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Appears as the H2 at the top of the Get In Touch section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Have a Project In Mind?',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Subtitle paragraph under the section title.',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Ready to bring your vision to life? Connect with us through any channel.',
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
      type: 'array',
      group: 'content',
      description: 'Contact cards shown in the grid (Location, Email, Phone).',
      of: [
        {
          type: 'reference',
          to: [{type: 'contactDetail'}],
        },
      ],
    }),
    defineField({
      name: 'socialsHeading',
      title: 'Socials Heading',
      type: 'string',
      group: 'content',
      description: 'Heading above the Get In Touch social links.',
      initialValue: 'Follow Us',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      group: 'links',
      description: 'Get In Touch social links (separate list from Footer — does not include YouTube).',
      of: [{type: 'socialLink'}],
      initialValue: [
        {_key: 'git-instagram', platform: 'instagram', handle: '@princehouse_films', url: 'https://instagram.com/princehouse_films', iconClass: 'BiLogoInstagram', color: '#E1306C'},
        {_key: 'git-facebook', platform: 'facebook', handle: 'Prince House Films', url: 'https://facebook.com/PrinceHouseFilms', iconClass: 'BiLogoFacebook', color: '#1877F2'},
        {_key: 'git-tiktok', platform: 'tiktok', handle: '@princehousefilms', url: 'https://tiktok.com/@princehousefilms', iconClass: 'FaTiktok', color: '#000000'},
        {_key: 'git-linkedin', platform: 'linkedin', handle: 'Prince House Films', url: 'https://linkedin.com/company/prince-house-films', iconClass: 'BiLogoLinkedin', color: '#0A66C2'},
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
      group: 'content',
      description: 'Heading of the consultation CTA card.',
      initialValue: 'Free 30-Min Consultation',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'string',
      group: 'content',
      description: 'Description under the CTA title.',
      initialValue: 'Discuss your project with our creative director',
    }),
    defineField({
      name: 'consultationUrl',
      title: 'Consultation URL',
      type: 'url',
      group: 'links',
      description: 'Href of the "Book Now" button (Calendly).',
      validation: (Rule) => Rule.required(),
      initialValue: 'https://calendly.com/princehousefilms/consultation',
    }),
    defineField({
      name: 'bookNowLabel',
      title: 'Book Now Label',
      type: 'string',
      group: 'links',
      description: 'Label of the primary CTA button.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Book Now',
    }),
    defineField({
      name: 'callUrl',
      title: 'Call URL',
      type: 'string',
      group: 'links',
      description: 'Href of the "Call" button (tel:).',
      validation: (Rule) => Rule.required(),
      initialValue: 'tel:+254715130028',
    }),
    defineField({
      name: 'callLabel',
      title: 'Call Label',
      type: 'string',
      group: 'links',
      description: 'Label of the secondary CTA button.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Call',
    }),
    defineField({
      name: 'ctaNote',
      title: 'CTA Note',
      type: 'string',
      group: 'content',
      description: 'Note shown below the CTA buttons (e.g. "24-hour response").',
      initialValue: '24-hour response',
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Get In Touch', subtitle: 'Have a Project In Mind?'}
    },
  },
})
