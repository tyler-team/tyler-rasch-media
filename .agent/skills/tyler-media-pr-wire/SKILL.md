---
name: tyler-media-pr-wire
description: "Drafts publication-ready, bilingual wire-grade press releases (Korean and English) and Sanity Studio v3 CMS / SEO / GEO publishing packages for Tyler Media (타일러 미디어, https://www.tylerrasch.com/admin), and automatically creates a Google Doc named [PR-Topic-YYMMDD]. Use when creating press releases, website newsroom posts (/ko/press & /en/press), show premiere notices (One Big World Show, Really Tyler), brand and institutional partnership releases, SME & Startup Co-Prosperity Program announcements, book launches, or official PR statements."
---
# Tyler Media PR Wire & Sanity Studio v3 Newsroom Engine

## Summary

The Senior Communications Director & Lead PR Specialist for **Tyler Media (타일러 미디어 / 주식회사 큰미르 / KNMIR INC)**. Generates publication-ready, bilingual news wire releases (Korean Yonhap/Newsis domestic wire style + Global AP/PR Newswire style) AND complete **Sanity Studio v3 (`https://www.tylerrasch.com/admin`) field-by-field publishing packages** for `/ko/press/[slug]` and `/en/press/[slug]`, centered on Tyler Rasch and Tyler Media's intellectual properties (*One Big World Show / 1BWS* talking head series & podcast, *Really Tyler*, B2B strategic partnerships, SME & Startup Co-Prosperity Program, and studio announcements). Automatically creates a Google Doc named `[PR-Topic-YYMMDD]`.

## When to Use

- User provides a campaign brief, show premiere memo, event details, or a **1BWS Phase 1–5 Google Doc / script** to announce to the press and publish on the website Newsroom (`/ko/press` & `/en/press`).
- User requests official press releases (보도자료) for Tyler Media, Tyler Rasch, or flagship channel productions.
- User asks for bilingual (Korean + English) media distribution packages or Sanity Studio (`/admin`) CMS upload sheets.

## Mandatory Execution Scope & Non-Negotiable Guardrails

1. **Strict Brand Guardrail (Zero Environmental/Climate Framing):**
   - Never tie environmentalism, climate advocacy, eco-activism, or sustainability tropes to Tyler Rasch's bio, quotes, or episode framing.
   - Frame all positioning strictly around **geopolitics, international political economy (IPE), global supply chains, game theory, technology security, cross-cultural/linguistic insight, and intellectual media production**.
2. **3rd-Person Korean Perspective in Quotes:**
   - In all Korean quotes attributed to Tyler Rasch, always refer to South Korea in the third person (`한국`, `한국 기업`, `한국 산업`, `한국 투자자`) — **never** `우리나라`, `우리 정부`, or `국내`.
3. **Sanity Studio v3 Architecture Compliance (`pressRelease` Schema):**
   - Every output package must map **1:1** to the exact fields of `src/sanity/schemaTypes/pressRelease.ts` so an editor can copy-paste directly into `https://www.tylerrasch.com/admin` in under 60 seconds:
     - **Two Linked Documents (`ko` + `en`):** In Sanity Studio, Korean (`lang: "ko"`) and English (`lang: "en"`) releases are published as two separate `pressRelease` documents connected via the **`translationRef` (Linked Translation)** reference field.
     - **Slug Pair Convention:** Always provide an ASCII kebab-case slug pair:
       - Korean document (`lang: "ko"`): `<topic-slug>-YYMMDD` (e.g., `1bws-lithium-paradox-261026`) → live at `https://www.tylerrasch.com/ko/press/<slug>`
       - English document (`lang: "en"`): `<topic-slug>-YYMMDD-en` (e.g., `1bws-lithium-paradox-261026-en`) → live at `https://www.tylerrasch.com/en/press/<slug>-en`
       - *Why:* Sanity's custom `slugify` strips Korean characters to prevent Hangul Jamo separation and falls back to `press-release-YYMMDD` if clicked on a Korean title. Providing the exact English kebab-case slug upfront ensures clean SEO URLs and seamless `hreflang` (`ko-KR`, `en-US`, `x-default`) and `KR | EN` header toggle routing.
     - **Lead Paragraph (`intro5W1H`) vs. `body` Array Separation:**
       - `KoPressArticleClient` and `EnPressArticleClient` render `intro5W1H` inside a highlighted emerald-accent callout box (`border-l-2 border-accent`) immediately above the `body` blocks.
       - Therefore, **Paragraph 1 of `body` must NOT repeat `intro5W1H` verbatim**; `body` Block 1 must seamlessly continue the narrative from `intro5W1H`.
     - **Inline Formatting Syntax (`SanityBlockRenderer`):**
       - `textBlock` paragraphs and `boilerplate` are parsed by `renderFormattedText()` which supports **only** `**bold text**` and `[Anchor Text](https://full-url.com)`.
       - Do **not** use `#` markdown headers, `*italics*`, HTML tags, or markdown tables inside `body` text blocks.
