# Tyler Media PR Distribution, Contact Block & Sanity Studio v3 Guide

## 1. Standard Press Release Contact & Asset Blocks (For Wire / Email Distribution)

### Korean Press Contact & Media Kit Block (국문 언론 배포용 하단 블록)
```text
[보도용 이미지 및 미디어 키트 다운로드]
• 본 보도자료의 고해상도 썸네일, 4K 데이터 인포그래픽 스틸컷 및 공식 프레스 키트(EPK)는 타일러 미디어 공식 국문 뉴스룸(https://www.tylerrasch.com/ko/press)에서 즉시 다운로드하실 수 있습니다.
• 2026 공식 미디어 파트너십 소개서(PDF): https://www.tylerrasch.com/assets/docs/TylerRasch_MediaKit_2026_KR.pdf

[언론 문의 및 B2B 파트너십]
• 담당: 타일러 미디어 커뮤니케이션팀 (Tyler Media Communications)
• 이메일: press@tylerrasch.com / request@tylerrasch.com
• 공식 국문 뉴스룸: https://www.tylerrasch.com/ko/press
• 공식 영문 뉴스룸 및 EPK: https://www.tylerrasch.com/en/press | https://www.tylerrasch.com/en/media-kit
• 공식 채널:
  - 유튜브 '원빅월드쇼 (One Big World Show — 토킹헤드 & 팟캐스트)': https://www.youtube.com/@onebigworldshow
  - 유튜브 '리얼리 타일러 (Really Tyler)': https://www.youtube.com/@reallytyler
```

---

### English Press Contact & Media Kit Block (Global Wire & Email Distribution)
```text
[Press Assets & Electronic Press Kit (EPK) Download]
• High-resolution episode stills, 4K data infographics, verified audience metrics, and official press kits are available for immediate self-serve download with zero email walls at the Tyler Media Pressroom: https://www.tylerrasch.com/en/press and https://www.tylerrasch.com/en/media-kit
• 2026 Official Media Partnership Guide (PDF): https://www.tylerrasch.com/assets/docs/TylerRasch_MediaKit_2026_EN.pdf

[Media Inquiries & B2B Partnerships]
• Contact: Tyler Media Communications Team
• Email: press@tylerrasch.com / request@tylerrasch.com
• Official English Newsroom: https://www.tylerrasch.com/en/press
• Official Korean Newsroom: https://www.tylerrasch.com/ko/press
• Flagship Channels:
  - YouTube (One Big World Show — Talking Head Series & Podcast): https://www.youtube.com/@onebigworldshow
  - YouTube (Really Tyler): https://www.youtube.com/@reallytyler
```

---

## 2. Sanity Studio v3 (`https://www.tylerrasch.com/admin`) Publishing Checklist

When uploading a bilingual press release to Sanity Studio (`Press Release (보도자료)` schema in `src/sanity/schemaTypes/pressRelease.ts`), follow this exact sequence:

1. **Create Document 1 — Korean Release (`lang: "ko"`):**
   - **`lang`:** Select `Korean (KR)` (`ko`).
   - **`title`:** Paste the selected Korean main headline.
   - **`slug`:** Paste the explicit English kebab-case slug from PART 1 (e.g., `1bws-south-america-lithium-paradox-261026`). *Do not rely on auto-generating from a Korean title, which defaults to `press-release-YYMMDD`.*
   - **`date`:** Select `YYYY-MM-DD`.
   - **`subtitle`:** Paste the Korean sub-headline (do not include a leading `- `; `KoPressArticleClient.tsx` automatically renders `- {release.subtitle}`).
   - **`byline`:** Paste e.g. `타일러 미디어 커뮤니케이션팀 (2026년 10월 26일, 서울)`.
   - **`intro5W1H`:** Paste the standalone 5W1H Lead Paragraph.
     - *Rendering note:* This renders in the top highlighted box (`border-l-2 border-accent`) AND powers the page's `<meta name="description">`, OpenGraph description, and homepage/newsroom preview snippet.
   - **`body` (Array of Blocks):**
     - **Image Block (`image`):** Upload the 16:9 high-resolution thumbnail/still. Fill in `caption` (UI auto-prepends `▲ `) and `alt` (SEO alt text). *The first image in `body` is automatically cropped to `1200x630` via Sanity `urlFor` as the article's OpenGraph social share card.*
     - **Video Block (`videoEmbed` — optional):** Paste the full YouTube episode URL (`https://www.youtube.com/watch?v=...`) and `caption` (UI auto-prepends `▶ `).
     - **Text Blocks (`textBlock` #1, #2, #3...):** Click `Add item -> Text Paragraph` for each body paragraph. Use `**볼드**` for emphasis and `[링크텍스트](https://...)` for clickable links. Do NOT repeat `intro5W1H`.
   - **`boilerplate`:** Replace the default English `initialValue` with the Korean Boilerplate from PART 2.
   - **Click `Publish`**.

2. **Create Document 2 — English Release (`lang: "en"`):**
   - **`lang`:** Select `English (EN)` (`en`).
   - **`title`:** Paste the selected English main headline.
   - **`slug`:** Paste the explicit English kebab-case slug ending in `-en` (e.g., `1bws-south-america-lithium-paradox-261026-en`).
   - **`translationRef` (Linked Translation):** Search for and select the Korean document you just published in Step 1. *(Because GROQ uses bidirectional `coalesce(translationRef->slug.current, *[_type == "pressRelease" && translationRef._ref == ^._id][0].slug.current)`, linking from just one side automatically connects both `/ko/press/[slug]` and `/en/press/[slug]` for the `KR | EN` toggle button and Google `hreflang` tags!)*
   - **`date`**, **`subtitle`**, **`byline`**, **`intro5W1H`**, **`body`**, and **`boilerplate`:** Paste the English blocks from PART 3.
   - **Click `Publish`**.

3. **Automatic On-Demand ISR & SEO Verification:**
   - Publishing triggers `/api/revalidate`, immediately purging the Next.js `"press"` cache tag and updating `/`, `/en`, `/ko/press`, `/en/press`, `/ko/press/[slug]`, `/en/press/[slug]`, and `/sitemap.xml` within 1 second—including Google News `NewsArticle` JSON-LD with full `articleBody`.
