"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PressRelease } from "@/data/pressData";
import SanityBlockRenderer, { renderFormattedText } from "./SanityBlockRenderer";

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
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#02060C]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12">
        <a href="/" className="font-black text-xl tracking-tighter leading-none text-white hover:opacity-80 transition-opacity">
          TYLER <span className="text-accent">MEDIA</span>
        </a>
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-full relative w-24">
          <motion.div
            animate={{ x: lang === "EN" ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-accent rounded-full"
          />
          <a
            href={koSwitchHref}
            onClick={(e) => {
              e.preventDefault();
              handleLangToggle("KR");
            }}
            className={`relative z-10 flex-1 py-1 text-xs font-black text-center transition-colors ${lang === "KR" ? "text-black" : "text-zinc-500"}`}
          >
            KR
          </a>
          <button
            onClick={() => handleLangToggle("EN")}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === "EN" ? "text-black" : "text-zinc-500"}`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <a href="/en/press" className="text-xs font-bold text-zinc-500 hover:text-accent transition-colors flex items-center gap-2 mb-8">
          &larr; Back to Newsroom
        </a>

        {/* Article header */}
        <header className="space-y-6 mb-12 pb-8 border-b border-white/10">
          <time className="text-zinc-500 font-mono text-xs block" dateTime={release.date}>
            Published Date: {release.date}
          </time>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
            {release.title}
          </h1>
          {release.subtitle && (
            <h2 className="text-lg text-zinc-400 font-semibold leading-relaxed">
              - {release.subtitle}
            </h2>
          )}
          {release.byline && (
            <div className="text-xs text-zinc-500 italic font-mono pt-2">
              {release.byline}
            </div>
          )}
        </header>

        {/* Article content */}
        <article className="space-y-8 text-zinc-300 text-base leading-relaxed">
          {release.intro5W1H && (
            <p className="font-bold text-white text-lg leading-relaxed bg-white/[0.01] border-l-2 border-accent p-4 rounded-r-xl">
              {release.intro5W1H}
            </p>
          )}

          <SanityBlockRenderer blocks={mainBodyBlocks} />

          {/* Boilerplate Section */}
          {resolvedBoilerplate && (
            <div className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 glass">
              <h4 className="text-accent font-black text-xs uppercase tracking-widest">
                [About Tyler Media & Media Contact]
              </h4>
              <div className="text-zinc-400 text-xs leading-relaxed whitespace-pre-line font-sans space-y-2">
                {renderFormattedText(resolvedBoilerplate)}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
