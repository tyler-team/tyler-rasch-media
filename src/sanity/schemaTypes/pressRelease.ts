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
    title: 'Image (보도 사진 / 이미지 업로드)',
    options: {
      hotspot: true,
    },
    fields: [
      {
        name: 'caption',
        type: 'string',
        title: 'Caption (사진 설명)',
        description: '보도 사진 하단에 표시될 캡션 (선택 사항)',
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
      description: '부제목 (선택 사항)',
    }),
    defineField({
      name: 'byline',
      title: 'Byline (e.g. reporter, location, date)',
      type: 'string',
    }),
    defineField({
      name: 'intro5W1H',
      title: 'Intro 5W1H (핵심 요약 리드문)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body Content (Paragraphs, Images & Videos)',
      type: 'array',
      of: contentBlockMembers,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'boilerplate',
      title: 'Boilerplate (기업 소개 보일러플레이트)',
      type: 'text',
      rows: 6,
      description: '보도자료 하단 공식 기업 소개문 및 미디어 연락처 (자동 서식)',
      initialValue: `About Tyler Media\nTyler Media is an independent digital media venture based in Seoul, operating the premium knowledge entertainment platform 1BWS/One Big World Show. The company was founded by entrepreneur and broadcaster Tyler Rasch, a University of Chicago and Seoul National University alumnus recognized for his analysis of geopolitics, macroeconomics, and global cultural trends. Tyler Media produces high-production, data-driven content connecting complex global agendas with localized market insights.\n\nMedia Contact\nTyler Media PR\npr@tylerrasch.com\ntylerrasch.com`,
    }),
  ],
});