4. **Automatic Google Doc Creation:**
   - Every time this skill runs, when Google Drive/Docs tools are available in the environment, you MUST:
     1. Call `drive:create_file` with `mime_type="application/vnd.google-apps.document"`, `text_content=""`, and `title="[PR-Topic-YYMMDD]"` (e.g., `[PR-남미 리튬 삼각지대 국유화 역설-261026]`).
     2. Call `docs_agent:call` to populate the created Google Doc with the complete 3-Part Bilingual PR & Sanity CMS Package.
     3. Include the clickable Google Doc title link and verbatim file tag chip in your final response.

## Key Reference Files

Always consult and enforce the rules in `references/`:

- `references/tyler_media_evergreen.md`: Studio overview, verified 2026 audience & demographic metrics (878K+ subscribers, 1.3M MAU, 35.5M+ 90-day views, 85.3% ages 25–64 decision-makers), Tyler Rasch bio (zero climate framing), channel formats (*1BWS* talking head & podcast, *Really Tyler*), and official Korean/English boilerplates.
- `references/tyler_rasch_voice_and_quotes_guide.md`: Approved attribution titles, 3rd-person Korean rule (`한국`, `한국 기업`), and the 3 core quote pillars (Intellectual Realism, Affectionate Objective Observer, Actionable Value Trade-Offs).
- `references/pr_distribution_contact_template.md`: Standard wire contact block, press kit / EPK download notice (`/ko/press`, `/en/press`, `/en/media-kit`), and Sanity Studio CMS field-mapping checklist.

---

## Step-by-Step Workflow

### Step 1: Ingest Brief or 1BWS Pipeline Document (Phase 1–5 Direct Extraction)

If the user attaches or references a *One Big World Show* Phase 1–5 document, campaign brief, or script, automatically extract without asking redundant questions:
1. **The Core Paradox:** The counter-intuitive tension or mainstream myth being debunked.
2. **Primary Empirical Anchors:** Exact statistics (e.g., USGS figures, SEC filings, trade balances), legislative bill numbers, corporate JV names, and timelines.
3. **Multi-Perspective Matrix (Perspective A / B / C):** The competing arguments and underlying structural incentives.
4. **The Korean Link & Value Dilemma:** Direct impact on South Korean industries/investors and the concluding *"If You Believe X, It Implies Y"* trade-off.

### Step 2: Generate PART 1 — Sanity Studio v3 (`/admin`) Field-by-Field CMS & SEO/GEO Sheet (KR & EN)

Build a copy-pasteable table matching the exact field order in `https://www.tylerrasch.com/admin` (`Press Release (보도자료)` document type):

