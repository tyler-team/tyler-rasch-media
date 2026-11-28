import { defineType, defineField } from "sanity";

export const dossier = defineType({
  name: "dossier",
  title: "1BWS Intelligence Dossier (도시에)",
  type: "document",
  groups: [
    { name: "meta", title: "1. 식별·상태·프리뷰 / Meta & Status", default: true },
    { name: "content", title: "2. 테제·도식·본문 / Content & Schematic" },
    { name: "sources", title: "3. 1차 사료·영상 연동 / MLA & YouTube" },
  ],
  fields: [
    defineField({
      name: "dossierNo",
      title: "Dossier No. (예: 2026-44)",
      type: "string",
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lang",
      title: "Language (언어)",
      type: "string",
      group: "meta",
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
      name: "status",
      title: "Publication Status (공개 상태)",
      description:
        "Stage 2.5 직후 draft → 검수 후 unlisted(Track A B2B 제안서 첨부용) → 3-C n8n 영상 발행 시 published 자동 전환",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "Draft (작성 중)", value: "draft" },
          { title: "Unlisted (B2B 제안서 비공개 프리뷰)", value: "unlisted" },
          { title: "Published (/1bws 공식 공개)", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewToken",
      title: "Preview Token (비공개 열람 토큰)",
      description:
        "Track A partner@ B2B 제안서에 첨부하는 ?dossier=<dossierNo>&preview=<token> 전용 난수 토큰",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "discipline",
      title: "Discipline (분과)",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "거시경제 · 자본시장 (Macroeconomics & Capital)", value: "macro" },
          { title: "지정학 · 외교안보 (Geopolitics & Statecraft)", value: "geopolitics" },
          { title: "기술 · 에너지 공급망 (Tech & Energy Grids)", value: "tech" },
          { title: "역사 · 사료 아카이브 (History & Archives)", value: "history" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region (지역)",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "북미 (North America)", value: "north-america" },
          { title: "유럽 · 중동 (Europe & ME)", value: "europe-me" },
          { title: "아시아 · 한국 (Asia & Korea)", value: "asia-korea" },
          { title: "글로벌 사우스 (Global South)", value: "global-south" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publish Date (발행 일자)",
      type: "date",
      group: "meta",
      initialValue: () => new Date().toISOString().slice(0, 10),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (예: 10 MIN READ)",
      type: "string",
      group: "meta",
      initialValue: "10 MIN READ",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "meta",
      options: { source: "dossierNo", maxLength: 96 },
    }),

    // --- CONTENT ---
    defineField({
      name: "title",
      title: "Dossier Headline (도시에 제목)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thesis",
      title: "Core Thesis / Why It Matters (핵심 테제 박스)",
      type: "text",
      group: "content",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Executive Context (보조 요약 문단)",
      type: "text",
      group: "content",
      rows: 4,
    }),
    defineField({
      name: "mechanismSteps",
      title: "3-Step Mechanism Schematic (3단계 구조 도식 데이터)",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "kicker", title: "Step Label (예: STEP 01 · PRIMARY DRIVER)", type: "string" },
            { name: "headline", title: "Step Summary (핵심 요약)", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "bodySections",
      title: "Body Sections (본문 섹션 배열)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "dossierSection",
          fields: [
            { name: "heading", title: "Section Heading (소제목)", type: "string" },
            { name: "paragraph", title: "Section Body (본문)", type: "text", rows: 5 },
          ],
        },
      ],
    }),

    // --- SOURCES & YOUTUBE ---
    defineField({
      name: "mlaCitations",
      title: "MLA 9th Edition Citations (1차 사료 서지 목록)",
      type: "array",
      group: "sources",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "linkedYoutubeId",
      title: "Linked YouTube Video ID (연관 유튜브 영상 ID, 예: dUWffWSGPwQ)",
      description:
        "3-C n8n이 발행 감지 시 자동 주입하여 #media-hub ↔ #intelligence-dossier 양방향 연결에 사용됩니다.",
      type: "string",
      group: "sources",
    }),
  ],
  preview: {
    select: {
      title: "title",
      dossierNo: "dossierNo",
      lang: "lang",
      status: "status",
    },
    prepare({ title, dossierNo, lang, status }) {
      const flag = lang === "en" ? "🇺🇸" : "🇰🇷";
      return {
        title: `${flag} [${dossierNo || "NEW"}] ${title || "Untitled Dossier"}`,
        subtitle: `Status: ${(status || "draft").toUpperCase()}`,
      };
    },
  },
});

export default dossier;
