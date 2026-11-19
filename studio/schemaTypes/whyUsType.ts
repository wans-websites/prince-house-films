// studio/schemaTypes/whyUsType.ts
// Why Us singleton — "Why Choose Prince House Films" section.
// reasons[] and footerStats[] are embedded objects (A3).
// comparisonUsItems[] / comparisonOthersItems[] are arrays of {text} objects (A6).

import {defineField, defineType} from 'sanity'

export const whyUsType = defineType({
  name: 'whyUs',
  title: 'Why Choose Us',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
  ],
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      group: 'content',
      description: 'Appears as the H2 at the top of the Why Us section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Why Choose Prince House Films',
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
        'In a crowded market of content creators, we stand apart through our unique blend of cinematic artistry, technical excellence, and client-focused partnership. Here\'s what makes us different.',
    }),
    defineField({
      name: 'reasons',
      title: 'Reason Cards',
      type: 'array',
      group: 'content',
      description: 'Advantage cards shown in the grid (title, description, feature list, icon key).',
      of: [
        {
          type: 'object',
          name: 'whyUsReason',
          title: 'Why Us Reason',
          fields: [
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(0),
              description: 'Lower numbers appear first.',
              initialValue: 1,
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Reason card heading.',
              initialValue: 'Creative Excellence',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
              description: 'Reason card body text.',
              initialValue:
                "We don't just produce content—we craft cinematic experiences. Our team of award-winning creatives brings fresh perspectives, innovative ideas, and artistic vision to every project.",
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Feature bullets shown under the reason card.',
              initialValue: [
                'Award-winning creative team',
                'Innovative storytelling approaches',
                'Artistic cinematic vision',
                'Fresh perspectives on every project',
              ],
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              options: {
                list: [
                  {title: 'Star', value: 'star'},
                  {title: 'Check Shield', value: 'check-shield'},
                  {title: 'Time', value: 'time'},
                  {title: 'User Voice', value: 'user-voice'},
                  {title: 'Trending Up', value: 'trending-up'},
                  {title: 'Award', value: 'award'},
                  {title: 'Camera', value: 'camera'},
                  {title: 'Video', value: 'video'},
                ],
              },
              description: 'Icon key mapped to a bootstrap-icons element.',
              initialValue: 'star',
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare() {
              return {title: 'Why Us Reason'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'reason-1',
          order: 1,
          title: 'Creative Excellence',
          description:
            "We don't just produce content—we craft cinematic experiences. Our team of award-winning creatives brings fresh perspectives, innovative ideas, and artistic vision to every project.",
          features: [
            'Award-winning creative team',
            'Innovative storytelling approaches',
            'Artistic cinematic vision',
            'Fresh perspectives on every project',
          ],
          iconKey: 'star',
        },
        {
          _key: 'reason-2',
          order: 2,
          title: 'Professional Quality',
          description:
            'Broadcast-level production standards with state-of-the-art equipment. From 8K cinema cameras to professional lighting and sound, we deliver premium quality that stands out.',
          features: [
            'State-of-the-art equipment',
            'Broadcast-level production standards',
            'Professional-grade post-production',
            'Quality assurance at every stage',
          ],
          iconKey: 'check-shield',
        },
        {
          _key: 'reason-3',
          order: 3,
          title: 'Timely Delivery',
          description:
            'Efficient workflows and deadline-driven processes ensure your project is delivered on time, every time. We respect your timeline while maintaining our quality standards.',
          features: [
            'Efficient production workflows',
            'Deadline-driven project management',
            'Clear milestone tracking',
            'On-time delivery guarantee',
          ],
          iconKey: 'time',
        },
        {
          _key: 'reason-4',
          order: 4,
          title: 'Client-Centered Approach',
          description:
            "Your vision is our priority. We maintain transparent communication, welcome your feedback, and ensure you're involved in every creative decision throughout the process.",
          features: [
            'Transparent communication',
            'Collaborative decision-making',
            'Regular progress updates',
            'Flexible to client feedback',
          ],
          iconKey: 'user-voice',
        },
      ],
    }),
    defineField({
      name: 'comparisonHeading',
      title: 'Comparison Heading',
      type: 'string',
      group: 'content',
      description: 'Heading above the comparison grid ("The Prince House Films Difference").',
      initialValue: 'The Prince House Films Difference',
    }),
    defineField({
      name: 'comparisonUsLabel',
      title: '"With Us" Column Label',
      type: 'string',
      group: 'content',
      description: 'Heading of the left comparison column.',
      initialValue: 'With Us',
    }),
    defineField({
      name: 'comparisonOthersLabel',
      title: '"With Others" Column Label',
      type: 'string',
      group: 'content',
      description: 'Heading of the right comparison column.',
      initialValue: 'With Others',
    }),
    defineField({
      name: 'comparisonUsItems',
      title: '"With Us" Items',
      type: 'array',
      group: 'content',
      description: 'Bullet items in the left comparison column.',
      of: [
        {
          type: 'object',
          name: 'comparisonItem',
          title: 'Comparison Item',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Comparison bullet text.',
              initialValue: 'Strategic creative planning for maximum impact',
            }),
          ],
          preview: {
            select: {text: 'text'},
            prepare({text}) {
              return {title: text}
            },
          },
        },
      ],
      initialValue: [
        {_key: 'us-1', text: 'Strategic creative planning for maximum impact'},
        {_key: 'us-2', text: 'Cinematic production quality on every project'},
        {_key: 'us-3', text: 'Dedicated project manager and creative team'},
        {_key: 'us-4', text: 'Comprehensive post-production with color grading'},
        {_key: 'us-5', text: 'Ongoing support and performance analysis'},
      ],
    }),
    defineField({
      name: 'comparisonOthersItems',
      title: '"With Others" Items',
      type: 'array',
      group: 'content',
      description: 'Bullet items in the right comparison column.',
      of: [
        {
          type: 'object',
          name: 'comparisonItemOthers',
          title: 'Comparison Item',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Comparison bullet text.',
              initialValue: 'Basic video production without strategy',
            }),
          ],
          preview: {
            select: {text: 'text'},
            prepare({text}) {
              return {title: text}
            },
          },
        },
      ],
      initialValue: [
        {_key: 'others-1', text: 'Basic video production without strategy'},
        {_key: 'others-2', text: 'Standard quality with limited creative input'},
        {_key: 'others-3', text: 'Minimal communication and support'},
        {_key: 'others-4', text: 'Basic editing without cinematic polish'},
        {_key: 'others-5', text: 'Project ends at delivery with no follow-up'},
      ],
    }),
    defineField({
      name: 'footerStats',
      title: 'Footer Stats',
      type: 'array',
      group: 'content',
      description: 'Small stat cards shown at the bottom of the Why Us section (number, label only).',
      of: [
        {
          type: 'object',
          name: 'footerStat',
          title: 'Footer Stat',
          fields: [
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.required().integer().min(0),
              description: 'Lower numbers appear first.',
              initialValue: 1,
            }),
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Stat number shown large (e.g. "200+").',
              initialValue: '200+',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Stat label shown below the number.',
              initialValue: 'Projects Completed',
            }),
          ],
          preview: {
            select: {number: 'number', label: 'label'},
            prepare({number, label}) {
              return {title: `${number} — ${label}`, subtitle: 'Footer Stat'}
            },
          },
        },
      ],
      initialValue: [
        {_key: 'fs-1', order: 1, number: '200+', label: 'Projects Completed'},
        {_key: 'fs-2', order: 2, number: '98%', label: 'Client Satisfaction'},
        {_key: 'fs-3', order: 3, number: '50+', label: 'Industry Awards'},
        {_key: 'fs-4', order: 4, number: '24/7', label: 'Support Available'},
      ],
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Why Us', subtitle: 'Why Choose Prince House Films'}
    },
  },
})
