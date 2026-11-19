// studio/schemaTypes/privacyPolicyType.ts
// Privacy Policy singleton — full rich-text body via Portable Text.
// Custom serializers in PrivacyPolicy.jsx reproduce the current tag structure exactly.

import {defineField, defineType} from 'sanity'

export const privacyPolicyType = defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'backToHomeLabel',
      title: 'Back to Home Label',
      type: 'string',
      group: 'content',
      description: 'Label of the back link in the top bar.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Back to Home',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Label',
      type: 'string',
      group: 'content',
      description: 'Small label above the page title ("Legal").',
      initialValue: 'Legal',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      description: 'Main H1 of the Privacy Policy page.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Privacy Policy for Prince House Films',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'string',
      group: 'content',
      description: 'Effective date shown in the meta line (free-form, e.g. "15/04/2026").',
      validation: (Rule) => Rule.required(),
      initialValue: '15/04/2026',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      group: 'content',
      description: 'Last updated date shown in the meta line (free-form, e.g. "15/04/2026").',
      validation: (Rule) => Rule.required(),
      initialValue: '15/04/2026',
    }),
    defineField({
      name: 'body',
      title: 'Policy Body',
      type: 'array',
      group: 'content',
      of: [{type: 'block'}],
      description: 'Full privacy policy body (headings, paragraphs, lists). Rendered via Portable Text with custom serializers matching the current HTML structure.',
      validation: (Rule) => Rule.required(),
      initialValue: [
        {
          _key: 'pp-1',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'pp-1-c1',
              _type: 'span',
              text: 'At Prince House Films, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, engage with us on social media platforms such as Facebook, Instagram, LinkedIn, or contact us directly.',
              marks: [],
            },
          ],
        },
        {
          _key: 'pp-2',
          _type: 'block',
          style: 'normal',
          children: [
            {
              _key: 'pp-2-c1',
              _type: 'span',
              text: 'By using our website, pages, or services, you agree to the terms of this Privacy Policy.',
              marks: [],
            },
          ],
        },
        {
          _key: 'pp-3',
          _type: 'block',
          style: 'h2',
          children: [{_key: 'pp-3-c1', _type: 'span', text: '1. Information We Collect', marks: []}],
        },
        {
          _key: 'pp-4',
          _type: 'block',
          style: 'normal',
          children: [{_key: 'pp-4-c1', _type: 'span', text: 'We may collect the following information:', marks: []}],
        },
        {
          _key: 'pp-5',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{_key: 'pp-5-c1', _type: 'span', text: 'Name', marks: []}],
        },
        {
          _key: 'pp-6',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{_key: 'pp-6-c1', _type: 'span', text: 'Email address', marks: []}],
        },
        {
          _key: 'pp-7',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{_key: 'pp-7-c1', _type: 'span', text: 'Phone number', marks: []}],
        },
        {
          _key: 'pp-8',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{_key: 'pp-8-c1', _type: 'span', text: 'Business name', marks: []}],
        },
        {
          _key: 'pp-9',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{_key: 'pp-9-c1', _type: 'span', text: 'Project details or inquiries', marks: []}],
        },
        {
          _key: 'pp-10',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [{_key: 'pp-10-c1', _type: 'span', text: 'Billing information (where applicable)', marks: []}],
        },
        {
          _key: 'pp-11',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _key: 'pp-11-c1',
              _type: 'span',
              text: 'Website usage data (cookies, analytics, device information)',
              marks: [],
            },
          ],
        },
        {
          _key: 'pp-12',
          _type: 'block',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _key: 'pp-12-c1',
              _type: 'span',
              text: 'Social media interactions (messages, comments, form submissions)',
              marks: [],
            },
          ],
        },
        {
          _key: 'pp-13',
          _type: 'block',
          style: 'h2',
          children: [{_key: 'pp-13-c1', _type: 'span', text: '2. How We Use Your Information', marks: []}],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare() {
      return {title: 'Privacy Policy', subtitle: 'Legal page'}
    },
  },
})
