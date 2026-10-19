'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CareersInternshipViewProps {
  lang?: 'KR' | 'EN';
  onNavigateHome?: () => void;
}

const content = {
  KR: {
    hero: {
      badge: '2026 하반기 인턴십 모집',
      titleLine1: '원빅월드쇼(1BWS)와 함께할',
      titleLine2: '국제시사 리서치팀 인턴을 모십니다',
      subtitle:
        '글로벌 시사·경제 지식 채널 원빅월드쇼(1BWS)를 제작하는 타일러 미디어에서 글로벌 시사 이슈를 심도 있게 탐구하고, 1차 사료와 데이터를 바탕으로 차별화된 미디어 콘텐츠를 함께 만들어갈 국제시사 리서치팀 인턴을 모집합니다.',
      chips: [
        {
          tag: 'Schedule',
          title: '주 3일 · 일 3시간 집중 근무',
          sub: '화·수·금 09:00 ~ 12:00 (조율 가능)',
        },
        {
          tag: 'Flexibility',
          title: '학업·취업 준비 병행 최적화',
          sub: '온·오프라인 하이브리드 근무',
        },
        {
          tag: 'Certification & Perks',
          title: '공식 수료증 & 추천서 발급',
          sub: '공개 녹화 참관 및 멘토링',
        },
      ],
      applyBtn: '지원서 작성하기',
    },
    sec1: {
      tag: 'Section 01',
      title: '모집 개요 및 근무 조건',
      sub: 'Overview & Work Conditions',
      cards: [
        {
          label: '모집 인원',
          value: '2명',
          desc: '채용 즉시 실무에 투입되어 팀과 긴밀하게 협업합니다.',
        },
        {
          label: '지원 대상',
          value: '4년제 대학교 재학생, 휴학생, 졸업예정자 또는 기졸업자',
          desc: '학문적 열정과 국제시사 분야에 대한 높은 관심 필수 (학업 병행 가능)',
        },
        {
          label: '근무 기간',
          value: '2026년 11월 2일(월) ~ 12월 11일(금) (총 6주)',
        },
        {
          label: '근무 형태',
          value: '주 3일 / 하루 3시간 (주 9시간)',
          desc: '화·수·금 기본(조율 가능) / 09:00~12:00 기준(유연 조율)',
        },
        {
          label: '근무 장소',
          value: '온·오프라인 병행 (하이브리드)',
          desc: '서울 영등포구 당산역 인근 오피스 근무 및 원격 근무',
        },
        {
          label: '급여 조건',
          value: '시급 11,000원',
          note: '(산재보험 적용)',
          desc: '월 예상 실지급액: 약 40만~44만원 (주 9시간 × 시급 11,000원 = 주 99,000원 / 근무일수 비례 정산)',
        },
      ],
    },
    sec2: {
      tag: 'Section 02',
      title: '담당 업무 (Roles & Responsibility)',
      sub: '정부 공식 사이트, 학술 논문, 싱크탱크 데이터를 기반으로 원빅월드쇼 콘텐츠를 기획·구체화합니다.',
      tasks: [
        {
          no: '01',
          tag: 'Research & Intelligence',
          title: '글로벌 시사 이슈 모니터링 & 1차 사료 수집',
          bullets: [
            '정부 기관 웹사이트, 글로벌 싱크탱크, 학술 저널, 공식 통계 데이터 트래킹 및 핵심 정보 수집',
            '외신 보도 및 주요 글로벌 이슈 팩트체크와 공신력 있는 1차 사료 발굴',
          ],
        },
        {
          no: '02',
          tag: 'Knowledge Archiving',
          title: '지식 데이터베이스 구축',
          bullets: [
            'Google Drive 및 Gemini Notebooks 등 최신 AI·협업 툴을 활용한 이슈별 학술·사료 아카이빙',
            '원빅월드쇼 콘텐츠 제작을 위한 영구 자산형 글로벌 시사 지식 DB 체계화',
          ],
        },
        {
          no: '03',
          tag: 'Content Proposal',
          title: '원빅월드쇼 콘텐츠 기획안(Proposal) 작성',
          bullets: [
            '수집된 심층 리서치 자료를 바탕으로 Talking Heads, 팟캐스트, 숏콘텐츠, 블로그 등 다양한 포맷의 기획안 작성',
            '복잡한 글로벌 시사·경제 아젠다를 대중이 이해하기 쉬운 미디어 스토리텔링으로 재가공',
          ],
        },
        {
          no: '04',
          tag: 'Production & Event',
          title: '오프라인 공개 녹화 이벤트 준비 지원',
          bullets: [
            '인턴십 후반부 진행 예정인 원빅월드쇼 오프라인 무대 공개 녹화 세션 준비 및 기획 지원',
            '공개 녹화 세션용 리서치 브리프 작성 및 현장 미디어 오퍼레이션 협업',
          ],
        },
      ],
    },
    sec3: {
      tag: 'Section 03',
      title: '지원 자격',
      sub: 'Qualifications',
      mustHave: {
        tag: '지원 자격',
        title: 'Must Have',
        bullets: [
          '국제시사 및 글로벌 이슈에 대한 깊은 관심과 학문적 열정을 갖추신 분',
          '1차 사료, 정부 공식 발표, 학술 논문, 통계 자료를 활용한 리서치에 거부감이 없으신 분',
          '정확한 출처 표기(Citation) 및 신뢰할 수 있는 리서치 방법론에 대한 이해가 있으신 분',
        ],
      },
      preferred: {
        tag: '우대 사항',
        title: 'Preferred',
        bullets: [
          {
            text: '국제정치학, 외교학, 정치학, 지역학, 역사학, 지리학, 경제학 등 관련 전공자 ',
            highlight: '(전공 우대)',
          },
          {
            text: '다국어(영어 및 기타 외국어) 원서 및 사료 독해가 가능하신 분 ',
            highlight: '(어학 능력 우대)',
          },
          {
            text: 'Slack, Notion, Google Workspace, Gemini 등 디지털 협업 툴 활용이 익숙하신 분',
          },
        ],
      },
    },
    sec4: {
      tag: 'Section 04',
      title: '선발 일정',
      sub: 'Recruitment Timeline',
      steps: [
        {
          step: 'STEP 01',
          title: '서류 접수',
          date: ['10월 19일(월) ~', '10월 25일(일) 23:59'],
          desc: '* 자유 양식 이력서 및 간단한 사전 리서치 과제 제출',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 02',
          title: '화상 면접',
          date: ['10월 26일(월) ~', '10월 28일(수)'],
          desc: '서류 합격자 대상 온라인 구글 미트 면접 순차 진행',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 03',
          title: '최종 합격 발표',
          date: ['10월 30일(금)'],
          desc: '합격자 대상 개별 이메일 및 유선 안내',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 04',
          title: '근무 시작 & 온보딩',
          date: ['11월 2일(월) 주간'],
          desc: '오리엔테이션, 리서치 SOP 및 시스템 온보딩 세팅',
          borderClass: 'border-t-[#ffc700]',
          textClass: 'text-[#ffc700]',
        },
        {
          step: 'STEP 05',
          title: '정식 근무 & 프로젝트',
          date: ['11월 2일(월) ~', '12월 11일(금)'],
          desc: '총 6주간 집중 리서치, DB화 및 공개 녹화 참관',
          borderClass: 'border-t-[#00be61]',
          textClass: 'text-[#00be61]',
        },
      ],
    },
    sec5: {
      tag: 'Application Form',
      title: '인턴십 지원하기',
      titleEn: '(Apply Now)',
      subtitle: '아래 지원 폼을 작성해 제출해 주시면 서류 검토 후 순차적으로 연락드립니다. (자유 양식 이력서 및 간단한 사전 과제 포함)',
      iframeTitle: '원빅월드쇼 국제시사 리서치팀 인턴십 지원서',
    },
    footer: {
      company: '주식회사 큰미르(Knmir Inc.)',
      rep: '대표자: RASCH TYLER JOSEF',
      bizNo: '사업자등록번호: 116-81-96227',
      address: '주소: 서울특별시 영등포구 영중로29길 2, B1',
      careers: 'Careers (채용)',
    },
  },
  EN: {
    hero: {
      badge: 'Fall 2026 Internship Recruitment',
      titleLine1: 'Join One Big World Show as a',
      titleLine2: 'Global Affairs Research Intern',
      subtitle:
        'Tyler Media, the creator of global affairs and knowledge channel One Big World Show (1BWS), is recruiting student interns for the Global Affairs Research Team to explore critical international agendas and develop data-driven media content.',
      chips: [
        {
          tag: 'Schedule',
          title: '3 Days / 3 Hours per Day',
          sub: 'Tue·Wed·Fri 09:00 ~ 12:00 (Flexible)',
        },
        {
          tag: 'Flexibility',
          title: 'Optimized for Studies & Job Prep',
          sub: 'Hybrid Onsite & Remote',
        },
        {
          tag: 'Certification & Perks',
          title: 'Official Certificate & Reference',
          sub: 'Live Shoot Access & Mentorship',
        },
      ],
      applyBtn: 'Apply Now',
    },
    sec1: {
      tag: 'Section 01',
      title: 'Overview & Work Conditions',
      sub: 'Internship Program Details',
      cards: [
        {
          label: 'Positions Available',
          value: '2 Interns',
          desc: 'Immediately assigned to research projects working closely with the production team.',
        },
        {
          label: 'Eligibility',
          value: 'Undergraduates, students on leave, prospective or recent 4-year university graduates',
          desc: 'Academic curiosity and strong passion for global affairs required (compatible with academic studies).',
        },
        {
          label: 'Employment Period',
          value: 'November 2, 2026 (Mon) ~ December 11, 2026 (Fri) (6 Weeks)',
        },
        {
          label: 'Work Schedule',
          value: '3 Days a Week / 3 Hours per Day (9 Hours/Week)',
          desc: 'Tue·Wed·Fri standard (negotiable) / 09:00 AM ~ 12:00 PM standard (flexible adjustment).',
        },
        {
          label: 'Location',
          value: 'Hybrid Onsite & Remote',
          desc: 'Office near Dangsan Station (Yeongdeungpo-gu, Seoul) & remote collaboration.',
        },
        {
          label: 'Compensation',
          value: 'KRW 11,000 / hour',
          note: '(Industrial accident insurance included)',
          desc: 'Est. KRW 400K~440K/month (9 hrs/wk × KRW 11,000 = KRW 99,000/wk, prorated by working days).',
        },
      ],
    },
    sec2: {
      tag: 'Section 02',
      title: 'Roles & Responsibility',
      sub: 'Source authoritative data from think tanks, government agencies, and academic papers to develop 1BWS media content.',
      tasks: [
        {
          no: '01',
          tag: 'Research & Intelligence',
          title: 'Global Affairs Monitoring & Primary Source Research',
          bullets: [
            'Track government portals, leading think tanks, academic journals, and statistical data to extract core insights',
            'Fact-check international developments and uncover authoritative primary sources',
          ],
        },
        {
          no: '02',
          tag: 'Knowledge Archiving',
          title: 'Knowledge Database Construction & AI Archiving',
          bullets: [
            'Archive topic-specific academic papers and sources using modern tools including Google Drive & Gemini Notebooks',
            'Structure an institutionalized global knowledge base to power long-term 1BWS media productions',
          ],
        },
        {
          no: '03',
          tag: 'Content Proposal',
          title: '1BWS Content Proposal Development',
          bullets: [
            'Develop content proposals across multiple formats (Talking Heads, podcasts, short-form video, editorial blogs)',
            'Translate complex geopolitical & macroeconomic agendas into engaging, accessible media storytelling',
          ],
        },
        {
          no: '04',
          tag: 'Production & Event',
          title: 'Offline Live Recording Event Preparation & Support',
          bullets: [
            'Support planning and preparation for the 1BWS live audience studio recording session scheduled later in the program',
            'Draft research briefs for the live session and collaborate on onsite media operations',
          ],
        },
      ],
    },
    sec3: {
      tag: 'Section 03',
      title: 'Qualifications',
      sub: 'Candidate Requirements',
      mustHave: {
        tag: 'Qualifications',
        title: 'Must Have',
        bullets: [
          'Deep passion, curiosity, and academic enthusiasm for international affairs and global issues',
          'Comfortable conducting research using primary sources, official government releases, academic journals, and statistical data',
          'Clear understanding of rigorous citation standards and credible research methodologies',
        ],
      },
      preferred: {
        tag: 'Preferred',
        title: 'Preferred',
        bullets: [
          {
            text: 'Majors in International Relations, Political Science, Area Studies, History, Geography, Economics, or related fields ',
            highlight: '(Relevant Majors)',
          },
          {
            text: 'Ability to read and synthesize foreign-language primary sources and academic texts (English & other languages) ',
            highlight: '(Language Proficiency)',
          },
          {
            text: 'Hands-on familiarity with modern collaborative tools including Slack, Notion, Google Workspace, and Gemini',
          },
        ],
      },
    },
    sec4: {
      tag: 'Section 04',
      title: 'Recruitment Timeline',
      sub: 'Selection Process & Schedule',
      steps: [
        {
          step: 'STEP 01',
          title: 'Application Submission',
          date: ['Oct 19 (Mon) ~', 'Oct 25 (Sun) 23:59 KST'],
          desc: '* Resume & brief research assignment via application form',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 02',
          title: 'Video Interview',
          date: ['Oct 26 (Mon) ~', 'Oct 28 (Wed)'],
          desc: 'Online Google Meet interview for shortlisted candidates',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 03',
          title: 'Final Results',
          date: ['Oct 30 (Fri)'],
          desc: 'Individual notification via email and phone call',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 04',
          title: 'Commencement & Onboarding',
          date: ['Week of Nov 2 (Mon)'],
          desc: 'Orientation on channel vision, research SOP, and system setups',
          borderClass: 'border-t-[#ffc700]',
          textClass: 'text-[#ffc700]',
        },
        {
          step: 'STEP 05',
          title: 'Internship Program',
          date: ['Nov 2 (Mon) ~', 'Dec 11 (Fri)'],
          desc: '6-week intensive research, knowledge DB build & live shoot access',
          borderClass: 'border-t-[#00be61]',
          textClass: 'text-[#00be61]',
        },
      ],
    },
    sec5: {
      tag: 'Application Form',
      title: 'Internship Application',
      titleEn: '(Apply Now)',
      subtitle:
        'Please complete and submit the application form below. (Includes resume upload and a brief preliminary research exercise.)',
      iframeTitle: 'One Big World Show Global Affairs Research Internship Application Form',
    },
    footer: {
      company: 'Knmir Inc.',
      rep: 'CEO: RASCH TYLER JOSEF',
      bizNo: 'Business Reg: 116-81-96227',
      address: 'Address: B1, 2, Yeongjung-ro 29-gil, Yeongdeungpo-gu, Seoul, Republic of Korea',
      careers: 'Careers',
    },
  },
};

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

  const t = content[lang === 'EN' ? 'EN' : 'KR'];

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
              {t.hero.badge}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] break-keep">
            {t.hero.titleLine1} <br className="hidden sm:inline" />
            {t.hero.titleLine2}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed break-keep font-light">
            {t.hero.subtitle}
          </p>

          {/* 3 Key Summary Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {t.hero.chips.map((chip, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#161616] border border-white/10 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {chip.tag}
                </div>
                <div className="text-base font-bold text-white mb-1 break-keep">
                  {chip.title}
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  {chip.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="pt-2">
            <a
              href="#apply"
              onClick={scrollToApply}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm tracking-wider uppercase rounded-xl hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-accent/20"
            >
              <span>{t.hero.applyBtn}</span>
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
              {t.sec1.tag}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {t.sec1.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">{t.sec1.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.sec1.cards.map((card, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#161616] border border-white/10 space-y-2">
                <div className="text-xs font-mono text-accent font-semibold uppercase tracking-wider">
                  {card.label}
                </div>
                <div className="text-xl font-bold text-white break-keep">
                  {card.value}{' '}
                  {card.note && (
                    <span className="text-sm font-normal text-zinc-400">{card.note}</span>
                  )}
                </div>
                {card.desc && (
                  <p className="text-xs text-zinc-400 break-keep">
                    {card.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            3. SECTION 2: 담당 업무 (Roles & Responsibility)
           ======================================================== */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.sec2.tag}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {t.sec2.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {t.sec2.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.sec2.tasks.map((task) => (
              <div
                key={task.no}
                className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-white/20 font-mono">{task.no}</span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-accent/10 text-accent border border-accent/30">
                    {task.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white break-keep">
                  {task.title}
                </h3>
                <ul className="space-y-2 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                  {task.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="text-accent mt-1 shrink-0">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            4. SECTION 3: 지원 자격 (Qualifications)
           ======================================================== */}
        <section className="space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t.sec3.tag}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {t.sec3.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">{t.sec3.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Must Have */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {t.sec3.mustHave.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-6">{t.sec3.mustHave.title}</h3>
                <ul className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                  {t.sec3.mustHave.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent font-bold shrink-0">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Preferred */}
            <div className="p-8 rounded-3xl bg-[#161616] border border-white/10 hover:border-accent/40 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-4">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  {t.sec3.preferred.tag}
                </div>
                <h3 className="text-xl font-bold text-white mb-6">{t.sec3.preferred.title}</h3>
                <ul className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed break-keep">
                  {t.sec3.preferred.bullets.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent font-bold shrink-0">★</span>
                      <span>
                        {p.text}
                        {p.highlight && (
                          <strong className="text-white font-semibold">{p.highlight}</strong>
                        )}
                      </span>
                    </li>
                  ))}
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
              {t.sec4.tag}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {t.sec4.title}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">{t.sec4.sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {t.sec4.steps.map((st, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#161616] border-t-2 ${st.borderClass} border-x border-b border-white/10 space-y-2 relative`}
              >
                <div className={`text-xs font-mono font-bold ${st.textClass} tracking-wider uppercase`}>
                  {st.step}
                </div>
                <div className="text-base font-bold text-white">{st.title}</div>
                <div className="text-sm font-semibold text-zinc-200">
                  {st.date.map((line, lIdx) => (
                    <React.Fragment key={lIdx}>
                      {line}
                      {lIdx < st.date.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug break-keep pt-1">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            6. SECTION 5: 지원서 접수 폼 임베드 섹션 (Apply Now)
           ======================================================== */}
        <section id="apply" className="scroll-mt-24 space-y-8">
          <div className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              {t.sec5.tag}
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tight">
              {t.sec5.title}{' '}
              <span className="text-zinc-500 text-xl md:text-3xl font-normal">{t.sec5.titleEn}</span>
            </h2>
            <p className="text-base text-zinc-300 mt-2 font-light">
              {t.sec5.subtitle}
            </p>
          </div>

          {/* Tally Embed Container */}
          <div className="w-full rounded-3xl overflow-hidden bg-white shadow-2xl border border-white/20 transition-all duration-300">
            <iframe
              data-tally-src="https://tally.so/r/ArPK4B?transparentBackground=1"
              src="https://tally.so/r/ArPK4B?transparentBackground=1"
              loading="lazy"
              width="100%"
              height="750"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title={t.sec5.iframeTitle}
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
                <span className="font-bold text-zinc-300">{t.footer.company}</span>
                <span className="hidden md:inline text-zinc-700">|</span>
                <span>{t.footer.rep}</span>
                <span className="hidden md:inline text-zinc-700">|</span>
                <span>{t.footer.bizNo}</span>
              </div>
              <div>{t.footer.address}</div>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <span>© 2026 Tyler Rasch Media</span>
                <span className="text-zinc-700">•</span>
                <a href="/careers" className="text-white hover:text-accent transition-colors">
                  {t.footer.careers}
                </a>
                <span className="text-zinc-700">•</span>
                <a href="/policy" className="hover:text-white transition-colors">
                  Privacy &amp; AI Policy
                </a>
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
