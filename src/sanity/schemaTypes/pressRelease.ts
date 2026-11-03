import { defineType, defineField } from "sanity";

export const pressRelease = defineType({
  name: "pressRelease",
  title: "Press Release (보도자료)",
  type: "document",
  groups: [
    {
      name: "meta",
      title: "1. 기본 설정 및 언어 연동 / Meta & Language",
      default: true,
    },
    {
      name: "summary",
      title: "2. 제목 및 핵심 리드문 / Headline & Summary",
    },
    {
      name: "content",
      title: "3. 멀티미디어 및 본문 / Media & Body",
    },
    {
      name: "footer",
      title: "4. 기업 소개 및 문의처 / Boilerplate",
    },
  ],
  fields: [
    // --- GROUP 1: META & LANGUAGE ---
    defineField({
      name: "lang",
      title: "Language (언어)",
      description:
        "국문 보도자료는 Korean (KR), 영문 보도자료는 반드시 English (EN)을 선택하세요.",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Korean (KR) — 국문 뉴스룸 (/ko/press)", value: "ko" },
          { title: "English (EN) — 영문 뉴스룸 (/en/press)", value: "en" },
        ],
        layout: "radio",
      },
      initialValue: "ko",
      validation: (Rule) =>
        Rule.required().custom((lang, context) => {
          const doc = context.document as {
            title?: string;
            slug?: { current?: string };
          } | undefined;
          const slugCurrent = doc?.slug?.current || "";
          const title = doc?.title || "";
          const hasHangul = /[가-힣]/.test(title);
          const isEnglishAsciiTitle =
            title.trim().length > 10 && !hasHangul && /[a-zA-Z]{4,}/.test(title);

          if (lang === "ko" && (slugCurrent.endsWith("-en") || isEnglishAsciiTitle)) {
            return "영문 보도자료인 경우 Language (언어)를 반드시 English (EN)으로 선택해 주세요! (Korean 선택 시 /en/press에 노출되지 않습니다)";
          }
          if (lang === "en" && hasHangul && !slugCurrent.endsWith("-en")) {
            return "국문 제목이 감지되었습니다. 국문 보도자료인 경우 Language (언어)를 Korean (KR)으로 선택해 주세요.";
          }
          return true;
        }),
    }),
    defineField({
      name: "category",
      title: "Category (보도자료 분류)",
      description: "뉴스룸 카테고리 배지 및 필터링에 사용됩니다 (선택 사항).",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "1BWS 에피소드 / Episode Premiere", value: "episode" },
          { title: "독점 인터뷰 / Exclusive Guest Interview", value: "interview" },
          { title: "기업·파트너십 / Corporate & Partnership", value: "partnership" },
          { title: "중소기업·스타트업 상생 / SME Co-Prosperity Program", value: "sme" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Release Date (배포 일자)",
      type: "date",
      group: "meta",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug (영문 케밥 케이스 권장, 예: 1bws-lithium-paradox-261026)",
      description:
        "국문은 <주제-슬러그>-YYMMDD, 영문은 <주제-슬러그>-YYMMDD-en 형식을 권장합니다.",
      type: "slug",
      group: "meta",
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
      validation: (Rule) =>
        Rule.required().custom((slug, context) => {
          const doc = context.document as { lang?: string } | undefined;
          const current = slug?.current || "";
          if (!current) return "URL Slug는 필수입니다.";
          if (doc?.lang === "ko" && current.endsWith("-en")) {
            return "영문 보도자료(-en 슬러그)인 경우 Language (언어)를 반드시 English (EN)으로 선택해 주세요! (Korean 선택 시 /en/press에 노출되지 않습니다)";
          }
          return true;
        }),
    }),
    defineField({
      name: "translationRef",
      title: "Linked Translation (대응 언어 보도자료 연결)",
      description:
        "국문 기사라면 대응 영문 기사를, 영문 기사라면 대응 국문 기사를 선택하세요. (한쪽만 연결해도 양방향 자동 연동)",
      type: "reference",
      group: "meta",
      to: [{ type: "pressRelease" }],
      options: {
        filter: ({ document }) => {
          if (!document?.lang) return {};
          return {
            filter: "lang != $lang",
            params: { lang: document.lang },
          };
        },
      },
    }),

    // --- GROUP 2: HEADLINE & SUMMARY ---
    defineField({
      name: "title",
      title: "Headline (메인 제목)",
      type: "string",
      group: "summary",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (부제목 / 핵심 요약)",
      description: "제목 하단에 표시될 부제목 (앞에 - 기호를 붙이지 않아도 자동 표시됩니다).",
      type: "string",
      group: "summary",
    }),
    defineField({
      name: "highlights",
      title: "Key Highlights (핵심 요약 3줄)",
      description:
        "기자와 AI 검색엔진(GEO)이 5초 만에 핵심을 파악할 수 있도록 3줄 요약 불릿을 입력하세요.",
      type: "array",
      group: "summary",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "byline",
      title: "Byline (바이라인 / 배포처 및 일시)",
      description: "예: 타일러 미디어 커뮤니케이션팀 (2026년 11월 03일, 서울)",
      type: "string",
      group: "summary",
    }),
    defineField({
      name: "intro5W1H",
      title: "Lead Paragraph (5W1H 핵심 리드문)",
      description:
        "기사 상단 강조 박스에 표시되며, 구글 검색/OpenGraph 요약문(meta description)으로도 자동 활용됩니다.",
      type: "text",
      group: "summary",
      rows: 3,
    }),

    // --- GROUP 3: MEDIA & BODY ---
    defineField({
      name: "heroImage",
      title: "Hero & OG Image (대표 보도 이미지 — 선택 사항)",
      description:
        "기사 상단 대표 이미지 및 카카오톡/SNS 공유 시 1200x630 OpenGraph 썸네일로 우선 사용됩니다. (비워두면 본문 내 첫 번째 이미지를 자동 사용합니다)",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        { name: "caption", title: "Caption (사진 캡션)", type: "string" },
        { name: "alt", title: "Alt Text (SEO 대체 텍스트)", type: "string" },
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube Episode URL (유튜브 영상 링크 — 선택 사항)",
      description:
        "예: https://www.youtube.com/watch?v=... 또는 https://youtu.be/... (입력 시 본문 하단 또는 지정 위치에 플레이어가 자동 렌더링됩니다)",
      type: "url",
      group: "content",
    }),
    defineField({
      name: "youtubeCaption",
      title: "YouTube Video Caption (유튜브 영상 캡션 — 선택 사항)",
      description: "유튜브 플레이어 하단에 표시될 설명 (예: 1BWS 에피소드 공식 본편)",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body Content (본문 블록)",
      type: "array",
      group: "content",
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
                title: text
                  ? text.length > 60
                    ? text.slice(0, 60) + "..."
                    : text
                  : "Text paragraph",
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

    // --- GROUP 4: BOILERPLATE ---
    defineField({
      name: "boilerplate",
      title: "Boilerplate & Media Contact (기업 소개 및 연락처)",
      type: "text",
      group: "footer",
      rows: 6,
      initialValue: `About Tyler Media\nTyler Media (KNMIR INC) is a Seoul-based digital media production studio and global IP venture led by media personality and creator Tyler Rasch. Operating flagship intellectual properties including One Big World Show (talking head video series & podcast) and Really Tyler, the studio produces premium non-fiction content grounded in geopolitics, international political economy (IPE), and global supply chain analysis.\n\nMedia Contact: press@tylerrasch.com | https://www.tylerrasch.com/ko/press`,
    }),
  ],
  preview: {
    select: {
      title: "title",
      lang: "lang",
      date: "date",
      slug: "slug.current",
      media: "heroImage",
    },
    prepare({ title, lang, date, slug, media }) {
      const badge = lang === "en" ? "🇺🇸 [EN]" : "🇰🇷 [KR]";
      return {
        title: `${badge} ${title || "Untitled Press Release"}`,
        subtitle: `${date || "No date"} · /${lang === "en" ? "en" : "ko"}/press/${slug || ""}`,
        media,
      };
    },
  },
});

export default pressRelease;
