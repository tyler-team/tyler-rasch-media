import { defineField, defineType, defineArrayMember } from 'sanity';

const contentBlockMembers = [
  defineArrayMember({
    type: 'object',
    name: 'textBlock',
    title: 'Text Paragraph (텍스트 문단)',
    fields: [
      {
        name: 'text',
        type: 'text',
        title: 'Paragraph Content (문단 내용)',
        rows: 4,
        validation: (Rule) => Rule.required(),
      },
    ],
    preview: {
      select: {
        text: 'text',
      },
      prepare({ text }) {
        return {
          title: text ? (text.length > 60 ? text.slice(0, 60) + '...' : text) : 'Text paragraph',
        };
      },
    },
  }),
  defineArrayMember({
    type: 'image',
    title: 'Image (이미지 업로드)',
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: 'caption',
        type: 'string',
        title: 'Caption (이미지 설명)',
        description: '이미지 하단에 표시될 설명문 (선택 사항)',
      },
      {
        name: 'alt',
        type: 'string',
        title: 'Alt Text (대체 텍스트)',
        description: '검색엔진(SEO) 및 웹 접근성을 위한 설명',
      },
    ],
  }),
  defineArrayMember({
    type: 'object',
    name: 'videoEmbed',
    title: 'YouTube Video (유튜브 영상 임베드)',
    fields: [
      {
        name: 'url',
        type: 'url',
        title: 'YouTube Video URL (유튜브 링크)',
        description: '예: https://www.youtube.com/watch?v=... 또는 https://youtu.be/...',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Video Caption (영상 설명)',
        description: '영상 하단에 표시될 설명문 (선택 사항)',
      },
    ],
    preview: {
      select: {
        url: 'url',
        caption: 'caption',
      },
      prepare({ url, caption }) {
        return {
          title: caption || 'YouTube Video',
          subtitle: url,
        };
      },
    },
  }),
];

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
      title: 'Body Content (Paragraphs, Images & Videos)',
      type: 'object',
      fields: [
        {
          name: 'KR',
          title: 'Korean Content Blocks',
          type: 'array',
          of: contentBlockMembers,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'EN',
          title: 'English Content Blocks',
          type: 'array',
          of: contentBlockMembers,
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
});
