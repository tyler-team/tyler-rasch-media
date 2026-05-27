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

export default function SMEStartupprogramPage() {
  // Tabs for Section 7: Required Documents
  const [docTab, setDocTab] = useState<"individual" | "corporate">("individual");
  const [copied, setCopied] = useState(false);

  // States to keep track of checked checklist items for engagement
  const [checkedDocs, setCheckedDocs] = useState<{ [key: string]: boolean }>({});

  const toggleCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
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
    <div className="min-h-screen bg-[#0A192F] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all overflow-x-hidden relative">
      {/* Background visual details */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-1/3 left-[-20%] w-[60%] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-[-20%] w-[60%] h-[600px] bg-accent/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Glassmorphic Sticky Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0A192F]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12">
        <a href="/" className="font-black text-xl tracking-tighter leading-none text-white hover:opacity-80 transition-opacity">
          TYLER <span className="text-accent">MEDIA</span>
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#apply-section"
            onClick={scrollToApply}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent-foreground bg-accent rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)]"
          >
            지원하기
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        
        {/* Section 1: Hero Banner */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 text-center relative py-16 md:py-24 border-b border-white/5">
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
              광고비 부담은 제로, 효과는 압도적.<br />
              이제 <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">타일러의 영향력</span>을 귀사의 성장에 무료로 활용하세요.
            </h1>
            <p className="text-base md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-12 break-keep">
              단 5분이면 지원 끝. 비용 없이 타일러 미디어 콘텐츠의 주인공이 되어보세요. 실질적인 성장을 원하는 대표님들을 위한 가장 쉽고 확실한 광고 기회, 지금 바로 잡으세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              <button
                onClick={scrollToApply}
                className="w-full sm:w-auto px-8 py-4 font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 cursor-pointer"
              >
                지금 바로 지원하기
              </button>
              <a
                href="#philosophy-section"
                className="w-full sm:w-auto px-8 py-4 font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 text-center"
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
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">타일러 미디어 채널 내 고품질 오리지널 콘텐츠에 귀사의 제품을 자연스럽게 녹여 효과적으로 브랜딩해 드립니다.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1"><CheckIcon /></div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">광고 단가 특별 할인</h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">향후 타일러 미디어와 유료 광고 협업 시 장기적인 파트너십을 위해 적용되는 전용 파격 우대 할인 혜택을 제공합니다.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/10 p-2 rounded-lg mt-1"><CheckIcon /></div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">프라이빗 네트워킹 초대</h4>
                    <p className="text-zinc-400 text-sm break-keep leading-relaxed">분기별로 정기 개최되는 타일러 미디어 파트너사, 벤처 캐피탈(VC), 액셀러레이터 등 업계 리더들과의 비공개 교류 모임에 초대합니다.</p>
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
                  &ldquo;한정된 채널 슬롯으로 인해 모든 분을 선정해 드리지 못하더라도 실망하지 마세요. 소중한 시간을 내어 지원해주신 모든 적격 사업체 대표님들께 감사와 응원의 마음을 가득 담아 특별 혜택을 전합니다.&rdquo;
                </p>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon /> 타일러 미디어 광고 서비스 이용 시 전용 비즈니스 할인 혜택 제공
                  </li>
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon /> 불합격 사유 배제, 다음 분기 프로그램 상시 재응모 기회 보장
                  </li>
                  <li className="flex items-center gap-3 text-zinc-400 text-sm">
                    <CheckIcon /> 타일러 미디어 정기 뉴스레터 및 비즈니스 트렌드 요약 리포트 구독
                  </li>
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-xs text-zinc-400 leading-relaxed break-keep">
                💡 저희는 본 프로젝트를 단순 광고 공급이 아닌 장기 투자의 마인드로 검토합니다. 역량을 가득 담아 제출해 주시면 상생의 파트너로 보답하겠습니다.
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Eligibility */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-b border-white/5">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-accent font-mono text-sm tracking-widest uppercase block">Eligibility</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight break-keep">누구와 함께하고 싶나요?</h2>
            <p className="text-zinc-400 text-sm md:text-base">복잡한 지원 자격 대신 투명하고 명확한 기준만을 제시합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Qualifications */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckIcon />
                이런 기업의 지원을 환영합니다 (지원 대상)
              </h3>
              
              <ul className="space-y-6">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">다양한 형태의 중소 비즈니스</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">국내법에 의거한 중소기업, 테크 스타트업, 골목상권의 소상공인, 개인 자영업자까지 모두 지원 가능합니다.</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">상용화된 제품/서비스 보유</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">광고가 송출되는 시점(발표 다음 분기)에 대중이 즉각 구매, 예약, 결제하거나 이용할 수 있는 상태여야 합니다.</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">업종 및 업력 무관</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">로컬 F&B 카페부터 시작하여 최신 바이오 테크, 친환경 인테리어, 반려동물 의약품 개발 등 모든 분야의 비즈니스를 차별 없이 존중합니다.</p>
                </li>
              </ul>
            </div>

            {/* Restrictions */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <XIcon />
                이런 기업은 참여가 어렵습니다 (제외 대상)
              </h3>
              
              <ul className="space-y-6">
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">프랜차이즈 가맹 본부 및 가맹점</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">본 프로그램은 독자적 브랜드를 개척해 나가는 주체적인 소규모 기업을 우선 지원하기 위해 대형 프랜차이즈 브랜드를 배제합니다.</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">대기업 산하 또는 독점적 지배 기업</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">대기업의 투자를 상당 비율 이상 받았거나 대기업 계열사, 혹은 이미 업계에서 압도적인 자금력을 갖춘 상위 기업은 대상에서 제외됩니다.</p>
                </li>
                <li className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h4 className="text-white font-bold text-sm mb-1">비윤리적 또는 투기 목적의 사업체</h4>
                  <p className="text-zinc-400 text-xs md:text-sm break-keep">사행성 게임, 불법 투기 조장 등 타일러 미디어의 브랜드 가치 및 공익 지향성과 맞지 않는 업종은 심사 대상에서 전면 제외됩니다.</p>
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
            <p className="text-zinc-400 text-sm md:text-base">서류는 365일 상시 접수되며, 매 분기별로 일관되게 심사 및 광고가 순환하여 제작됩니다.</p>
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
                    365일 언제나 열려 있습니다. 온라인 지원서를 통해 회사의 스토리와 제품 경쟁력을 담아 자유롭게 제출해 주세요.
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#0A192F] border-2 border-accent flex items-center justify-center font-bold text-accent text-sm shadow-[0_0_10px_rgba(0,229,255,0.3)] z-10 my-4 md:my-0">
                  1
                </div>
                
                <div className="w-full md:w-[45%] bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-zinc-500">
                  ⏱️ 소요 시간: 단 5분<br />
                  💡 팁: 제품이 돋보이는 고화질 이미지나 사용 동영상이 포함될 경우 가산점이 부여됩니다.
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center md:justify-between group">
                <div className="w-full md:w-[45%] md:text-left mb-4 md:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">STAGE 02</div>
                  <h3 className="text-xl font-bold text-white mb-2">분기별 신속 심사</h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    매 분기 마지막 달(3월, 6월, 9월, 12월) 1일부터 15일 사이에 집중 심사를 완료하여 선발 대상 기업을 정식 공지합니다.
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#0A192F] border-2 border-accent/50 flex items-center justify-center font-bold text-accent text-sm z-10 my-4 md:my-0">
                  2
                </div>
                
                <div className="w-full md:w-[45%] bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-zinc-500">
                  🗓️ 심사 기간: 매 분기 말 1일 ~ 15일<br />
                  📞 추가 확인: 필요한 경우 온라인을 통한 15분 내외의 약식 인터뷰를 요청드릴 수 있습니다.
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center md:justify-between group">
                <div className="w-full md:w-[45%] md:text-right mb-4 md:mb-0">
                  <div className="inline-block px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-bold mb-2">STAGE 03</div>
                  <h3 className="text-xl font-bold text-white mb-2">콘텐츠 제작 및 온에어</h3>
                  <p className="text-zinc-400 text-sm break-keep">
                    발표 직후 다가오는 다음 분기 내에 타일러 미디어 제작진이 귀사 제품을 위한 최적의 콘텐츠 PPL 기획을 수행하고 노출을 진행합니다.
                  </p>
                </div>
                
                <div className="w-10 h-10 rounded-full bg-[#0A192F] border-2 border-accent/30 flex items-center justify-center font-bold text-accent text-sm z-10 my-4 md:my-0">
                  3
                </div>
                
                <div className="w-full md:w-[45%] bg-white/[0.01] border border-white/5 rounded-2xl p-4 text-xs text-zinc-500">
                  📢 광고 집행 예시:<br />
                  1~3월 접수건 ➡️ 3월 중순 선발 발표 ➡️ 4~6월 중 콘텐츠 온에어 완료!
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
                타일러 미디어가 이 프로그램을 시작한 건 단순히 &apos;좋은 일&apos;을 하기 위해서가 아닙니다. 우리 타일러미디어에 있는 사람들이 대한민국에서 비즈니스를 직접 일궈가는 창업과 중소기업 운영의 혹독한 경험을 몸소 해본 사람들이고, 그렇기에 여러분이 겪는 외로움과 어려움을 가슴 깊이 공감하고 있기 때문입니다.
              </p>
              
              <div className="border-l-4 border-accent pl-6 py-2 my-8 bg-accent/5 rounded-r-xl">
                <p className="font-bold text-white text-base md:text-lg mb-2">한 번의 실수가 파산으로 직결되는 가혹한 생태계</p>
                <p className="text-sm">
                  많은 이들이 화려한 &apos;스타트업 열풍&apos;을 말하지만, 매일 밤 생존을 걱정해야 하는 창업 현장의 현실은 지극히 차갑습니다. 한국의 창업 생태계는 종종 단 한 번의 실수도 용납하지 않는 가혹한 &apos;오징어 게임&apos;처럼 느껴질 때가 있습니다. 실패가 곧 개인의 신용 파산과 돌이키기 힘든 사회적 낙인으로 이어지는 압박 속에서, 수많은 혁신적인 대표님들이 홀로 밤잠을 설칩니다. 우리 팀 역시 매번 새로운 콘텐츠를 기획하고 사업을 확장할 때마다 &apos;과연 이 길이 생존의 길일까?&apos;라는 절실한 자문을 스스로에게 던집니다.
                </p>
              </div>

              <p>
                특히 <strong>2026년</strong>, AI와 업무 자동화가 가져올 거대한 산업 구조적 변혁은 우리와 같은 작은 기업들에게 큰 기회인 동시에 한편으론 생존을 걸고 정면 돌파해야 할 냉정한 도전이 될 것입니다. 이러한 매크로적인 거대한 거센 파도 속에서 중소기업과 스타트업이 강인하게 살아남는 유일한 방법은, 서로의 따뜻한 손을 맞잡고 성장을 긴밀히 돕는 <strong>&apos;연대&apos;</strong>뿐이라고 우리는 확신합니다.
              </p>
              
              <p>
                우리는 잘 알고 있습니다. 제품의 완성도는 이미 너무나 훌륭한데 대기업 위주의 광고 단가에 밀려 마케팅 예산이 턱없이 부족해서, 혹은 어렵게 마련된 정부 지원 사업의 끝없는 행정 서류 뭉치에 치여 정작 본질적인 제품 혁신과 성장에 집중하지 못하는 그 답답하고 아쉬운 심정을요. 타일러 미디어는 그 무겁고 높은 문턱을 과감히 부수어 낮추고 싶습니다.
              </p>

              <p className="text-white font-medium">
                우리가 제공하는 무료 PPL은 단순히 화면에 광고 한 줄 띄워드리는 가벼운 서비스가 아닙니다. <br />
                <span className="text-accent font-bold">&ldquo;당신은 결코 혼자가 아니며, 당신의 끊임없는 혁신은 반드시 세상에 알려질 응원받을 가치가 있다&rdquo;</span>는 깊은 지지의 메시지입니다.
              </p>
              
              <p>
                우리가 가진 영향력과 탄탄한 채널 인프라를 상생으로 나누어, 실력 있는 중소기업들이 마케팅이라는 높은 장벽에 부딪혀 꺾이지 않도록 든든한 날개가 되겠습니다. 우리의 진심 어린 경험이 귀사의 찬란한 도약에 단단한 밑거름이 되길 소망합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: How to Apply & Checklist */}
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
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${docTab === "individual" ? "bg-accent text-accent-foreground shadow-md" : "text-zinc-400 hover:text-white"}`}
              >
                개인사업자 / 소상공인
              </button>
              <button
                onClick={() => setDocTab("corporate")}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${docTab === "corporate" ? "bg-accent text-accent-foreground shadow-md" : "text-zinc-400 hover:text-white"}`}
              >
                법인사업자 / 스타트업
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <span className="text-white font-bold text-sm md:text-base flex items-center gap-2">
                  <DocumentIcon />
                  제출용 서류 자가 진단 (체크리스트)
                </span>
                <span className="text-zinc-500 text-xs">클릭하여 체크할 수 있습니다</span>
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
              🛡️ 제출해주신 모든 서류 사본은 개인정보보호법에 의거하여 오직 지원 적합성 검증 목적으로만 활용되며, 타일러 미디어의 보안 데이터베이스에 안전하게 분리 보관 후 파기됩니다. (상세 내용은 하단 개인정보처리방침 링크 참조)
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

        {/* Section 8: Footer & Share Action */}
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 break-keep">성장의 기회를 주변에도 널리 알려주세요!</h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto break-keep mb-8">
              &ldquo;본 마케팅 지원 프로그램은 여러분의 자발적 참여와 관심으로 완전해집니다. 본인의 비즈니스뿐만 아니라, 양질의 홍보가 진심으로 절실한 동료 창업자나 아끼는 지인들에게 이 소식을 널리 공유해 주세요. 함께 성장할 때 비로소 더 큰 가능성이 열립니다.&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto relative">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 font-bold text-white border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300 relative cursor-pointer"
              >
                <ShareIcon />
                {copied ? "URL 복사 완료!" : "이 페이지 공유하기"}
              </button>
              
              <a
                href="https://tally.so/r/1AJDvl"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 font-bold text-accent-foreground bg-accent rounded-full hover:scale-105 transition-all duration-300 text-center"
              >
                프로젝트 지원서 접수
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Basic Mini Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#071326] relative z-10 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <div className="flex flex-wrap justify-center gap-6 text-zinc-400 font-medium">
            <a href="/" className="hover:text-white transition-colors">홈으로</a>
            <span>•</span>
            <a href="/policy" className="hover:text-white transition-colors">개인정보 및 AI 처리방침</a>
            <span>•</span>
            <a href="mailto:request@tylerrasch.com" className="hover:text-white transition-colors">이메일 문의</a>
          </div>
          <p>© 2026 Tyler Rasch Media. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
