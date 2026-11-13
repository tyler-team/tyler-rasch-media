"use client";

import React, { useState } from "react";
import { PressRelease } from "@/data/pressData";
import SanityBlockRenderer, { renderFormattedText } from "./SanityBlockRenderer";
import SubpageHeader from "./SubpageHeader";
import CorporateFooter from "./CorporateFooter";

const CATEGORY_LABELS_EN: Record<string, string> = {
  episode: "1BWS Episode Premiere",
  "1BWS Episode": "1BWS Episode Premiere",
  interview: "Exclusive Interview",
  partnership: "Corporate & Partnership",
  sme: "SME Co-Prosperity Program",
};

export default function EnPressArticleClient({
  release,
  allReleases,
}: {
  release: PressRelease;
  allReleases?: PressRelease[];
}) {
  const [lang, setLang] = useState<"KR" | "EN">("EN");

  const targetKoSlug =
    release.translatedSlug ||
    allReleases?.find(
      (pr) =>
        pr.lang === "ko" &&
        (pr.slug === release.slug ||
          pr.slug === release.slug.replace(/-en$/, "") ||
          pr.translatedSlug === release.slug)
    )?.slug;

  const koSwitchHref = targetKoSlug ? `/ko/press/${targetKoSlug}` : "/ko/press";

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "KR") {
      window.location.href = koSwitchHref;
    }
  };

  const legacyBoilerplateIndex = Array.isArray(release.body)
    ? release.body.findIndex(
        (block: any) => typeof block === "string" && block.trim() === "About Tyler Media"
      )
    : -1;

  const mainBodyBlocks =
    legacyBoilerplateIndex !== -1
      ? release.body.slice(0, legacyBoilerplateIndex)
      : release.body;

  const resolvedBoilerplate =
    release.boilerplate && release.boilerplate.trim().length > 0
      ? release.boilerplate
      : legacyBoilerplateIndex !== -1
      ? release.body.slice(legacyBoilerplateIndex + 1).join("\n\n")
      : null;

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden">
      <SubpageHeader
        lang={lang}
        onLangChange={handleLangToggle}
        krHref={koSwitchHref}
        activeSection="press"
      />

      {/* Main Content Container */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <a href="/en/press" className="min-h-[44px] text-xs font-bold text-zinc-400 hover:text-accent transition-colors inline-flex items-center gap-2 mb-6">
          &larr; Back to Newsroom
        </a>

        {/* Article header */}
        <header className="space-y-6 mb-12 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <time className="text-zinc-500 font-mono text-xs block" dateTime={release.date}>
              Published Date: {release.date}
            </time>
            {release.category && CATEGORY_LABELS_EN[release.category] && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/30 px-2.5 py-0.5 rounded-full">
                {CATEGORY_LABELS_EN[release.category]}
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            {release.title}
          </h1>
          {release.subtitle && (
            <h2 className="text-lg text-zinc-400 font-semibold leading-relaxed">
              - {release.subtitle}
            </h2>
          )}
          {release.highlights && release.highlights.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
                Executive Highlights
              </div>
              <ul className="space-y-2 text-sm text-zinc-200 font-medium leading-relaxed">
                {release.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">•</span>
                    <span>{renderFormattedText(h)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {release.byline && (
            <div className="text-xs text-zinc-500 italic font-mono pt-2">
              {release.byline}
            </div>
          )}
        </header>

        {/* Article content */}
        <article className="space-y-8 text-zinc-300 text-base leading-relaxed">
          {release.heroImage?.asset &&
            !mainBodyBlocks?.some(
              (b: any) =>
                b?._type === "image" &&
                b?.asset?._ref &&
                b?.asset?._ref === release.heroImage?.asset?._ref
            ) && (
              <SanityBlockRenderer block={{ ...release.heroImage, _type: "image" }} />
            )}

          {release.intro5W1H && (
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.01] border-l-2 border-accent p-4 rounded-r-xl">
              {release.intro5W1H}
            </p>
          )}

          <SanityBlockRenderer blocks={mainBodyBlocks} />

          {release.youtubeUrl &&
            !mainBodyBlocks?.some(
              (b: any) => b?._type === "videoEmbed" && b?.url === release.youtubeUrl
            ) && (
              <SanityBlockRenderer
                block={{
                  _type: "videoEmbed",
                  url: release.youtubeUrl,
                  caption: release.youtubeCaption,
                }}
              />
            )}

          {/* Boilerplate Section */}
          {resolvedBoilerplate && (
            <div className="mt-16 p-8 rounded-3xl bg-white/[0.025] border border-white/10 space-y-6 glass">
              <h4 className="text-accent font-black text-xs uppercase tracking-widest">
                [About Tyler Media & Media Contact]
              </h4>
              <div className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line font-sans space-y-2">
                {renderFormattedText(resolvedBoilerplate)}
              </div>
            </div>
          )}
        </article>

        <CorporateFooter lang="EN" className="mt-24" />
      </main>
    </div>
  );
}
