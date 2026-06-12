import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog & Essay',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Display reference in studio list)',
      type: 'string',
      description: 'Internal reference title, e.g., SME Guide - PPL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Tyler Media Team',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'object',
      fields: [
        { name: 'KR', type: 'string', title: 'Korean Category Name (e.g. 가이드)' },
        { name: 'EN', type: 'string', title: 'English Category Name (e.g. Guide)' },
      ],
    }),
    defineField({
      name: 'blogTitle',
      title: 'Blog Title (Bilingual)',
      type: 'object',
      fields: [
        { name: 'KR', type: 'string', title: 'Korean Title', validation: (Rule) => Rule.required() },
        { name: 'EN', type: 'string', title: 'English Title', validation: (Rule) => Rule.required() },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Opening summary box)',
      type: 'object',
      fields: [
        { name: 'KR', type: 'text', rows: 3, title: 'Korean Excerpt' },
        { name: 'EN', type: 'text', rows: 3, title: 'English Excerpt' },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'object',
      fields: [
        {
          name: 'KR',
          title: 'Korean Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'EN',
          title: 'English Paragraphs',
          type: 'array',
          of: [{ type: 'text', rows: 4 }],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
