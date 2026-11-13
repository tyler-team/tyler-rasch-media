"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PressRelease, getPressReleases, isEnglishPressRelease } from "../../../lib/sanity";
import BioMatrix from "../../../components/BioMatrix";
import DataCheatSheet from "../../../components/DataCheatSheet";
import AssetVault from "../../../components/AssetVault";
import SubpageHeader from "../../../components/SubpageHeader";
import CorporateFooter from "../../../components/CorporateFooter";

const CATEGORY_LABELS_EN: Record<string, string> = {
  episode: "1BWS Episode Premiere",
  interview: "Exclusive Interview",
  partnership: "Corporate & Partnership",
  sme: "SME Co-Prosperity Program",
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

export default function EnPressPageClient({ initialReleases }: { initialReleases: PressRelease[] }) {
  const [lang, setLang] = useState<"KR" | "EN">("EN");
  const [showEPK, setShowEPK] = useState(false);
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

  const enReleases = releases.filter((pr) => isEnglishPressRelease(pr));

  const handleLangToggle = (targetLang: "KR" | "EN") => {
    setLang(targetLang);
    if (targetLang === "KR") {
      window.location.href = "/ko/press";
    }
  };

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden">
      <SubpageHeader
        lang={lang}
        onLangChange={handleLangToggle}
        krHref="/ko/press"
        activeSection="press"
      />

      {/* Main Content Container */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto space-y-12">
        
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Press &amp; Media</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Press Room
            </h1>
            <p className="text-zinc-400 text-sm mt-3">
              Official announcements, business news, and media assets for partners.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowEPK(!showEPK)}
            className="min-h-[44px] px-6 py-3 bg-white/5 border border-white/10 text-white hover:border-accent/30 hover:bg-white/10 rounded-full font-bold text-xs tracking-wider transition-all whitespace-nowrap self-start md:self-end shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:animate-ping" />
            {showEPK ? "Hide Media Kit / EPK" : "Open Media Kit / EPK"}
          </button>
        </div>

        {/* Conditionally Expanded EPK section */}
        <AnimatePresence>
          {showEPK && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 border-b border-white/10 pb-16 overflow-hidden"
            >
              <div className="border-l-2 border-accent pl-4">
                <h2 className="text-white font-black text-xl md:text-2xl tracking-wider uppercase">
                  Media Kit &amp; Electronic Press Kit (EPK)
                </h2>
                <p className="text-zinc-400 text-xs mt-1">Self-serve copyable bios, digital assets, and key operations data.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="min-w-0 w-full"><BioMatrix /></div>
                <div className="min-w-0 w-full"><AssetVault /></div>
              </div>

              <div className="max-w-4xl min-w-0 w-full">
                <DataCheatSheet />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Chronological List */}
        <div className="space-y-8">
          {enReleases.length > 0 ? (
            enReleases.map((release) => (
              <article key={release.slug} className="p-6 sm:p-8 bg-white/[0.025] border border-white/10 rounded-3xl hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <time className="text-zinc-400 font-mono text-xs block" dateTime={release.date}>
                    {release.date}
                  </time>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/25 px-2.5 py-0.5 rounded-full">
                    {release.category && CATEGORY_LABELS_EN[release.category]
                      ? CATEGORY_LABELS_EN[release.category]
                      : "Official Release"}
                  </span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                  <Link href={`/en/press/${release.slug}`}>{release.title}</Link>
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
                  href={`/en/press/${release.slug}`}
                  className="min-h-[36px] text-xs font-bold text-accent hover:underline inline-flex items-center gap-1.5"
                >
                  View Announcement &rarr;
                </Link>
              </article>
            ))
          ) : (
            <div className="text-zinc-400 text-sm font-mono py-12 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
              No active announcements found in English locale.
            </div>
          )}
        </div>

        <CorporateFooter lang="EN" className="mt-24" />
      </main>
    </div>
  );
}
