"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CareersInternshipView from "./CareersInternshipView";
import CorporateFooter from "./CorporateFooter";

export interface CareerRole {
  title: string;
  desc: React.ReactNode;
  action: string;
  details?: {
    responsibilities: { label: string; items: string[] };
    qualifications: { label: string; items: string[] };
    preferred: { label: string; items: string[] };
    workInfo: { label: string; items: { label: string; value: string }[] };
  };
}

export interface CareerContent {
  heading: string;
  subheading: React.ReactNode;
  desc: React.ReactNode;
  values: { title: React.ReactNode; desc: React.ReactNode }[];
  positions: CareerRole[];
}

interface CareersHubViewProps {
  lang?: "KR" | "EN";
  careersData: CareerContent;
  onNavigateHome?: () => void;
  isRecruitmentOpen?: boolean;
}

export default function CareersHubView({
  lang = "KR",
  careersData,
  onNavigateHome,
  isRecruitmentOpen = false,
}: CareersHubViewProps) {
  const [activeTab, setActiveTab] = useState<"roles" | "internship">("roles");
  const [expandedRole, setExpandedRole] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#internship") {
      setActiveTab("internship");
    }
  }, []);

  const toggleRole = (idx: number) => {
    setExpandedRole((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="relative min-h-screen py-20 md:py-28 px-6 md:px-16 lg:px-20 bg-[#02060C] text-zinc-100 overflow-hidden font-sans break-keep">
      <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[420px] h-[420px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Shared Careers Header */}
        <header className="border-b border-white/10 pb-10 mb-12 space-y-6">
          <div>
            <span className="text-accent font-mono text-xs font-bold uppercase tracking-[0.3em] block mb-3">
              {lang === "KR" ? "TYLER MEDIA TALENT & FELLOWSHIP" : "TYLER MEDIA TALENT & FELLOWSHIP"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              {careersData.heading}
            </h1>
            {/* Invariant: keep this subheading intentionally scaled down (~15%) per AI_INSTRUCTIONS.md */}
            <p className="text-base sm:text-lg font-medium text-zinc-300 tracking-tight leading-snug mt-4">
              {careersData.subheading}
            </p>
          </div>

          {/* Dual-Tab Switcher (Shown only when recruitment is open) */}
          {isRecruitmentOpen && (
            <div
              role="tablist"
              aria-label={lang === "KR" ? "채용 트랙 선택" : "Recruitment Tracks"}
              className="inline-flex flex-col sm:flex-row p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 gap-1.5 w-full sm:w-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "roles"}
                onClick={() => setActiveTab("roles")}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "roles"
                    ? "bg-accent text-black shadow-[0_0_20px_rgba(0,229,255,0.28)] font-black"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{lang === "KR" ? "상시 및 정규 포지션" : "Open Positions"}</span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    activeTab === "roles" ? "bg-black/15 text-black" : "bg-white/10 text-zinc-300"
                  }`}
                >
                  {careersData.positions.length}
                </span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "internship"}
                onClick={() => setActiveTab("internship")}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  activeTab === "internship"
                    ? "bg-accent text-black shadow-[0_0_20px_rgba(0,229,255,0.28)] font-black"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span>{lang === "KR" ? "1BWS 국제시사 리서치 인턴십" : "1BWS Research Internship"}</span>
              </button>
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          {!isRecruitmentOpen || activeTab === "roles" ? (
            <motion.div
              key="roles-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-16"
            >
              {/* Manifesto & Core Values */}
              <div className="space-y-10">
                <div className="p-6 sm:p-10 rounded-3xl bg-white/[0.025] border border-white/10 text-zinc-300 text-base md:text-lg leading-relaxed">
                  {isRecruitmentOpen ? (
                    careersData.desc
                  ) : lang === "KR" ? (
                    <>
                      타일러 라쉬(Tyler Rasch)는 단순한 유튜버나 인플루언서 브랜드가 아닙니다. 우리는 타일러의 독보적인 시선(언어, 문화, 시스템)을 바탕으로 세상을 해석하고, 이를 글로벌 미디어 비즈니스로 확장해 나가는 팀입니다.
                      <br /><br />
                      우리는 안정을 쫓는 사람보다 변화와 성장을 갈망하는 ‘빌더(Builder)’의 가치를 믿습니다. 두려움 없이 실험하고, 활발하게 협업하며, 높은 기준(High Standard)으로 시장에 임팩트를 남길 준비가 되신 분들과 향후 새로운 기회에서 다시 만나 뵙기를 기대합니다.
                    </>
                  ) : (
                    <>
                      Tyler Rasch is not just a YouTuber or an influencer brand. On the Tyler Team, we interpret the world through Tyler&apos;s unique perspective (language, culture, systems) and expand upon those insights to develop them into a global media business.
                      <br /><br />
                      We believe in &ldquo;Builders&rdquo;—those who crave change and growth rather than stability, experiment without fear, and hold themselves to the highest standards. While active hiring is paused, we look forward to reconnecting when future opportunities open.
                    </>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {careersData.values.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-3xl bg-white/[0.025] border border-white/10 hover:border-accent/35 transition-colors space-y-3"
                    >
                      <span className="text-xs font-mono font-bold text-accent tracking-widest">
                        0{idx + 1}
                      </span>
                      <h2 className="text-lg font-bold text-white leading-snug">
                        {val.title}
                      </h2>
                      <p className="text-sm text-zinc-400 leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Positions Section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-1.5">
                      {isRecruitmentOpen
                        ? lang === "KR"
                          ? "상시 채용 포지션"
                          : "OPEN ROLES"
                        : lang === "KR"
                        ? "채용 안내"
                        : "RECRUITMENT STATUS"}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                      {isRecruitmentOpen
                        ? lang === "KR"
                          ? "포지션 안내 및 지원"
                          : "Role Specifications & Apply"
                        : lang === "KR"
                        ? "채용 포지션 안내"
                        : "Open Positions"}
                    </h2>
                  </div>
                  <p className="text-xs font-mono text-zinc-400">
                    {isRecruitmentOpen
                      ? lang === "KR"
                        ? "접수처: request@tylerrasch.com (자유 양식 이력서·포트폴리오)"
                        : "Apply to: request@tylerrasch.com (Resume & Portfolio)"
                      : lang === "KR"
                      ? "현재 채용 마감 · 추후 오픈 예정"
                      : "Status: Currently Closed"}
                  </p>
                </div>

                {!isRecruitmentOpen ? (
                  <div className="rounded-3xl bg-white/[0.025] border border-white/10 p-6 sm:p-10 space-y-4">
                    <div className="inline-flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-zinc-400" />
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                        {lang === "KR" ? "채용 마감 · RECRUITMENT PAUSED" : "RECRUITMENT PAUSED"}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                      {lang === "KR"
                        ? "현재 진행 중인 채용 공고가 없습니다."
                        : "No Open Positions at This Time."}
                    </h3>
                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-3xl">
                      {lang === "KR"
                        ? "현재 타일러 미디어의 모든 정규·상시 채용 및 인턴십 모집이 종료되어 신규 지원을 받고 있지 않습니다. 향후 새로운 포지션이 열릴 경우 본 페이지를 통해 가장 먼저 안내해 드리겠습니다."
                        : "All open roles and fellowship cohorts at Tyler Media are currently closed and we are not accepting applications at this time. When new positions open, updated details will be posted right here first."}
                    </p>
                  </div>
                ) : (
                <div className="space-y-5">
                  {careersData.positions.map((pos, idx) => {
                    const isOpen = expandedRole === idx;
                    return (
                      <div
                        key={pos.title}
                        className="rounded-3xl bg-white/[0.025] border border-white/10 hover:border-accent/35 transition-colors overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleRole(idx)}
                          aria-expanded={isOpen}
                          className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-6 cursor-pointer min-h-[72px]"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono font-bold text-accent">
                                0{idx + 1}
                              </span>
                              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 border border-white/10 px-2.5 py-0.5 rounded-full">
                                {lang === "KR" ? "상시 모집" : "Rolling Intake"}
                              </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                              {pos.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed max-w-3xl">
                              {pos.desc}
                            </p>
                          </div>

                          <span
                            aria-hidden="true"
                            className={`shrink-0 w-11 h-11 rounded-full border flex items-center justify-center text-lg font-bold transition-colors ${
                              isOpen
                                ? "bg-accent text-black border-accent"
                                : "bg-white/5 text-white border-white/15"
                            }`}
                          >
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && pos.details && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden border-t border-white/10"
                            >
                              <div className="p-6 sm:p-8 space-y-8 bg-black/20">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                  <div className="space-y-3">
                                    <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                                      {pos.details.responsibilities.label}
                                    </h4>
                                    <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                                      {pos.details.responsibilities.items.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                          <span className="text-accent mt-1 shrink-0">•</span>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="space-y-6">
                                    <div className="space-y-3">
                                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                                        {pos.details.qualifications.label}
                                      </h4>
                                      <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed">
                                        {pos.details.qualifications.items.map((item, i) => (
                                          <li key={i} className="flex items-start gap-2.5">
                                            <span className="text-accent font-bold shrink-0">✓</span>
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="space-y-3">
                                      <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                                        {pos.details.preferred.label}
                                      </h4>
                                      <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                                        {pos.details.preferred.items.map((item, i) => (
                                          <li key={i} className="flex items-start gap-2.5">
                                            <span className="text-zinc-500 shrink-0">★</span>
                                            <span>{item}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>

                                {/* Work Info + Direct Apply Action Bar */}
                                <div className="pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                    {pos.details.workInfo.items.map((info, i) => (
                                      <div
                                        key={i}
                                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1"
                                      >
                                        <div className="text-[11px] font-mono font-bold text-accent uppercase tracking-wider">
                                          {info.label}
                                        </div>
                                        <div className="text-xs text-zinc-300 leading-relaxed">
                                          {info.value}
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
                                    <a
                                      href={`mailto:request@tylerrasch.com?subject=${encodeURIComponent(`[Careers Application] ${pos.title}`)}`}
                                      className="min-h-[44px] inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-accent text-black font-black text-xs tracking-widest uppercase hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                                    >
                                      <span>{pos.action}</span>
                                      <span>&rarr;</span>
                                    </a>
                                    <span className="text-[11px] font-mono text-zinc-500 text-center lg:text-right">
                                      request@tylerrasch.com
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="internship-tab"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <CareersInternshipView
                lang={lang}
                onNavigateHome={onNavigateHome}
                embedded
              />
            </motion.div>
          )}
        </AnimatePresence>

        <CorporateFooter lang={lang} className="mt-24" />
      </div>
    </section>
  );
}
