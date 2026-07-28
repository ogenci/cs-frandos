import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Visa Guide', value: 'Visa Guide'},
          {title: 'Travel', value: 'Travel'},
          {title: 'Career', value: 'Career'},
          {title: 'Document', value: 'Document'},
        ],
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'title', tag: 'tag', media: 'image'},
    prepare({title, tag, media}: {title: string; tag?: string; media?: unknown}) {
      return {
        title,
        subtitle: tag ? `🏷 ${tag}` : 'No category',
        media,
      }
    },
  },
})