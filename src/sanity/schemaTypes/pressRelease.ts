import { defineField, defineType } from 'sanity';

export const pressRelease = defineType({
  name: 'pressRelease',
  title: 'Press Release',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'lang',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Korean (KR)', value: 'ko' },
          { title: 'English (EN)', value: 'en' },
        ],
      },
      initialValue: 'ko',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'byline',
      title: 'Byline (e.g. reporter, location, date)',
      type: 'string',
    }),
    defineField({
      name: 'intro5W1H',
      title: 'Intro 5W1H (Korean summary highlight box)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body Paragraphs',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'boilerplate',
      title: 'Boilerplate (Korean boilerplate info)',
      type: 'text',
      rows: 4,
    }),
  ],
});
