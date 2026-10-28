import { defineType, defineField } from "sanity";

export const pressRelease = defineType({
  name: "pressRelease",
  title: "Press Release (보도자료)",
  type: "document",
  fields: [
    defineField({
      name: "lang",
      title: "Language (언어)",
      type: "string",
      options: {
        list: [
          { title: "Korean (KR)", value: "ko" },
          { title: "English (EN)", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "ko",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Headline (메인 제목)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug (영문 케밥 케이스 권장, 예: 1bws-lithium-paradox-261026)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) => {
          const ascii = input
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");
          const dateSuffix = new Date().toISOString().slice(2, 10).replace(/-/g, "");
          return ascii.length >= 3 ? ascii.slice(0, 96) : `press-release-${dateSuffix}`;
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationRef",
      title: "Linked Translation (대응 언어 보도자료 연결)",
      description: "국문 기사라면 대응 영문 기사를, 영문 기사라면 대응 국문 기사를 선택하세요. (한쪽만 연결해도 양방향 자동 연동)",
      type: "reference",
      to: [{ type: "pressRelease" }],
      options: {
        filter: ({ document }) => {
          if (!document?.lang) return { filter: "" };
          const targetLang = document.lang === "ko" ? "en" : "ko";
          return {
            filter: "lang == $targetLang",
            params: { targetLang },
          };
        },
      },
    }),
    defineField({
      name: "date",
      title: "Release Date (배포 일자)",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (부제목 / 핵심 요약)",
      type: "string",
    }),
    defineField({
      name: "byline",
      title: "Byline (바이라인)",
      type: "string",
    }),
    defineField({
      name: "intro5W1H",
      title: "Lead Paragraph (5W1H 핵심 리드문)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "body",
      title: "Body Content (본문 블록)",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "object",
          name: "textBlock",
          title: "Text Paragraph",
          fields: [
            {
              name: "text",
              title: "Paragraph Text (**볼드** 및 [링크텍스트](https://...) 지원)",
              type: "text",
              rows: 5,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { text: "text" },
            prepare({ text }) {
              return {
                title: text ? (text.length > 60 ? text.slice(0, 60) + "..." : text) : "Text paragraph",
              };
            },
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", title: "Caption (사진 캡션)", type: "string" },
            { name: "alt", title: "Alt Text (SEO 대체 텍스트)", type: "string" },
          ],
        },
        {
          type: "object",
          name: "videoEmbed",
          title: "YouTube Video",
          fields: [
            {
              name: "url",
              title: "YouTube URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            { name: "caption", title: "Video Caption", type: "string" },
          ],
          preview: {
            select: { url: "url", caption: "caption" },
            prepare({ url, caption }) {
              return {
                title: caption || "YouTube Video",
                subtitle: url,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "boilerplate",
      title: "Boilerplate & Media Contact (기업 소개 및 연락처)",
      type: "text",
      rows: 6,
      initialValue: `About Tyler Media\nTyler Media (KNMIR INC) is a Seoul-based digital media production studio and global IP venture led by media personality and creator Tyler Rasch. Operating flagship intellectual properties including One Big World Show (talking head video series & podcast) and Really Tyler, the studio produces premium non-fiction content grounded in geopolitics, international political economy (IPE), and global supply chain analysis.\n\nMedia Contact: press@tylerrasch.com | https://www.tylerrasch.com/ko/press`,
    }),
  ],
});

export default pressRelease;
