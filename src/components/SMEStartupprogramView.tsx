"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVGs for high-end icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l4.636-2.318m0 4.152l-4.636-2.318M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function SMEStartupprogramView() {
  // Tabs for Section 7: Required Documents
  const [docTab, setDocTab] = useState<"individual" | "corporate">("individual");
  const [copied, setCopied] = useState(false);

  // States to keep track of checked checklist items
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.origin + "/smestartupprogram");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const individualDocs = [
    { id: "ind-1", text: "회사 및 광고하고 싶은 아이템 소개 정보 (소개 자료)" },
    { id: "ind-2", text: "사업자등록증 사본" },
    { id: "ind-3", text: "신분증 사본" },
  ];

  const corporateDocs = [
    { id: "corp-1", text: "회사 및 광고하고 싶은 아이템 소개 정보 (소개 자료)" },
    { id: "corp-2", text: "사업자등록증 사본" },
    { id: "corp-3", text: "법인 등기부등본 사본 (최근 90일 이내 발급)" },
    { id: "corp-4", text: "법인 인감증명서 사본 (최근 90일 이내 발급)" },
    { id: "corp-5", text: "주주명부 사본 (최근 90일 이내 발급)" },
    { id: "corp-6", text: "중소기업 확인서 (최근 1년 이내 발급)" },
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
      {/* Background visual details */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 left-[-20%] w-[60%] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[-20%] w-[60%] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Content (Nested inside pl-0 md:pl-64 parent layout main wrapper) */}
      <div className="relative z-10 py-16 md:py-24">
        
        {/* Section 1: Hero Banner */}
        <section className="min-h-[75vh] flex flex-col justify-center items-center px-6 text-center relative py-12 border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.03),transparent_60%)] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-accent font-bold tracking-widest uppercase mb-8">
              SME & Startup Support Program
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight break-keep mb-8">
              타일러 미디어가 귀사의 성장을 응원하며,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">&apos;무료 PPL&apos;의 기회</span>를 드립니다.
            </h1>
            <p className="text-base md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 break-keep">
              단 5분이면 지원 끝. 비용 없이 타일러 미디어 콘텐츠의 주인공이 되어보세요. 실질적인 성장을 원하는 대표님들을 위한 가장 쉽고 확실한 광고 기회, 지금 바로 잡으세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <button
                onClick={scrollToApply}
                className="w-full sm:w-auto px-8 py-4 font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 cursor-pointer text-xs tracking-widest uppercase"
              >
                지금 바로 지원하기
              </button>
              <a
                href="#philosophy-section"
                className="w-full sm:w-auto px-8 py-4 font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 text-center text-xs tracking-widest uppercase"
              >
                프로젝트 취지 더보기
              </a>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Why We Are Doing This */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-5 space-y-6">
              <span className="text-accent font-mono text-sm tracking-widest uppercase block">Why We Do This</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep leading-tight">
                우리는 왜 이 프로그램을 시작했을까요?
              </h2>
              <div className="w-12 h-1 bg-accent rounded-full" />
            </div>
            
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-xl pointer-events-none" />
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed break-keep">
                &ldquo;대한민국 경제의 99%는 작은 사업체이지만, 마케팅 시장은 대행사부터 제작사까지 대기업 중심으로 흘러갑니다. 타일러 미디어는 실질적인 광고 기회를 제공하여 중소기업과 스타트업이 자생력을 갖출 수 있는 생태계를 만들고자 합니다. 저희 또한 이 과정을 통해 다양한 파트너사를 만나고 함께 성장하며, 더 나은 광고 콘텐츠를 제작할 수 있는 역량을 키워나가려 합니다. 우리와 함께 상생해 보세요.&rdquo;
              </p>
            </div>
          </motion.div>
        </section>

        {/* Section 3: Perks */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">지원하는 모든 분께 드리는 특별한 혜택</h2>
            <p className="text-zinc-400 text-sm md:text-base">어떠한 리스크도 없습니다. 선정 여부와 관계없이 모두에게 든든한 성장 파트너가 되어 드립니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Finalist Perks */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-10 relative hover:border-accent/30 transition-all duration-300 shadow-lg group"
            >
              <div className="absolute top-6 right-8 text-accent/10 group-hover:text-accent/20 font-black text-6xl select-none transition-colors duration-300">01</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-accent rounded-full" />
                최종 선정 기업 혜택
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1"><CheckIcon /></div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">무료 PPL 제작 및 노출</h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">타일러 미디어 채널 내 콘텐츠에 귀사의 제품을 자연스럽게 녹여 광고해 드립니다.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1"><CheckIcon /></div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">광고 단가 할인</h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">향후 타일러 미디어와 유료 광고 협업 시 적용되는 전용 할인 혜택을 드립니다.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1"><CheckIcon /></div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">네트워킹 참여</h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">분기별로 개최되는 타일러 미디어 파트너사 네트워킹 모임에 초대합니다.</p>
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
                <div className="absolute top-6 right-8 text-accent/10 group-hover:text-accent/20 font-black text-6xl select-none transition-colors duration-300">02</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-accent/40 rounded-full" />
                  모든 지원 기업 혜택
                </h3>
                
                <p className="text-zinc-300 text-base md:text-lg break-keep leading-relaxed mb-6">
                  &ldquo;선정되지 않더라도 실망하지 마세요! 지원해주신 모든 적격 사업체는 저희 광고 서비스 이용 시 일부 할인 혜택을 제공드립니다. 그리고 다음 분기 때 응모를 언제든지 다시 하셔도 됩니다!&rdquo;
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon /> 타일러 미디어 광고 서비스 이용 시 할인 혜택 적용
                  </li>
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon /> 불합격 사유 관계없이 다음 분기 재응모 언제나 환영
                  </li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs text-zinc-400 leading-relaxed break-keep">
                💡 본 프로그램은 상호 성장과 협업을 목표로 하며, 중소기업을 위해 파격적인 가격 혜택도 보완해 드립니다.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Eligibility */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Eligibility</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">누구와 함께하고 싶나요?</h2>
            <p className="text-zinc-400 text-sm md:text-base">브랜드 상생과 진정성을 위해 정립한 자격 요건입니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Qualifications */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckIcon />
                지원 대상
              </h3>
              
              <ul className="space-y-6">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">중소기업, 스타트업, 소상공인, 자영업자</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">비즈니스 형태에 제한이 없으며 개인 자영업 대표님도 부담 없이 지원하실 수 있습니다.</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">실제 구매 가능한 제품/서비스 상태</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">광고가 온에어되는 시점에 고객이 실제로 구매하거나 이용할 수 있는 상태여야 합니다. (현재 판매 중이거나, 광고 시점까지 출시 완료 예정인 경우만 가능)</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">전 업종 환영</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">로컬 카페부터 기술 스타트업, 바이오 및 반려동물 용품까지 모든 필드의 혁신 아이템을 존중합니다.</p>
                </li>
              </ul>
            </div>

            {/* Restrictions */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <XIcon />
                지원 불가 대상
              </h3>
              
              <ul className="space-y-6">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">프랜차이즈 가맹 본부 및 소유 매장</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">고유 브랜드 개발에 역량을 집중하는 소규모 독립 사업체를 우선적으로 발굴하기 위해 프랜차이즈는 대상에서 제외됩니다.</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">대기업 자회사 및 대규모 지분 보유사</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">대기업 계열사나 대기업의 투자를 상당 수준 이상 받아 재원 확보가 충분한 사업체는 본 프로그램의 공평성을 위해 지원 대상에서 배제됩니다.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Timeline Schedule */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Schedule</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">프로그램 운영 및 심사 일정</h2>
            <p className="text-zinc-400 text-sm md:text-base">365일 상시 접수로 운영되며 분기마다 집중 심사를 거쳐 광고가 제작 송출됩니다.</p>
          </div>

          {/* Interactive Timeline Graphic */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connector Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/10 z-0" />
            
            <div className="space-y-12 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center md:justify-between group">
                <div className="w-full md:w-[45%] md:text-right mb-4 md:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">STAGE 01</div>
                  <h3 className="text-xl font-bold text-white mb-2">상시 접수</h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    365일 언제든 지원서를 제출하실 수 있습니다. 온라인 폼으로 쉽고 간편하게 아이디어를 접수해 주세요.
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#02060C] border-2 border-accent flex items-center justify-center font-bold text-accent text-sm shadow-[0_0_10px_rgba(0,229,255,0.3)] z-10 my-4 md:my-0">
                  1
                </div>
                
                <div className="w-full md:w-[45%] bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-zinc-500">
                  ⏱️ 지원 소요 시간: 약 5분 내외<br />
                  💡 팁: 핵심 경쟁력과 타일러 채널 톤에 어울릴 수 있는 제안 위주로 편안하게 설명해 주세요.
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:justify-between group">
                <div className="w-full md:w-[45%] md:text-left mb-4 md:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">STAGE 02</div>
                  <h3 className="text-xl font-bold text-white mb-2">분기별 심사 및 발표</h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    매 분기 마지막 달(3, 6, 9, 12월) 1일~15일 사이 꼼꼼한 심사 및 최종 대상 발표가 순차 진행됩니다.
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#02060C] border-2 border-accent/50 flex items-center justify-center font-bold text-accent text-sm z-10 my-4 md:my-0">
                  2
                </div>
                
                <div className="w-full md:w-[45%] bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-zinc-500">
                  🗓️ 심사 기간: 매 분기 첫 2주간<br />
                  💡 결과 안내: 선정된 기업에는 이메일과 전화로 상세 협약 사항을 정식 전달해 드립니다.
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center md:justify-between group">
                <div className="w-full md:w-[45%] md:text-right mb-4 md:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">STAGE 03</div>
                  <h3 className="text-xl font-bold text-white mb-2">광고 집행</h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    심사 완료 후 돌아오는 다음 분기 내 콘텐츠 기획, 촬영 제작 및 공식 노출(온에어)이 매끄럽게 진행됩니다.
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#02060C] border-2 border-accent/30 flex items-center justify-center font-bold text-accent text-sm z-10 my-4 md:my-0">
                  3
                </div>
                
                <div className="w-full md:w-[45%] bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-zinc-500">
                  🗓️ 예시 타임라인:<br />
                  1~3월 접수건 ➡️ 3월 발표 ➡️ 4~6월 중 광고 기획 제작 및 노출 진행!
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Section 6: Our Philosophy */}
        <section id="philosophy-section" className="py-24 bg-white/[0.01] border-b border-white/5">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <span className="text-accent font-mono text-sm tracking-widest uppercase block">Our Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep leading-tight">
                &ldquo;우리가 이 일을 하는 이유:<br />당신의 고군분투는 우리의 이야기이기도 합니다&rdquo;
              </h2>
              <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
            </div>

            <div className="prose prose-invert max-w-none text-zinc-400 text-sm md:text-base leading-relaxed space-y-6 break-keep">
              <p>
                타일러 미디어가 이 프로그램을 시작한 건 단순히 &apos;좋은 일&apos;을 하기 위해서가 아닙니다. 우리 타일러미디어에 있는 사람들이 대한민국에서 비즈니스를 일궈가는 창업과 중소기업 운영의 경험이 있는 사람들이고 여러분이 겪는 어려움을 너무나 공감하고 있기 때문입니다.
              </p>
              
              <div className="border-l-4 border-accent/60 pl-6 py-2 my-8 bg-white/[0.01] rounded-r-xl">
                <p className="font-bold text-white text-base md:text-lg mb-2">실패의 대가가 지나치게 높은 창업 생태계</p>
                <p className="text-sm">
                  많은 이들이 &apos;스타트업 열풍&apos;을 말하지만, 현장의 현실은 차갑습니다. 한국의 창업 생태계는 종종 한 번의 실수도 용납하지 않는 &apos;오징어 게임&apos;처럼 느껴질 때가 있습니다. 실패가 곧 개인의 파산과 사회적 낙인으로 이어지는 구조 속에서, 수많은 창업자가 밤잠을 설칩니다. 우리 팀 역시 새로운 콘텐츠를 만들고 사업을 확장할 때마다 &apos;과연 이 길이 맞을까?&apos;, &apos;우리가 살아남을 수 있을까?&apos;라는 질문을 스스로에게 던집니다.
                </p>
              </div>

              <p>
                특히 2026년, AI와 자동화가 가져올 거대한 산업 구조의 변화는 우리 같은 작은 기업들에게 기회인 동시에 생존을 건 도전이 될 것입니다. 이런 매크로적인 위기 상황에서 중소기업과 스타트업이 살아남는 유일한 방법은 서로의 성장을 돕는 &apos;연대&apos;뿐이라고 우리는 믿습니다.
              </p>
              
              <p>
                우리는 알고 있습니다. 제품은 훌륭한데 마케팅 예산이 없어서, 혹은 정부 지원 사업의 끝없는 서류 뭉치에 치여 정작 본질적인 성장에 집중하지 못하는 그 답답함을요. 타일러 미디어는 그 문턱을 낮추고 싶습니다.
              </p>

              <p className="text-white font-medium">
                우리가 제공하는 무료 PPL은 단순히 광고 한 줄이 아닙니다. <br />
                <span className="text-accent font-bold">&apos;당신은 혼자가 아니며, 당신의 혁신은 응원받을 가치가 있다&apos;</span>는 메시지입니다.
              </p>
              
              <p>
                우리가 가진 채널과 영향력을 나누어, 실력 있는 기업들이 마케팅이라는 벽에 부딪혀 꺾이지 않도록 든든한 액셀러레이팅 파트너가 되겠습니다. 우리의 경험이 당신의 성장에 밑거름이 되길 진심으로 바랍니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: How to Apply & Required Documents */}
        <section id="apply-section" className="py-24 px-6 md:px-12 max-w-4xl mx-auto border-b border-white/5">
          <div className="text-center space-y-4 mb-16">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Apply Now</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">지금 바로 신청하세요!</h2>
            <p className="text-zinc-400 text-sm md:text-base">아래 구비 서류 체크리스트를 확인하신 뒤, 온라인 지원서를 작성해 주세요.</p>
          </div>

          {/* Interactive Document Checklist Tab Selector */}
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm shadow-xl mb-12">
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl mb-8 w-full max-w-md mx-auto">
              <button
                onClick={() => setDocTab("individual")}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${docTab === "individual" ? "bg-accent text-accent-foreground shadow-md font-black" : "text-zinc-400 hover:text-white"}`}
              >
                개인사업자
              </button>
              <button
                onClick={() => setDocTab("corporate")}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${docTab === "corporate" ? "bg-accent text-accent-foreground shadow-md font-black" : "text-zinc-400 hover:text-white"}`}
              >
                법인사업자
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <span className="text-white font-bold text-sm md:text-base flex items-center gap-2">
                  <DocumentIcon />
                  자가 진단 필수 제출 서류 checklist
                </span>
                <span className="text-zinc-500 text-xs">클릭하여 준비 여부를 진단해 보세요</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={docTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  {(docTab === "individual" ? individualDocs : corporateDocs).map((doc) => {
                    const isChecked = !!checkedDocs[doc.id];
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleCheck(doc.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                          isChecked
                            ? "bg-accent/5 border-accent/40 text-white"
                            : "bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                            isChecked ? "bg-accent border-accent text-accent-foreground" : "border-white/20"
                          }`}
                        >
                          {isChecked && <CheckIcon />}
                        </div>
                        <span className="text-sm md:text-base">{doc.text}</span>
                      </div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 text-xs text-zinc-500 leading-relaxed break-keep">
              💡 준비된 서류들은 PDF, JPG, PNG 파일 포맷으로 온라인 폼 신청서 내에 첨부해 주시면 됩니다.
            </div>
          </div>

          {/* Form Application Callout Button */}
          <div className="text-center">
            <a
              href="https://tally.so/r/1AJDvl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-5 text-base md:text-lg font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_35px_rgba(0,229,255,0.5)] cursor-pointer"
            >
              중소기업 및 스타트업 홍보 지원 프로그램 지원서 작성하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Section 8: Social Sharing & Secondary Action */}
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 break-keep">성장의 기회를 주변에도 알려주세요.</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto break-keep mb-8">
              &ldquo;이 프로그램은 여러분의 참여로 완성됩니다. 본인의 기업뿐만 아니라, 홍보가 간절히 필요한 동료 창업자나 지인들에게 이 소식을 공유해 주세요. 함께 성장할 때 더 큰 미래가 열립니다.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto relative">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 relative cursor-pointer text-xs tracking-widest"
              >
                <ShareIcon />
                {copied ? "링크 복사 완료!" : "프로그램 공유하기"}
              </button>
              
              <a
                href="https://tally.so/r/1AJDvl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 transition-all duration-300 text-center text-xs tracking-widest"
              >
                지금 지원하기
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