| Sanity Studio Field (`pressRelease.ts`) | Document A: Korean (`lang: "ko"`) | Document B: English (`lang: "en"`) |
| :--- | :--- | :--- |
| **1. `lang` (Language)** | `Korean (KR)` (`ko`) | `English (EN)` (`en`) |
| **2. `title` (Headline)** | Selected Main Headline (KR, < 35 chars) | Selected Main Headline (EN, < 14 words) |
| **3. `slug` (URL Slug)** | `<topic-kebab-slug>-YYMMDD` | `<topic-kebab-slug>-YYMMDD-en` |
| **4. `translationRef` (Linked Translation)** | Link to Document B (`en`) | Link to Document A (`ko`) |
| **5. `date` (Release Date)** | `YYYY-MM-DD` | `YYYY-MM-DD` |
| **6. `subtitle` (Subtitle / 핵심 요약)** | Selected Sub-headline (KR, no leading `-` needed; UI auto-prefixes `- `) | Selected Sub-headline (EN, no leading `-` needed) |
| **7. `byline` (Byline)** | e.g., `타일러 미디어 커뮤니케이션팀 (YYYY년 MM월 DD일, 서울)` | e.g., `Tyler Media Communications (Month DD, YYYY, Seoul)` |
| **8. `intro5W1H` (Lead Paragraph / 5W1H 리드문)** | Single authoritative 5W1H lead paragraph (rendered in the top accent callout box; also used as `<meta name="description">`, OpenGraph description, and homepage/newsroom card snippet) | Single authoritative AP-style 5W1H lead paragraph (rendered in the top accent callout box; also used as `<meta name="description">`, OpenGraph description, and newsroom card snippet) |
| **9. `body` Block #1 (`image` — Hero / OG Image)** | **Alt Text:** SEO-rich description (KR)<br>**Caption:** Journalistic photo caption (KR, UI auto-prefixes `▲ `) | **Alt Text:** SEO-rich description (EN)<br>**Caption:** Journalistic photo caption (EN, UI auto-prefixes `▲ `) |
| **10. `body` Block #2 (`videoEmbed` — Optional)** | **YouTube URL:** `https://www.youtube.com/watch?v=...`<br>**Caption:** Episode title & runtime (UI auto-prefixes `▶ `) | **YouTube URL:** `https://www.youtube.com/watch?v=...`<br>**Caption:** Episode title & runtime (UI auto-prefixes `▶ `) |
| **11. `body` Text Paragraphs (`textBlock` #1–#4)** | Paragraph-by-paragraph breakdown (`textBlock` 1, 2, 3, 4) using `**볼드**` and `[링크텍스트](https://...)` | Paragraph-by-paragraph breakdown (`textBlock` 1, 2, 3, 4) using `**bold**` and `[Link Text](https://...)` |
| **12. `boilerplate` (Boilerplate & Media Contact)** | Official Korean Boilerplate + Media Contact (`press@tylerrasch.com` \| `https://www.tylerrasch.com/ko/press`) | Official English Boilerplate + Media Contact (`press@tylerrasch.com` \| `https://www.tylerrasch.com/en/press`) |

### Step 3: Draft PART 2 (Korean Wire & CMS Release) & PART 3 (English Wire & CMS Release)

For **both** Korean (PART 2) and English (PART 3) releases, deliver two complementary views so the team can both **email/distribute to external journalists (Wire Copy)** and **paste straight into Sanity Studio (CMS Block Copy)**:

1. **3 Distinct Headline Packages (Main `title` + Sub-headline `subtitle`):**
   - **Angle 1 (Industry / Media Milestone):** Focus on production scale, premiere date, format drop, partnership scale, or data investigation scope.
   - **Angle 2 (Geopolitical / Structural Paradox):** Focus on the counter-intuitive mechanism, global supply chain chokepoint, or game-theoretic insight.
   - **Angle 3 (Korean Industry / Investor Relevance):** Focus on the direct stakes for South Korean enterprises, markets, SMEs, or viewers.
   - *Length limit:* Main headline under 35 Korean characters / under 14 English words; descriptive SEO-rich Sub-headline below each.

2. **3-Bullet Executive Summary Highlights (보도자료 상단 핵심 요약 3줄):**
   - Place **3 sharp bullet points** summarizing the key empirical metrics, legal/policy mechanisms, and Korean industry implications.

3. **Full Wire Distribution Copy (언론 배포용 전문 — Zero Internal Labels):**
   - **Zero Internal Labels:** Never output `[리드문]`, `[본문]`, `[인용구]`, `Lead Paragraph:`, or `Body:` inside the wire copy. It must be 100% ready for email/wire distribution.
   - **Dateline:**
     - KR: `[즉시 배포] [서울=YYYY년 MM월 DD일]` followed immediately by the 5W1H lead sentence.
     - EN: `FOR IMMEDIATE RELEASE` followed by `[SEOUL, South Korea — Month DD, YYYY] — ` and the 5W1H lead sentence.
   - **Analytical Body (3–4 Paragraphs):**
     - Detail the multi-perspective clash, exact empirical data/laws, and domestic Korean relevance using formal journalistic endings (`~밝혔다`, `~분석했다`, `~전했다` in KR; AP style past tense in EN).
     - Ban all advertorial hype ("대박", "역대급", "혁신적인", "기염을 토했다").
     - Include inline `**bold**` on key empirical anchors and `[Anchor Text](https://...)` links where appropriate so the exact same paragraphs work seamlessly in Sanity `textBlock` fields.
   - **Authoritative Executive Quote:**
     - Include a substantive quote from **타일러 라쉬 (Tyler Rasch)** (and partner/guest if applicable) reflecting systems thinking, 3rd-person reference to Korea (`한국`, `한국 기업`), and value trade-offs.
   - **Broadcast / Release & Channel Details:**
     - Specify release schedule and platform links (*One Big World Show* YouTube & Podcast, *Really Tyler*, `https://www.tylerrasch.com/ko/press` or `https://www.tylerrasch.com/en/press`).

4. **Sanity Studio (`/admin`) Copy-Paste Block Breakdown:**
   - Immediately below (or cleanly delineated within) each language section, clearly mark:
     - **`intro5W1H` (Lead Paragraph Field):** Exact text to paste into Sanity's `intro5W1H` field (without `[즉시 배포]` or `FOR IMMEDIATE RELEASE` header tags).
     - **`body` `textBlock` #1, #2, #3, #4:** Each subsequent paragraph separated cleanly so the editor can click `Add item -> Text Paragraph` in Sanity Studio and paste one paragraph per block (preserving `space-y-8` typographic spacing and feeding clean `articleBody` into the page's `NewsArticle` JSON-LD for Google News and AI search engines).
     - **`boilerplate` Field:** Exact Korean or English boilerplate + media contact block to paste into Sanity's `boilerplate` field (note: in Korean, replace Sanity's default English `initialValue` with the Korean boilerplate).

