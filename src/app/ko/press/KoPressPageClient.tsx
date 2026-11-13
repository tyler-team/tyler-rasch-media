"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PressRelease, getPressReleases, isKoreanPressRelease } from "../../../lib/sanity";
import SubpageHeader from "../../../components/SubpageHeader";
import CorporateFooter from "../../../components/CorporateFooter";

const CATEGORY_LABELS_KR: Record<string, string> = {
  episode: "1BWS 에피소드",
  interview: "독점 인터뷰",
  partnership: "기업·파트너십",
  sme: "중소기업·스타트업 상생",
};

const getSnippet = (release: PressRelease) => {
  if (release.intro5W1H) return release.intro5W1H;
  if (release.highlights && release.highlights.length > 0) return release.highlights.join(" · ");
  if (release.subtitle) return release.subtitle;
  const firstText = release.body?.find(
    (b: any) => typeof b === "string" || b?._type === "textBlock"
  );
  if (!firstText) return "";
  if (typeof firstText === "string") return firstText;
  if (firstText._type === "textBlock") return firstText.text;
  return "";
};

export default function KoPressPageClient({ initialReleases }: { initialReleases: PressRelease[] }) {
  const [lang, setLang] = useState<"KR" | "EN">("KR");
  const [releases, setReleases] = useState<PressRelease[]>(initialReleases);

  useEffect(() => {
    let mounted = true;
    getPressReleases()
      .then((fresh) => {
        if (mounted && fresh && fresh.length > 0) {
          setReleases(fresh);
        }
      })
      .catch(console.error);
    return () => {
      mounted = false;
    };
  }, []);

  const koReleases = releases.filter((pr) => isKoreanPressRelease(pr));

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "EN") {
      window.location.href = "/en/press";
    }
  };

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden">
      <SubpageHeader
        lang={lang}
        onLangChange={handleLangToggle}
        enHref="/en/press"
        activeSection="press"
      />

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Press &amp; Media</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              보도자료 (Press Releases)
            </h1>
            <p className="text-zinc-400 text-sm mt-3">타일러 미디어의 국내 공식 발표 자료 및 보도 인덱스 피드입니다.</p>
          </div>
          <a
            href="/assets/docs/TylerRasch_MediaKit_2026_KR.pdf"
            download
            className="min-h-[44px] px-5 py-3 bg-white/5 border border-white/10 text-white hover:border-accent/40 hover:bg-white/10 rounded-full font-bold text-xs tracking-wider transition-all whitespace-nowrap self-start md:self-end inline-flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            2026 미디어 파트너십 소개서 (PDF) &darr;
          </a>
        </div>

        {/* Chronological List */}
        <div className="space-y-8">
          {koReleases.map((release) => (
            <article key={release.slug} className="p-6 sm:p-8 bg-white/[0.025] border border-white/10 rounded-3xl hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <time className="text-zinc-400 font-mono text-xs block" dateTime={release.date}>
                  {release.date}
                </time>
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/25 px-2.5 py-0.5 rounded-full">
                  {release.category && CATEGORY_LABELS_KR[release.category]
                    ? CATEGORY_LABELS_KR[release.category]
                    : "공식 보도자료"}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                <Link href={`/ko/press/${release.slug}`}>{release.title}</Link>
              </h2>

              {release.subtitle && (
                <p className="text-zinc-300 text-sm mb-4 font-medium leading-relaxed">
                  {release.subtitle}
                </p>
              )}

              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6">
                {getSnippet(release)}
              </p>

              <Link
                href={`/ko/press/${release.slug}`}
                className="min-h-[36px] text-xs font-bold text-accent hover:underline inline-flex items-center gap-1.5"
              >
                보도자료 전문 읽기 &rarr;
              </Link>
            </article>
          ))}
        </div>

        <CorporateFooter lang="KR" className="mt-24" />
      </main>
    </div>
  );
}
