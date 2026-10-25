import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PressRelease, pressReleases as staticPressReleases } from "../data/pressData";
import { getPressReleases } from "../lib/sanity";
import BioMatrix from "./BioMatrix";
import DataCheatSheet from "./DataCheatSheet";
import AssetVault from "./AssetVault";

interface PressViewProps {
  lang: "KR" | "EN";
}

function getSnippet(release: PressRelease): string {
  if (release.intro5W1H) return release.intro5W1H;
  const first = release.body?.[0];
  if (!first) return "";
  if (typeof first === "string") return first;
  if (first._type === "textBlock") return first.text;
  if ("caption" in first && first.caption) return first.caption;
  return "";
}

export default function PressView({ lang }: PressViewProps) {
  const [showEPK, setShowEPK] = useState(false);
  const [releases, setReleases] = useState<PressRelease[]>(staticPressReleases);

  useEffect(() => {
    async function loadReleases() {
      try {
        const cmsReleases = await getPressReleases();
        if (cmsReleases && cmsReleases.length > 0) {
          setReleases(cmsReleases);
        }
      } catch (err) {
        console.error("Failed to load press releases from Sanity CMS, using static fallback:", err);
      }
    }
    loadReleases();
  }, []);

  const koReleases = releases.filter((pr) => pr.lang === "ko");
  const enReleases = releases.filter((pr) => pr.lang === "en");

  if (lang === "KR") {
    return (
      <section className="relative min-h-screen py-32 px-8 md:px-20 bg-[#02060C] overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-12">
          <div className="border-b border-white/10 pb-8">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Press & Media</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              보도자료 (Press Releases)
            </h1>
            <p className="text-zinc-500 text-sm mt-3">타일러 미디어의 국내 공식 발표 자료 및 보도 인덱스 피드입니다.</p>
          </div>

          {/* Chronological List */}
          <div className="space-y-8">
            {koReleases.map((release) => (
              <article key={release.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300">
                <time className="text-zinc-600 font-mono text-xs block mb-3" dateTime={release.date}>
                  {release.date}
                </time>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                  <Link href={`/ko/press/${release.slug}`}>{release.title}</Link>
                </h2>

                {release.subtitle && (
                  <p className="text-zinc-400 text-sm mb-4 font-medium leading-relaxed">
                    {release.subtitle}
                  </p>
                )}

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {getSnippet(release)}
                </p>

                <Link
                  href={`/ko/press/${release.slug}`}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  보도자료 전문 읽기 &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // English Version
  return (
    <section className="relative min-h-screen py-32 px-8 md:px-20 bg-[#02060C] overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto space-y-12">
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Press & Media</span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Press Room
            </h1>
            <p className="text-zinc-500 text-sm mt-3">
              Official announcements, business news, and media assets for partners.
            </p>
          </div>
          
          <button
            onClick={() => setShowEPK(!showEPK)}
            className="px-6 py-3 bg-white/5 border border-white/10 text-white hover:border-accent/30 hover:bg-white/10 rounded-full font-bold text-xs tracking-wider transition-all whitespace-nowrap self-start md:self-end shadow-lg flex items-center gap-2 group cursor-pointer"
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
                  Media Kit & Electronic Press Kit (EPK)
                </h2>
                <p className="text-zinc-500 text-xs mt-1">Self-serve copyable bios, digital assets, and key operations data.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <BioMatrix />
                <AssetVault />
              </div>

              <div className="max-w-4xl">
                <DataCheatSheet />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Chronological List */}
        <div className="space-y-8">
          {enReleases.length > 0 ? (
            enReleases.map((release) => (
              <article key={release.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300">
                <time className="text-zinc-600 font-mono text-xs block mb-3" dateTime={release.date}>
                  {release.date}
                </time>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-accent transition-colors leading-snug">
                  <Link href={`/en/press/${release.slug}`}>{release.title}</Link>
                </h2>

                {release.subtitle && (
                  <p className="text-zinc-400 text-sm mb-4 font-medium leading-relaxed">
                    {release.subtitle}
                  </p>
                )}

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {getSnippet(release)}
                </p>

                <Link
                  href={`/en/press/${release.slug}`}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  View Announcement &rarr;
                </Link>
              </article>
            ))
          ) : (
            <div className="text-zinc-600 text-sm font-mono py-12 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.005]">
              No active announcements found in English locale.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
