"use client";

import React from "react";
import { motion } from "framer-motion";
import { pressReleases } from "../data/pressData";
import BioMatrix from "./BioMatrix";
import DataCheatSheet from "./DataCheatSheet";
import AssetVault from "./AssetVault";

interface PressViewProps {
  lang: "KR" | "EN";
}

export default function PressView({ lang }: PressViewProps) {
  const koReleases = pressReleases.filter((pr) => pr.lang === "ko");
  const enReleases = pressReleases.filter((pr) => pr.lang === "en");

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
                  <a href={`/ko/press/${release.slug}`}>{release.title}</a>
                </h2>

                {release.subtitle && (
                  <p className="text-zinc-400 text-sm mb-4 font-medium leading-relaxed">
                    {release.subtitle}
                  </p>
                )}

                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {release.intro5W1H}
                </p>

                <a
                  href={`/ko/press/${release.slug}`}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  보도자료 전문 읽기 &rarr;
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // English Version (EPK)
  return (
    <section className="relative min-h-screen py-32 px-8 md:px-20 bg-[#02060C] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto space-y-24">
        {/* Title Banner */}
        <div className="border-b border-white/10 pb-8 max-w-4xl">
          <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-2">Newsroom & EPK</span>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            English Press Room & EPK
          </h1>
          <p className="text-zinc-500 text-sm mt-3">
            Self-serve assets, operational logistics, and official announcements for journalists and partners.
          </p>
        </div>

        {/* 1. THE EVERGREEN MASTER LAYER (Pinned to Top) */}
        <section className="space-y-12">
          <div className="border-l-2 border-accent pl-4">
            <h2 className="text-white font-black text-xl md:text-2xl tracking-wider uppercase">
              Evergreen Master Layer
            </h2>
            <p className="text-zinc-500 text-xs">Self-serve operational kits and copyable brand bios.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <BioMatrix />
            <AssetVault />
          </div>

          <div className="max-w-6xl">
            <DataCheatSheet />
          </div>
        </section>

        {/* 2. CHRONOLOGICAL RELEASE FEED */}
        <section className="space-y-12 pt-12 border-t border-white/10">
          <div className="border-l-2 border-accent/40 pl-4">
            <h2 className="text-white font-black text-xl md:text-2xl tracking-wider uppercase">
              Corporate Announcements
            </h2>
            <p className="text-zinc-500 text-xs">Official chronological announcements index feed.</p>
          </div>

          {enReleases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {enReleases.map((release) => (
                <article key={release.slug} className="p-8 bg-white/[0.01] border border-white/5 rounded-3xl hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <time className="text-zinc-600 font-mono text-xs block mb-3" dateTime={release.date}>
                      {release.date}
                    </time>
                    <h3 className="text-lg font-bold text-white mb-4 leading-snug hover:text-accent transition-colors">
                      <a href={`/en/press/${release.slug}`}>{release.title}</a>
                    </h3>
                    <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3 mb-6">
                      {release.body[0]}
                    </p>
                  </div>
                  <a
                    href={`/en/press/${release.slug}`}
                    className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                  >
                    View Announcement &rarr;
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-zinc-600 text-sm font-mono py-12 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.005]">
              No active announcements found in English locale.
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