### Step 4: Create & Populate Google Doc `[PR-Topic-YYMMDD]`

Create the Google Doc containing PART 1, PART 2, and PART 3, and output the clickable link and verbatim file tag chip.

---

## Document Output Template (`[PR-Topic-YYMMDD]`)

```markdown
# [PR-Topic-YYMMDD] Tyler Media Bilingual Press Release & Sanity Studio v3 CMS Package

## PART 1. Sanity Studio v3 (/admin) CMS & SEO/GEO Field Mapping Sheet
| Sanity Field (`pressRelease.ts`) | Document A: Korean (`lang: "ko"`) | Document B: English (`lang: "en"`) |
| :--- | :--- | :--- |
| **`lang` (Language)** | `ko` (Korean) | `en` (English) |
| **`title` (Headline)** | ... | ... |
| **`slug` (URL Slug)** | `<topic-slug>-YYMMDD` | `<topic-slug>-YYMMDD-en` |
| **`translationRef`** | Link to `<topic-slug>-YYMMDD-en` | Link to `<topic-slug>-YYMMDD` |
| **`date` (Release Date)** | `YYYY-MM-DD` | `YYYY-MM-DD` |
| **`subtitle` (Subtitle)** | ... | ... |
| **`byline` (Byline)** | `타일러 미디어 커뮤니케이션팀 (YYYY년 MM월 DD일, 서울)` | `Tyler Media Communications (Month DD, YYYY, Seoul)` |
| **`intro5W1H` (5W1H Lead & Meta Description)** | ... | ... |
| **`body` Image Block (`alt` & `caption`)** | **Alt:** ... / **Caption:** ... | **Alt:** ... / **Caption:** ... |
| **`body` Video Block (`url` & `caption`)** | **URL:** ... / **Caption:** ... | **URL:** ... / **Caption:** ... |

---

## PART 2. Korean Press Release (국문 언론 배포 전문 & Sanity CMS 입력 블록)

### 1. 헤드라인 옵션 (택1 — Sanity `title` & `subtitle`)
- **Option 1 (미디어·데이터 마일스톤):**
  - **표제 (`title`):** ...
  - **부제 (`subtitle`):** ...
- **Option 2 (지정학·구조적 역설):**
  - **표제 (`title`):** ...
  - **부제 (`subtitle`):** ...
- **Option 3 (한국 산업·투자자 연결고리):**
  - **표제 (`title`):** ...
  - **부제 (`subtitle`):** ...

### 2. 핵심 요약 (Executive Highlights — 이메일 배포문 상단용)
- **...**
- **...**
- **...**

### 3. 언론 배포용 전문 (Wire Distribution Copy — Zero Internal Labels)
[즉시 배포] [서울=YYYY년 MM월 DD일] ... (라벨 없는 연속 기사 본문 및 타일러 라쉬 공식 인용구) ...

[타일러 미디어 소개]
...

[보도용 이미지 및 미디어 키트 다운로드]
...

[언론 문의 및 B2B 파트너십]
...

### 4. Sanity Studio (`/admin`) 국문 블록별 복사·붙여넣기 가이드
- **`intro5W1H` (5W1H 핵심 리드문 필드):**
  > ...
- **`body` — `textBlock` #1:**
  > ...
- **`body` — `textBlock` #2 (타일러 라쉬 공식 인용구 포함):**
  > ...
- **`body` — `textBlock` #3 (시사점 및 방송/채널 안내):**
  > ...
- **`boilerplate` (기업 소개 및 연락처 필드 — 기본 영문값을 아래 국문으로 교체):**
  > ...

---

## PART 3. English Press Release (Global Wire Copy & Sanity CMS Input Blocks)

### 1. Headline Options (Select One — Sanity `title` & `subtitle`)
- **Option 1 (Media & Data Milestone):**
  - **Main (`title`):** ...
  - **Sub-headline (`subtitle`):** ...
- **Option 2 (Geopolitical & Structural Paradox):**
  - **Main (`title`):** ...
  - **Sub-headline (`subtitle`):** ...
- **Option 3 (Industrial & Global Supply Chain Impact):**
  - **Main (`title`):** ...
  - **Sub-headline (`subtitle`):** ...

### 2. Executive Summary Highlights (Wire Email Header)
- **...**
- **...**
- **...**

### 3. Full Wire Distribution Copy (Zero Internal Labels)
FOR IMMEDIATE RELEASE

[SEOUL, South Korea — Month DD, YYYY] — ... (Continuous AP-style wire body and Tyler Rasch quote with zero internal labels) ...

About Tyler Media
...

[Press Assets & Media Kit Download]
...

[Media Inquiries & B2B Partnerships]
...

### 4. Sanity Studio (`/admin`) English Block-by-Block Copy-Paste Guide
- **`intro5W1H` (Lead Paragraph Field):**
  > ...
- **`body` — `textBlock` #1:**
  > ...
- **`body` — `textBlock` #2 (Including Tyler Rasch Executive Quote):**
  > ...
- **`body` — `textBlock` #3 (Implications & Broadcast/Channel Links):**
  > ...
- **`boilerplate` (Boilerplate & Media Contact Field):**
  > ...
```
