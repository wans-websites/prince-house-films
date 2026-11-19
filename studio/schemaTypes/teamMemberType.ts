// studio/schemaTypes/teamMemberType.ts
// Team Member collection doc (A8: reserved — not rendered yet on the site).
// Hidden from the Studio list until content is ready.

import {defineField, defineType} from 'sanity'
import {socialLinkType} from './socialLinkType'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
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
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
      description: 'Team member name.',
      initialValue: 'Creative Director',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'content',
      description: 'Team member role/title.',
      initialValue: 'Creative Director',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      group: 'content',
      rows: 4,
      description: 'Team member biography.',
      initialValue: 'Passionate storyteller and cinematographer.',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Team member photo.',
    }),
    defineField({
      name: 'photoAlt',
      title: 'Photo Alt Text',
      type: 'string',
      group: 'media',
      description: 'Accessible alt text for the team member photo.',
      initialValue: 'Creative Director',
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      group: 'links',
      of: [{type: 'socialLink'}],
      description: 'Team member social links.',
    }),
  ],
  description: 'Reserved — not rendered yet on the site. Only the group photo is shown in the Team section.',
  orderings: [
    {title: 'Manual Order', name: 'manualOrder', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', role: 'role', media: 'photo'},
    prepare({title, role, media}) {
      return {title: title || 'Untitled Team Member', subtitle: role, media}
    },
  },
})
