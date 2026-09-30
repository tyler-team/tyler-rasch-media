'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CareersInternshipViewProps {
  lang?: 'KR' | 'EN';
  onNavigateHome?: () => void;
}

export default function CareersInternshipView({ lang = 'KR', onNavigateHome }: CareersInternshipViewProps) {
  useEffect(() => {
    // Dynamically load Tally widget script if not already present
    const scriptUrl = 'https://tally.so/widgets/embed.js';
    if (typeof (window as any).Tally !== 'undefined') {
      try {
        (window as any).Tally.loadEmbeds();
      } catch (err) {
        console.error('Failed to load Tally embeds:', err);
      }
    } else if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.onload = () => {
        if (typeof (window as any).Tally !== 'undefined') {
          (window as any).Tally.loadEmbeds();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const scrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const applyElement = document.getElementById('apply');
    if (applyElement) {
      applyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="relative min-h-screen py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#0a0c10] text-zinc-100 overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-24 md:space-y-32">
        {/* ========================================================
            1. HERO SECTION
           ======================================================== */}
        <header className="space-y-8 pt-4 md:pt-8">
          {/* Top Label Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent shadow-[0_0_20px_rgba(0,229,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-white tracking-wide uppercase">
              2026 하반기 인턴십 모집
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] break-keep">
            타일러 미디어와 함께할 <br className="hidden sm:inline" />
            기업 협업 &amp; PR 인턴을 모십니다
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed break-keep font-light">
            글로벌 지식 채널 원빅월드쇼(1BWS)와 라이프스타일 채널 리얼리 타일러(Really Tyler)를 제작하는 타일러 미디어에서 비즈니스 파트너십과 PR 실무를 함께 만들어갈 인재를 찾습니다.
          </p>

          {/* 3 Key Summary Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#161616] border border-white/10 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Schedule
              </div>
              <div className="text-base font-bold text-white mb-1 break-keep">
                주 3일 · 일 3시간 집중 근무
              </div>
              <div className="text-xs text-zinc-400 font-mono">
                오전 09:00 ~ 12:00
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#161616] border border-white/10 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Flexibility
              </div>
              <div className="text-base font-bold text-white mb-1 break-keep">
                학업·취업 준비 병행 최적화
              </div>
              <div className="text-xs text-zinc-400">
                주 3일 오전 집중 근무
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#161616] border border-white/10 hover:border-accent/50 transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Certification
              </div>
              <div className="text-base font-bold text-white mb-1 break-keep">
                실무 경험 &amp; 공식 수료증 발급
              </div>
              <div className="text-xs text-zinc-400">
                타일러 미디어 공식 인증 &amp; 추천서
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="pt-2">
            <a
              href="#apply"
              onClick={scrollToApply}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-accent/20"
            >
              <span>지원서 작성하기</span>
              <span>&darr;</span>
            </a>
          </div>
        </header>

        {/* ========================================================
            2. SECTION 1: 모집 개요 및 근무 조건
           ======================================================== */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Section 01
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              모집 개요 및 근무 조건
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Overview &amp; Work Conditions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 모집 인원 */}
            <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
              <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                모집 인원
              </div>
              <div className="text-xl font-bold text-white">2명</div>
              <p className="text-xs text-zinc-400 break-keep">
                채용 즉시 실무에 투입되어 팀과 긴밀하게 협업합니다.
              </p>
            </div>

            {/* 지원 대상 */}
            <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
              <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                지원 대상
              </div>
              <div className="text-xl font-bold text-white break-keep">
                4년제 대학교 휴학생, 졸업예정자, 또는 기졸업자
              </div>
              <p className="text-xs text-zinc-400 break-keep">
                학업이나 취업 준비와 병행 가능한 오전 집중 근무입니다.
              </p>
            </div>

            {/* 근무 기간 */}
            <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
              <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                근무 기간
              </div>
              <div className="text-xl font-bold text-white break-keep">
                2026년 10월 26일(월) ~ 12월 11일(금) (총 7주)
              </div>
            </div>

            {/* 근무 형태 */}
            <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
              <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                근무 형태
              </div>
              <div className="text-xl font-bold text-white break-keep">
                주 3일 / 오전 09:00 ~ 12:00
              </div>
              <p className="text-xs text-zinc-400">
                하루 3시간 / 주 9시간
              </p>
            </div>

            {/* 근무 장소 */}
            <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
              <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                근무 장소
              </div>
              <div className="text-xl font-bold text-white break-keep">
                온·오프라인 (영등포구) 병행
              </div>
            </div>

            {/* 급여 조건 */}
            <div className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
              <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                급여 조건
              </div>
              <div className="text-xl font-bold text-white">
                시급 11,000원 <span className="text-sm font-normal text-zinc-400">(산재보험 적용)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. SECTION 2: 담당 업무 (What You Will Do)
           ======================================================== */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Section 02
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              담당 업무 (What You Will Do)
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              타일러 미디어의 핵심 비즈니스 파트너십과 대외 PR을 주도적으로 경험합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Task 01 */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white/20 font-mono">01</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/10 text-accent border border-accent/30">
                  Partnership
                </span>
              </div>
              <h3 className="text-xl font-bold text-white break-keep">
                국내외 기업 및 광고주 협업 제안
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>타일러 미디어와 협업할 만한 국내외 기업, 브랜드, 대형 광고대행사 발굴 및 리스트업</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>파트너십 안내서(미디어킷) 전달 및 비즈니스 협업 제안 이메일 발송</span>
                </li>
              </ul>
            </div>

            {/* Task 02 */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white/20 font-mono">02</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/10 text-accent border border-accent/30">
                  Press &amp; PR
                </span>
              </div>
              <h3 className="text-xl font-bold text-white break-keep">
                PR 및 보도자료 배포
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>신규 프로젝트 및 채널 주요 소식 보도자료 작성</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>주요 언론사(방송·신문·IT·경제지) 기자 연락처 최신화 및 보도자료 배포</span>
                </li>
              </ul>
            </div>

            {/* Task 03 */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white/20 font-mono">03</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/10 text-accent border border-accent/30">
                  Editorial
                </span>
              </div>
              <h3 className="text-xl font-bold text-white break-keep">
                공식 웹사이트 블로그 운영
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>tylerrasch.com 공식 웹사이트 자체 블로그 콘텐츠 기획 및 글 작성</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>에피소드 인사이트, 글로벌 트렌드 분석 아티클 에디토리얼 지원</span>
                </li>
              </ul>
            </div>

            {/* Task 04 */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black text-white/20 font-mono">04</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/10 text-accent border border-accent/30">
                  Operations
                </span>
              </div>
              <h3 className="text-xl font-bold text-white break-keep">
                비즈니스 파트너십 및 미디어 오퍼레이션 운영 지원
              </h3>
              <ul className="space-y-2 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>제안 미팅 일정 조율 및 기본 대외 커뮤니케이션 지원</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>주요 유튜브 채널들의 브랜드 협찬 및 광고 트렌드 모니터링</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">•</span>
                  <span>프로젝트 진행 및 팀 운영에 필요한 전반적인 미디어 오퍼레이션 지원</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. SECTION 3: 지원 자격 (Qualifications)
           ======================================================== */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Section 03
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              지원 자격
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Qualifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 지원 자격 */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  지원 자격
                </div>
                <h3 className="text-xl font-bold text-white mb-6">Must Have</h3>
                <ul className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">✓</span>
                    <span>기본적인 비즈니스 이메일 작성과 꼼꼼한 정보 검색이 가능하신 분</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">✓</span>
                    <span>사람들과 소통하는 것을 좋아하고 예의 바른 커뮤니케이션 태도를 갖추신 분</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">✓</span>
                    <span>주 3일 오전 근무(09:00~12:00)에 집중할 수 있는 분</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 우대 사항 */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  우대 사항
                </div>
                <h3 className="text-xl font-bold text-white mb-6">Preferred</h3>
                <ul className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">★</span>
                    <span>영문 이메일 작성이나 해외 기업 리서치가 가능하신 분 <strong className="text-white font-semibold">(영어 능통자)</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">★</span>
                    <span>슬랙(Slack), 노션(Notion), 구글 문서 활용이 익숙하신 분</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold shrink-0">★</span>
                    <span>미디어, 광고, 홍보, 비즈니스 협업에 관심이 많으신 분</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. SECTION 4: 선발 일정
           ======================================================== */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Section 04
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              선발 일정
            </h2>
            <p className="text-sm text-zinc-400 mt-1">Recruitment Timeline</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#161616] border-t-2 border-t-accent border-x border-b border-white/10 space-y-2 relative">
              <div className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                STEP 01
              </div>
              <div className="text-base font-bold text-white">서류 접수</div>
              <div className="text-sm font-semibold text-zinc-200">
                10월 2일(금) ~<br />10월 15일(목) 자정
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug break-keep pt-1">
                * 서류 접수 순 순차 검토 및 면접 진행 (적격자 채용 시 조기 마감 가능)
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#161616] border-t-2 border-t-accent border-x border-b border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                STEP 02
              </div>
              <div className="text-base font-bold text-white">화상 면접</div>
              <div className="text-sm font-semibold text-zinc-200">
                10월 12일(월) ~<br />10월 16일(금)
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug break-keep pt-1">
                온라인 구글 미트 20분 내외 진행
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#161616] border-t-2 border-t-accent border-x border-b border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-accent tracking-wider uppercase">
                STEP 03
              </div>
              <div className="text-base font-bold text-white">합격자 발표</div>
              <div className="text-sm font-semibold text-zinc-200">
                10월 16일(금)
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug break-keep pt-1">
                합격자 대상 개별 이메일 및 유선 안내
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[#161616] border-t-2 border-t-[#ffc700] border-x border-b border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-[#ffc700] tracking-wider uppercase">
                STEP 04
              </div>
              <div className="text-base font-bold text-white">사전 실무 교육</div>
              <div className="text-sm font-semibold text-zinc-200">
                10월 19일(월) 주간
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug break-keep pt-1">
                오리엔테이션 및 실무 툴 온보딩 (일정 조율)
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 rounded-2xl bg-[#161616] border-t-2 border-t-[#00be61] border-x border-b border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-[#00be61] tracking-wider uppercase">
                STEP 05
              </div>
              <div className="text-base font-bold text-white">정식 근무 시작</div>
              <div className="text-sm font-semibold text-zinc-200">
                10월 26일(월)
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug break-keep pt-1">
                7주간 집중 근무 시작 (12월 11일까지)
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            6. SECTION 5: 지원서 접수 폼 임베드 섹션 (Apply Now)
           ======================================================== */}
        <section id="apply" className="scroll-mt-24 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Application Form
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tight">
              인턴십 지원하기 <span className="text-zinc-500 text-xl md:text-3xl font-normal">(Apply Now)</span>
            </h2>
            <p className="text-base text-zinc-300 mt-2 font-light">
              아래 지원 폼을 작성해 제출해 주시면 서류 검토 후 순차적으로 연락드립니다.
            </p>
          </div>

          {/* Tally Embed Container */}
          <div className="w-full rounded-3xl overflow-hidden bg-white shadow-2xl border border-white/20 transition-all duration-300">
            <iframe
              data-tally-src="https://tally.so/r/BzMd9K?transparentBackground=1"
              src="https://tally.so/r/BzMd9K?transparentBackground=1"
              loading="lazy"
              width="100%"
              height="750"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="타일러 미디어 인턴십 지원서"
              className="w-full min-h-[700px] md:min-h-[780px]"
            />
          </div>
        </section>

        {/* ========================================================
            7. FOOTER
           ======================================================== */}
        <footer className="pt-12 border-t border-white/10 text-[10px] text-zinc-500 uppercase tracking-widest break-keep">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                <span className="font-bold text-zinc-300">주식회사 큰미르(Knmir Inc.)</span>
                <span className="hidden md:inline text-zinc-700">|</span>
                <span>대표자: RASCH TYLER JOSEF</span>
                <span className="hidden md:inline text-zinc-700">|</span>
                <span>사업자등록번호: 116-81-96227</span>
              </div>
              <div>주소: 서울특별시 영등포구 영중로29길 2, B1</div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span>© 2026 Tyler Rasch Media</span>
                <span className="text-zinc-700">•</span>
                <a href="/careers" className="text-white hover:text-accent transition-colors">Careers (채용)</a>
                <span className="text-zinc-700">•</span>
                <a href="/policy" className="hover:text-white transition-colors">Privacy &amp; AI Policy</a>
              </div>
            </div>
            <a href="mailto:request@tylerrasch.com" className="hover:text-white transition-colors lowercase">
              request@tylerrasch.com
            </a>
          </div>
        </footer>
      </div>
    </article>
  );
}
