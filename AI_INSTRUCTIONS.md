# Tyler Rasch Media Website - AI Agent Knowledge Base & Context Snapshot

> **ATTENTION ALL AI AGENTS (Antigravity, Cursor, Copilot, etc.):**
> BEFORE making any modifications to this codebase, you MUST read and strictly adhere to the rules, context, and design decisions outlined in this document. Any deviation may result in overwritten context or broken UI/UX that the user explicitly worked hard to establish.

## 1. Tech Stack & Frameworks
- **Framework:** Next.js (App Router, v16+)
- **UI Library:** React (v19+)
- **Styling:** Tailwind CSS (v4)
- **Animations:** Framer Motion
- **Hosting:** Vercel

## 2. Core Architecture & State Management
- **Bilingual System (KR/EN):** The site does NOT use standard Next.js i18n routing (e.g., `/ko`, `/en`). Instead, it uses a local React state (`const [lang, setLang] = useState<'KR' | 'EN'>('KR')`) at the top level of the page components (e.g., `src/app/page.tsx`, `src/app/policy/page.tsx`) to toggle text content instantly. **Do not attempt to rewrite this into a traditional i18n routing system.**
- **Views (Main vs. Careers):** The main landing page handles both the overarching "Home" view and the "Careers" view via state toggling (`const [view, setView] = useState<'main' | 'careers'>('main')` or route parameters depending on the component). Ensure you respect this internal routing logic.

## 3. Strict Design & UI Constraints

### Typography & Layout
- **Korean Readability:** Always use CSS classes like `break-keep` or `word-break: keep-all` to ensure Korean words are not awkwardly split across lines on mobile devices.
- **Color Palette:**
  - Background: Pitch black / Deep dark (`bg-[#02060C]`)
  - Accent Color: Neon yellow/green (`text-accent`, `bg-accent`).
  - Muted Text: Primarily `text-zinc-300` or `text-zinc-400`.
- **Aesthetic Vibe:** High-end, sophisticated, professional, B2B-focused. Do not use generic, unstyled components.

### Specific Element Rules (DO NOT REVERT)
1. **Media Kit Button (Hero Section):** 
   - **RULE:** The "Media Kit" download button has been permanently **REMOVED** from the main Hero section. 
   - **ACTION:** Do NOT add it back under any circumstances. If requested to add a button to the Hero, confirm with the user first that they don't mean the old Media Kit button.
2. **Careers Page Subheading:**
   - The text *"Tyler Brand is a business. We do not accept mediocrity."* has been specifically sized down by 15% for visual balance to prevent overpowering the layout. Do not increase its font size.
3. **Corporate Footer:**
   - A highly specific, elegant B2B corporate footer is implemented at the bottom of the Main page, Careers view, and Policy page.
   - **Styling details:** It uses `justify-between` to spread items evenly across the width. It does NOT use pipe (`|`) separators. The corporate registration info color identically matches the copyright text color (`text-zinc-600`).
   - A link to the `Privacy & AI Policy` (`/policy`) is specifically placed next to the copyright text.
4. **Original Series Text (Tylerbolkkayo):**
   - The description for the "Tylerbolkkayo Main Series" must strictly read: "세상을 보는 새로운 관점" (Korean) and "A new perspective on the world" (English). 
   - **HISTORY:** A previous bug accidentally pasted recruitment text here. Ensure this remains unchanged.

## 4. Analytics & Tracking
- **Google Analytics 4 (GA4):** Configured directly in `src/app/layout.tsx` using the `next/script` component. The Measurement ID is `G-1ZNJ56WQHL`. Do not override this or add duplicate tracking codes.

## 5. New Features: Privacy & AI Policy Page (`/policy`)
- Formatted as a standalone sub-page with a chic, sophisticated bilingual layout.
- Uses animated toggles (Framer Motion) for KR/EN.
- Retains the exact corporate tone requested by the user, adhering to Korean PIPA (Personal Information Protection Act) and AI transparency guidelines.

## 6. How to Handle User Requests
- **Be surgical:** Always use specific surgical line-editing tools if possible. Do not replace entire files unless necessary.
- **Maintain tone:** Keep the UI feeling like a premium branding agency.
- **Always push:** Once work is confirmed working, provide the user with the git commands (`git add .`, `git commit -m "..."`, `git push`) to securely deploy via Vercel.

---
**End of Knowledge Base.**
