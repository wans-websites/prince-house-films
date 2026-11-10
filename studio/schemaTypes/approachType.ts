// studio/schemaTypes/approachType.ts
// Approach singleton — "Our Creative Process" section.
// steps[] and showcase[] are embedded objects (A3).

import {defineField, defineType} from 'sanity'

export const approachType = defineType({
  name: 'approach',
  title: 'Our Creative Process (Approach)',
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
      description: 'Appears as the H2 at the top of the Approach section.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Our Creative Process',
    }),
    defineField({
      name: 'steps',
      title: 'Process Steps',
      type: 'array',
      group: 'content',
      description: 'The 5 process steps shown in the grid. Each has a number, title, description, and feature list.',
      of: [
        {
          type: 'object',
          name: 'approachStep',
          title: 'Process Step',
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
              title: 'Step Number',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Two-digit step number shown in the circle (e.g. "01").',
              initialValue: '01',
            }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Heading of the step card.',
              initialValue: 'Discovery & Strategy',
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
              description: 'Body text of the step card.',
              initialValue: 'We begin by deeply understanding your vision, audience, and objectives.',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Feature tags shown under the step description.',
              initialValue: ['Creative Brief', 'Audience Analysis', 'Goal Setting', 'Strategy Development'],
            }),
          ],
          preview: {
            select: {title: 'title', number: 'number'},
            prepare({title, number}) {
              return {title: `${number} — ${title}`, subtitle: 'Process step'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'step-01',
          order: 1,
          number: '01',
          title: 'Discovery & Strategy',
          description:
            'We begin by deeply understanding your vision, audience, and objectives. Through collaborative workshops and research, we develop a comprehensive creative strategy that aligns with your goals and resonates with your target audience.',
          features: ['Creative Brief', 'Audience Analysis', 'Goal Setting', 'Strategy Development'],
        },
        {
          _key: 'step-02',
          order: 2,
          number: '02',
          title: 'Concept & Planning',
          description:
            'Our creative team transforms strategy into compelling concepts. We develop scripts, storyboards, shot lists, and production plans that bring your story to life with cinematic vision and technical precision.',
          features: ['Script Writing', 'Storyboarding', 'Pre-Visualization', 'Production Planning'],
        },
        {
          _key: 'step-03',
          order: 3,
          number: '03',
          title: 'Production & Filming',
          description:
            'Using professional cinema cameras, advanced lighting, and expert crew, we capture stunning visuals that tell your story with emotional impact. We maintain open communication throughout to ensure creative alignment.',
          features: ['Cinematic Capture', 'Professional Lighting', 'Audio Recording', 'Direction'],
        },
        {
          _key: 'step-04',
          order: 4,
          number: '04',
          title: 'Post-Production',
          description:
            'Our editors, colorists, and sound designers work their magic to craft the final product. From editing to color grading, sound design to visual effects, we polish every detail to perfection.',
          features: ['Editing', 'Color Grading', 'Sound Design', 'Visual Effects'],
        },
        {
          _key: 'step-05',
          order: 5,
          number: '05',
          title: 'Delivery & Impact',
          description:
            'We deliver final assets in all required formats and provide distribution guidance. Our partnership continues with performance analysis and support to maximize your content\'s impact.',
          features: ['Final Delivery', 'Format Optimization', 'Distribution Strategy', 'Performance Analysis'],
        },
      ],
    }),
    defineField({
      name: 'showcase',
      title: 'Creative Showcase Items',
      type: 'array',
      group: 'content',
      description: 'Three showcase cards below the steps (icon, title, description). Icons use the iconKey dropdown.',
      of: [
        {
          type: 'object',
          name: 'showcaseItem',
          title: 'Showcase Item',
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
              description: 'Showcase card heading.',
              initialValue: 'Innovative Thinking',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Showcase card body text.',
              initialValue: 'Fresh perspectives and creative solutions for every project challenge',
            }),
            defineField({
              name: 'iconKey',
              title: 'Icon Key',
              type: 'string',
              options: {
                list: [
                  {title: 'Lightbulb', value: 'lightbulb'},
                  {title: 'Handshake', value: 'handshake'},
                  {title: 'Play Circle', value: 'play-circle'},
                ],
              },
              description: 'Icon key mapped to a react-icons / bootstrap-icons element.',
              initialValue: 'lightbulb',
            }),
          ],
          preview: {
            select: {title: 'title'},
            prepare() {
              return {title: 'Showcase Item'}
            },
          },
        },
      ],
      initialValue: [
        {
          _key: 'showcase-1',
          order: 1,
          title: 'Innovative Thinking',
          description: 'Fresh perspectives and creative solutions for every project challenge',
          iconKey: 'lightbulb',
        },
        {
          _key: 'showcase-2',
          order: 2,
          title: 'Client Partnership',
          description: 'Collaborative approach with transparent communication at every stage',
          iconKey: 'handshake',
        },
        {
          _key: 'showcase-3',
          order: 3,
          title: 'Quality Assurance',
          description: 'Rigorous quality checks ensuring broadcast-ready final products',
          iconKey: 'play-circle',
        },
      ],
    }),
    defineField({
      name: 'processNote',
      title: 'Process Note Quote',
      type: 'string',
      group: 'content',
      description: 'Quote shown in the process note box at the bottom of the Approach section.',
      initialValue: 'Every great film begins with a great story. Our process ensures your story is told with the creativity, precision, and passion it deserves.',
    }),
    defineField({
      name: 'processNoteAttribution',
      title: 'Process Note Attribution',
      type: 'string',
      group: 'content',
      description: 'Attribution line shown below the process note quote.',
      initialValue: '— Prince House Films Team',
    }),
  ],
  preview: {
    select: {title: 'sectionTitle'},
    prepare() {
      return {title: 'Approach', subtitle: 'Our Creative Process'}
    },
  },
})
