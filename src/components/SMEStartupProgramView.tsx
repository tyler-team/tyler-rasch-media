"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CorporateFooter from "./CorporateFooter";

const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l4.636-2.318m0 4.152l-4.636-2.318M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface SMEStartupProgramViewProps {
  setSelectedVideo?: (url: string | null) => void;
  lang?: "KR" | "EN";
}

export default function SMEStartupProgramView({
  setSelectedVideo,
  lang = "KR",
}: SMEStartupProgramViewProps) {
  const [docTab, setDocTab] = useState<"individual" | "corporate">("individual");
  const [copied, setCopied] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const isKR = lang === "KR";

  const toggleCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + "/sme-startup-program");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const individualDocs = isKR
    ? [
        { id: "ind-1", text: "회사 및 광고하고 싶은 아이템 소개 정보 (소개 자료)" },
        { id: "ind-2", text: "사업자등록증 사본" },
        { id: "ind-3", text: "신분증 사본" },
      ]
    : [
        { id: "ind-1", text: "Company & product/service introduction deck or brief" },
        { id: "ind-2", text: "Copy of Business Registration Certificate" },
        { id: "ind-3", text: "Copy of Representative Government ID" },
      ];

  const corporateDocs = isKR
    ? [
        { id: "corp-1", text: "회사 및 광고하고 싶은 아이템 소개 정보 (소개 자료)" },
        { id: "corp-2", text: "사업자등록증 사본" },
        { id: "corp-3", text: "법인 등기부등본 사본 (최근 90일 이내 발급)" },
        { id: "corp-4", text: "법인 인감증명서 사본 (최근 90일 이내 발급)" },
        { id: "corp-5", text: "주주명부 사본 (최근 90일 이내 발급)" },
        { id: "corp-6", text: "중소기업 확인서 (최근 1년 이내 발급)" },
      ]
    : [
        { id: "corp-1", text: "Company & product/service introduction deck or brief" },
        { id: "corp-2", text: "Copy of Business Registration Certificate" },
        { id: "corp-3", text: "Certified Corporate Registry Extract (issued within 90 days)" },
        { id: "corp-4", text: "Corporate Seal Certificate (issued within 90 days)" },
        { id: "corp-5", text: "Shareholder Register Copy (issued within 90 days)" },
        { id: "corp-6", text: "SME Confirmation Certificate (issued within 1 year)" },
      ];

  const scrollToApply = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("apply-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden relative">
      {/* Subtle Background Accent Glows */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 left-[-20%] w-[60%] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[-20%] w-[60%] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="relative z-10 py-12 md:py-20">
        {/* Section 1: Hero Banner */}
        <section className="min-h-[75vh] flex flex-col justify-center items-center px-6 md:px-12 text-center relative py-12 border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.03),transparent_60%)] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center w-full"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-bold tracking-widest uppercase mb-8">
              SME &amp; Startup Support Program
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight break-keep mb-8">
              {isKR ? (
                <>
                  타일러 미디어가 귀사의 성장을 응원하며,
                  <br className="hidden md:inline" />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                    &apos;무료 PPL&apos;의 기회
                  </span>
                  를 드립니다.
                </>
              ) : (
                <>
                  Tyler Media champions your growth with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                    Zero-Cost PPL Opportunities
                  </span>
                  .
                </>
              )}
            </h1>

            <p className="text-base md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 break-keep">
              {isKR
                ? "단 5분이면 지원 끝. 비용 없이 타일러 미디어 콘텐츠의 주인공이 되어보세요. 실질적인 성장을 원하는 대표님들을 위한 가장 쉽고 확실한 광고 기회, 지금 바로 잡으세요."
                : "Apply in 5 minutes. Feature your brand inside Tyler Media's flagship content at zero production cost — built for independent founders seeking real, measurable reach."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <button
                onClick={scrollToApply}
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 cursor-pointer text-xs tracking-widest uppercase"
              >
                {isKR ? "지금 바로 지원하기" : "Apply Now"}
              </button>
              <a
                href="#philosophy-section"
                className="w-full sm:w-auto px-8 py-4 min-h-[48px] inline-flex items-center justify-center font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 text-center text-xs tracking-widest uppercase"
              >
                {isKR ? "프로젝트 취지 더보기" : "Read Our Philosophy"}
              </a>
            </div>

            <div className="w-full max-w-3xl mt-16 aspect-video rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_50px_rgba(0,0,0,0.8)] relative bg-black">
              <motion.button
                type="button"
                aria-label={isKR ? "프로그램 소개 영상 재생" : "Play program introduction video"}
                onClick={() => setSelectedVideo && setSelectedVideo("https://www.youtube.com/watch?v=UMwyIpVEGSY")}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full h-full relative cursor-pointer block text-left"
              >
                <Image
                  src="https://img.youtube.com/vi/UMwyIpVEGSY/maxresdefault.jpg"
                  alt="SME Support Program Intro Video"
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(0,229,255,0.7)] transition-all duration-300">
                    <svg className="w-7 h-7 md:w-8 md:h-8 fill-current ml-1" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#02060C] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-8">
                  <span className="text-white font-bold text-xs md:text-sm tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
                    {isKR ? "소개 영상 보기 (PLAY VIDEO)" : "Play Introduction Video"}
                  </span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Why We Are Doing This */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
          >
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent font-mono text-sm tracking-widest uppercase block">Why We Do This</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep leading-tight">
                {isKR ? "우리는 왜 이 프로그램을 시작했을까요?" : "Why Did We Launch This Program?"}
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>

            <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed break-keep">
                {isKR
                  ? "“대한민국 경제의 99%는 작은 사업체이지만, 마케팅 시장은 대행사부터 제작사까지 대기업 중심으로 흘러갑니다. 타일러 미디어는 실질적인 광고 기회를 제공하여 중소기업과 스타트업이 자생력을 갖출 수 있는 생태계를 만들고자 합니다. 저희 또한 이 과정을 통해 다양한 파트너사를 만나고 함께 성장하며, 더 나은 광고 콘텐츠를 제작할 수 있는 역량을 키워나가려 합니다. 우리와 함께 상생해 보세요.”"
                  : "“Small and mid-sized businesses make up 99% of South Korea’s economy, yet the marketing ecosystem—from agencies to production houses—still revolves around conglomerates. Tyler Media wants to expand tangible media access so independent SMEs and startups can thrive on their own terms. Through these collaborations, we also discover remarkable founders and sharpen our craft together. Let’s build mutual growth.”"}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Benefits */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">
              {isKR ? "지원하는 모든 분께 드리는 특별한 혜택" : "Benefits for Selected & Eligible Partners"}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              {isKR
                ? "어떠한 리스크도 없습니다. 선정 여부와 관계없이 모두에게 든든한 성장 파트너가 되어 드립니다."
                : "Zero downside. Whether selected for free PPL or applying as an eligible independent business, every partner receives tangible support."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Finalist Perks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-10 relative hover:border-accent/30 transition-all duration-300 shadow-lg group"
            >
              <div className="absolute top-6 right-8 text-accent/10 group-hover:text-accent/20 font-black text-6xl select-none transition-colors duration-300">
                01
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 pr-14">
                <span className="w-2.5 h-2.5 bg-accent rounded-full shrink-0" />
                {isKR ? "최종 선정 기업 혜택" : "Selected Partner Benefits"}
              </h3>

              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">
                      {isKR ? "무료 PPL 제작 및 노출" : "Zero-Cost PPL Production & Integration"}
                    </h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">
                      {isKR
                        ? "타일러 미디어 채널 내 콘텐츠에 귀사의 제품을 자연스럽게 녹여 광고해 드립니다."
                        : "Authentic, narrative-led product integration produced and published across Tyler Media’s channels at zero cost."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">
                      {isKR ? "광고 단가 할인" : "Preferential Paid Campaign Rates"}
                    </h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">
                      {isKR
                        ? "향후 타일러 미디어와 유료 광고 협업 시 적용되는 전용 할인 혜택을 드립니다."
                        : "Dedicated partner discounts on future paid branded content and cross-platform collaborations."}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1">
                    <CheckIcon />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">
                      {isKR ? "네트워킹 참여" : "Quarterly Partner Networking"}
                    </h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">
                      {isKR
                        ? "분기별로 개최되는 타일러 미디어 파트너사 네트워킹 모임에 초대합니다."
                        : "Invitations to Tyler Media’s quarterly founder and partner networking roundtables."}
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Applicant Perks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-10 relative hover:border-accent/30 transition-all duration-300 shadow-lg group flex flex-col justify-between"
            >
              <div>
                <div className="absolute top-6 right-8 text-accent/10 group-hover:text-accent/20 font-black text-6xl select-none transition-colors duration-300">
                  02
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3 pr-14">
                  <span className="w-2.5 h-2.5 bg-accent/40 rounded-full shrink-0" />
                  {isKR ? "모든 지원 기업 혜택" : "Universal Applicant Benefits"}
                </h3>

                <p className="text-zinc-300 text-base md:text-lg break-keep leading-relaxed mb-6">
                  {isKR
                    ? "“선정되지 않더라도 실망하지 마세요! 지원해주신 모든 적격 사업체는 저희 광고 서비스 이용 시 일부 할인 혜택을 제공드립니다. 그리고 다음 분기 때 응모를 언제든지 다시 하셔도 됩니다!”"
                    : "“Even if your company is not selected this quarter, every eligible applicant receives discounted access to our advertising services—and you are always welcome to reapply next quarter.”"}
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon />{" "}
                    {isKR
                      ? "타일러 미디어 광고 서비스 이용 시 할인 혜택 적용"
                      : "Partner discount applied toward Tyler Media campaign bookings"}
                  </li>
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon />{" "}
                    {isKR
                      ? "불합격 사유 관계없이 다음 분기 재응모 언제나 환영"
                      : "Open re-application every quarter with no penalty"}
                  </li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs text-zinc-400 leading-relaxed break-keep">
                {isKR
                  ? "💡 본 프로그램은 상호 성장과 협업을 목표로 하며, 중소기업을 위해 파격적인 가격 혜택도 보완해 드립니다."
                  : "Note: Designed for mutual growth, this program pairs zero-cost PPL slots with meaningful fee reductions for qualifying SMEs."}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Eligibility */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Eligibility</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">
              {isKR ? "누구와 함께하고 싶나요?" : "Who Is Eligible?"}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              {isKR
                ? "브랜드 상생과 진정성을 위해 정립한 자격 요건입니다."
                : "Clear criteria designed to prioritize independent builders and authentic products."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckIcon />
                {isKR ? "지원 대상" : "Eligible Businesses"}
              </h3>

              <ul className="space-y-6">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">
                    {isKR ? "중소기업, 스타트업, 소상공인, 자영업자" : "SMEs, Startups, Small Businesses & Sole Proprietors"}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">
                    {isKR
                      ? "비즈니스 형태에 제한이 없으며 개인 자영업 대표님도 부담 없이 지원하실 수 있습니다."
                      : "All independent legal structures are welcome—from early-stage startups to solo business owners."}
                  </p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">
                    {isKR ? "실제 구매 가능한 제품/서비스 상태" : "Market-Ready Product or Service"}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">
                    {isKR
                      ? "광고가 온에어되는 시점에 고객이 실제로 구매하거나 이용할 수 있는 상태여야 합니다. (현재 판매 중이거나, 광고 시점까지 출시 완료 예정인 경우만 가능)"
                      : "Your product or service must be live and purchasable (or scheduled for confirmed public launch) by the time the episode airs."}
                  </p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">
                    {isKR ? "전 업종 환영" : "All Industries Welcome"}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">
                    {isKR
                      ? "로컬 카페부터 기술 스타트업, 바이오 및 반려동물 용품까지 모든 필드의 혁신 아이템을 존중합니다."
                      : "From neighborhood cafes and consumer brands to deep-tech, biotech, and pet care—every category is invited."}
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <XIcon />
                {isKR ? "지원 불가 대상" : "Exclusions"}
              </h3>

              <ul className="space-y-6">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">
                    {isKR ? "프랜차이즈 가맹 본부 및 소유 매장" : "Franchise Headquarters & Franchised Stores"}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">
                    {isKR
                      ? "고유 브랜드 개발에 역량을 집중하는 소규모 독립 사업체를 우선적으로 발굴하기 위해 프랜차이즈는 대상에서 제외됩니다."
                      : "Franchise chains and franchisee outlets are excluded so slots stay dedicated to independent original brands."}
                  </p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">
                    {isKR ? "대기업 자회사 및 대규모 지분 보유사" : "Conglomerate Subsidiaries & Majority-Backed Affiliates"}
                  </h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">
                    {isKR
                      ? "대기업 계열사나 대기업의 투자를 상당 수준 이상 받아 재원 확보가 충분한 사업체는 본 프로그램의 공평성을 위해 지원 대상에서 배제됩니다."
                      : "Subsidiaries of major conglomerates or companies backed by substantial institutional capital from large enterprises are excluded for fairness."}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Timeline Schedule */}
        <section className="py-20 md:py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">
              {isKR ? "프로그램 운영 및 심사 일정" : "Operating & Review Schedule"}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              {isKR
                ? "365일 상시 접수로 운영되며 분기마다 집중 심사를 거쳐 광고가 제작 송출됩니다."
                : "Applications remain open 365 days a year, with quarterly review cycles leading directly into production and air dates."}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 z-0" />

            <div className="space-y-12 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col lg:flex-row items-center lg:justify-between group">
                <div className="w-full lg:w-[45%] lg:text-right mb-4 lg:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">
                    STAGE 01
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isKR ? "상시 접수" : "Rolling Applications"}
                  </h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    {isKR
                      ? "365일 언제든 지원서를 제출하실 수 있습니다. 온라인 폼으로 쉽고 간편하게 아이디어를 접수해 주세요."
                      : "Submit your application any day of the year via our streamlined online intake form."}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#02060C] border-2 border-accent flex items-center justify-center font-bold text-accent text-sm shadow-[0_0_10px_rgba(0,229,255,0.3)] z-10 my-4 lg:my-0 shrink-0">
                  1
                </div>

                <div className="w-full lg:w-[45%] bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-xs text-zinc-400 leading-relaxed">
                  {isKR ? (
                    <>
                      지원 소요 시간: 약 5분 내외
                      <br />
                      팁: 핵심 경쟁력과 타일러 채널 톤에 어울릴 수 있는 제안 위주로 편안하게 설명해 주세요.
                    </>
                  ) : (
                    <>
                      Completion Time: ~5 minutes
                      <br />
                      Tip: Highlight your core product differentiation and how it fits our audience’s curiosity.
                    </>
                  )}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-between group">
                <div className="w-full lg:w-[45%] lg:text-left mb-4 lg:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">
                    STAGE 02
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isKR ? "분기별 심사 및 발표" : "Quarterly Review & Notification"}
                  </h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    {isKR
                      ? "매 분기 첫 달(4, 7, 10, 1월) 1일~15일 사이 꼼꼼한 심사가 진행됩니다."
                      : "Every quarter during the 1st–15th of Jan, Apr, Jul, and Oct, our editorial & business team conducts a full review."}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#02060C] border-2 border-accent/50 flex items-center justify-center font-bold text-accent text-sm z-10 my-4 lg:my-0 shrink-0">
                  2
                </div>

                <div className="w-full lg:w-[45%] bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-xs text-zinc-400 leading-relaxed">
                  {isKR ? (
                    <>
                      심사 기간: 매 분기 첫 2주간
                      <br />
                      결과 안내: 선정된 기업에는 이메일과 전화로 상세 협약 사항을 정식 전달해 드립니다.
                    </>
                  ) : (
                    <>
                      Review Window: First two weeks of each quarter
                      <br />
                      Notification: Selected brands are contacted directly via email and phone with agreement details.
                    </>
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col lg:flex-row items-center lg:justify-between group">
                <div className="w-full lg:w-[45%] lg:text-right mb-4 lg:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">
                    STAGE 03
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {isKR ? "광고 집행" : "Production & Campaign Airing"}
                  </h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    {isKR
                      ? "심사 완료 후 돌아오는 다음 분기 내 콘텐츠 기획, 촬영 제작 및 공식 노출(온에어)이 매끄럽게 진행됩니다."
                      : "Creative planning, filming, editing, and official broadcast integration are executed seamlessly within the quarter."}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#02060C] border-2 border-accent/30 flex items-center justify-center font-bold text-accent text-sm z-10 my-4 lg:my-0 shrink-0">
                  3
                </div>

                <div className="w-full lg:w-[45%] bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-xs text-zinc-400 leading-relaxed">
                  {isKR ? (
                    <>
                      예시 타임라인:
                      <br />
                      1분기(1~3월) 접수건 → 2분기(4~6월) 중 심사 및 광고 진행
                    </>
                  ) : (
                    <>
                      Example Cycle:
                      <br />
                      Q1 Applications (Jan–Mar) → Q2 Review, Production &amp; Integration (Apr–Jun)
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Our Philosophy */}
        <section id="philosophy-section" className="py-20 md:py-24 bg-white/[0.01] border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-accent font-mono text-sm tracking-widest uppercase block">Our Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep leading-tight">
                {isKR ? (
                  <>
                    &ldquo;우리가 이 일을 하는 이유:
                    <br className="hidden md:inline" /> 당신의 고군분투는 우리의 이야기이기도 합니다&rdquo;
                  </>
                ) : (
                  <>
                    &ldquo;Why We Do This:
                    <br className="hidden md:inline" /> Your Struggle Is Our Story Too&rdquo;
                  </>
                )}
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="prose prose-invert max-w-none text-zinc-400 text-sm md:text-base leading-relaxed space-y-6 break-keep">
              <p>
                {isKR
                  ? "타일러 미디어가 이 프로그램을 시작한 건 단순히 '좋은 일'을 하기 위해서가 아닙니다. 우리 타일러미디어에 있는 사람들이 대한민국에서 비즈니스를 일궈가는 창업과 중소기업 운영의 경험이 있는 사람들이고 여러분이 겪는 어려움을 너무나 공감하고 있기 때문입니다."
                  : "Tyler Media didn’t start this initiative simply to look charitable. Everyone on our team has firsthand experience building and operating small businesses in South Korea—we know the exact pressures you face every single day."}
              </p>

              <div className="border-l-4 border-accent/60 pl-6 py-2 my-8 bg-white/[0.01] rounded-r-xl">
                <p className="font-bold text-white text-base md:text-lg mb-2">
                  {isKR ? "실패의 대가가 지나치게 높은 창업 생태계" : "An Ecosystem Where Failure Carries Too High a Price"}
                </p>
                <p className="text-sm text-zinc-400">
                  {isKR
                    ? "많은 이들이 '스타트업 열풍'을 말하지만, 현장의 현실은 차갑습니다. 한국의 창업 생태계는 종종 한 번의 실수도 용납하지 않는 '오징어 게임'처럼 느껴질 때가 있습니다. 실패가 곧 개인의 파산과 사회적 낙인으로 이어지는 구조 속에서, 수많은 창업자가 밤잠을 설칩니다. 우리 팀 역시 새로운 콘텐츠를 만들고 사업을 확장할 때마다 '과연 이 길이 맞을까?', '우리가 살아남을 수 있을까?'라는 질문을 스스로에게 던집니다."
                    : "Behind the headlines about Korea’s startup boom, reality on the ground can feel unforgiving—where a single misstep risks personal ruin. As our own team launches new formats and expands our studio, we ask ourselves the exact same questions every founder does: Is this the right bet? Will we survive it?"}
                </p>
              </div>

              <p>
                {isKR
                  ? "특히 2026년, AI와 자동화가 가져올 거대한 산업 구조의 변화는 우리 같은 작은 기업들에게 기회인 동시에 생존을 건 도전이 될 것입니다. 이런 매크로적인 위기 상황에서 중소기업과 스타트업이 살아남는 유일한 방법은 서로의 성장을 돕는 '연대'뿐이라고 우리는 믿습니다."
                  : "In 2026, rapid structural shifts driven by AI and automation present both a generational opening and an existential test for independent businesses. Through macro disruption, we believe solidarity—helping serious builders reach customers—is how independent companies endure."}
              </p>

              <p>
                {isKR
                  ? "우리는 알고 있습니다. 제품은 훌륭한데 마케팅 예산이 없어서, 혹은 정부 지원 사업의 끝없는 서류 뭉치에 치여 정작 본질적인 성장에 집중하지 못하는 그 답답함을요. 타일러 미디어는 그 문턱을 낮추고 싶습니다."
                  : "We know how frustrating it is to have an exceptional product held back by limited marketing budgets or buried under bureaucratic grant paperwork. Tyler Media exists to lower that barrier."}
              </p>

              <p className="text-white font-medium">
                {isKR ? (
                  <>
                    우리가 제공하는 무료 PPL은 단순히 광고 한 줄이 아닙니다. <br className="hidden md:inline" />
                    <span className="text-accent font-bold">
                      &apos;당신은 혼자가 아니며, 당신의 혁신은 응원받을 가치가 있다&apos;
                    </span>
                    는 메시지입니다.
                  </>
                ) : (
                  <>
                    Our zero-cost PPL is more than an ad slot—it is a signal:{" "}
                    <span className="text-accent font-bold">
                      &ldquo;You are not alone, and real craftsmanship deserves to be seen.&rdquo;
                    </span>
                  </>
                )}
              </p>

              <p>
                {isKR
                  ? "우리가 가진 채널과 영향력을 나누어, 실력 있는 기업들이 마케팅이라는 벽에 부딪혀 꺾이지 않도록 든든한 액셀러레이팅 파트너가 되겠습니다. 우리의 경험이 당신의 성장에 밑거름이 되길 진심으로 바랍니다."
                  : "By sharing our channels and audience trust, we want to act as an accelerating media partner so capable teams never stall at the marketing wall."}
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: How to Apply & Required Documents */}
        <section id="apply-section" className="py-20 md:py-24 px-6 md:px-12 max-w-4xl mx-auto border-b border-white/5">
          <div className="text-center space-y-4 mb-16">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Apply Now</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {isKR ? "지금 바로 신청하세요!" : "Prepare & Apply Now"}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base">
              {isKR
                ? "아래 구비 서류 체크리스트를 확인하신 뒤, 온라인 지원서를 작성해 주세요."
                : "Review the required documents checklist below, then complete the online application form."}
            </p>
          </div>

          {/* Interactive Document Checklist Tab Selector */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl mb-12">
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl mb-8 w-full max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setDocTab("individual")}
                className={`flex-1 py-3 min-h-[44px] text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  docTab === "individual"
                    ? "bg-accent text-accent-foreground shadow-md font-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isKR ? "개인사업자" : "Sole Proprietors"}
              </button>
              <button
                type="button"
                onClick={() => setDocTab("corporate")}
                className={`flex-1 py-3 min-h-[44px] text-sm font-bold rounded-lg transition-all cursor-pointer ${
                  docTab === "corporate"
                    ? "bg-accent text-accent-foreground shadow-md font-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {isKR ? "법인사업자" : "Corporations"}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                <span className="text-white font-bold text-sm md:text-base flex items-center gap-2">
                  <DocumentIcon />
                  {isKR ? "자가 진단 필수 제출 서류 체크리스트" : "Required Documents Checklist"}
                </span>
                <span className="text-zinc-400 text-xs">
                  {isKR ? "클릭하여 준비 여부를 진단해 보세요" : "Click items to verify readiness"}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${docTab}-${lang}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {(docTab === "individual" ? individualDocs : corporateDocs).map((doc) => {
                    const isChecked = !!checkedDocs[doc.id];
                    return (
                      <button
                        type="button"
                        key={doc.id}
                        onClick={() => toggleCheck(doc.id)}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? "bg-accent/5 border-accent/40 text-white"
                            : "bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all shrink-0 ${
                            isChecked ? "bg-accent border-accent text-accent-foreground" : "border-white/20"
                          }`}
                        >
                          {isChecked && <CheckIcon />}
                        </div>
                        <span className="text-sm md:text-base">{doc.text}</span>
                      </button>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-zinc-400 leading-relaxed break-keep">
              {isKR
                ? "💡 준비된 서류들은 PDF, JPG, PNG 파일 포맷으로 온라인 폼 신청서 내에 첨부해 주시면 됩니다."
                : "Note: Prepared files can be attached directly inside the online application form in PDF, JPG, or PNG format."}
            </div>
          </div>

          {/* Form Application Callout Button */}
          <div className="text-center">
            <a
              href="https://tally.so/r/1AJDvl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base md:text-lg font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] cursor-pointer break-keep text-center"
            >
              {isKR
                ? "중소기업 및 스타트업 홍보 지원 프로그램 지원서 작성하기"
                : "Open SME & Startup Support Application"}
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Section 8: Social Sharing & Secondary Action */}
        <section className="py-20 md:py-24 px-6 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 break-keep">
              {isKR ? "성장의 기회를 주변에도 알려주세요." : "Share This Opportunity With Fellow Founders."}
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto break-keep mb-8">
              {isKR
                ? "“이 프로그램은 여러분의 참여로 완성됩니다. 본인의 기업뿐만 아니라, 홍보가 간절히 필요한 동료 창업자나 지인들에게 이 소식을 공유해 주세요. 함께 성장할 때 더 큰 미래가 열립니다.”"
                : "“This program thrives on founder-to-founder momentum. Share it with entrepreneurs and small teams building great products who deserve a wider stage.”"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto relative">
              <button
                type="button"
                onClick={handleShare}
                className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-6 py-4 font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 relative cursor-pointer text-xs tracking-widest uppercase"
              >
                <ShareIcon />
                {copied
                  ? isKR
                    ? "링크 복사 완료!"
                    : "Link Copied!"
                  : isKR
                  ? "프로그램 공유하기"
                  : "Share Program"}
              </button>

              <a
                href="https://tally.so/r/1AJDvl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center px-6 py-4 font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 transition-all duration-300 text-center text-xs tracking-widest uppercase"
              >
                {isKR ? "지금 지원하기" : "Apply Now"}
              </a>
            </div>
          </div>
        </section>

        <CorporateFooter lang={lang} className="px-6 md:px-12 max-w-6xl mx-auto pb-8" />
      </div>
    </div>
  );
}
