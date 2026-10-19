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
      titleLine1: '타일러 미디어와 함께할',
      titleLine2: '기업 협업 & PR 인턴을 모십니다',
      subtitle:
        '글로벌 지식 채널 원빅월드쇼(1BWS)와 라이프스타일 채널 리얼리 타일러(Really Tyler)를 제작하는 타일러 미디어에서 비즈니스 파트너십과 PR 실무를 함께 만들어갈 인재를 찾습니다.',
      chips: [
        {
          tag: 'Schedule',
          title: '주 3일 · 일 3시간 집중 근무',
          sub: '오전 09:00 ~ 12:00',
        },
        {
          tag: 'Flexibility',
          title: '학업·취업 준비 병행 최적화',
          sub: '주 3일 오전 집중 근무',
        },
        {
          tag: 'Certification',
          title: '실무 경험 & 공식 수료증 발급',
          sub: '타일러 미디어 공식 인증 & 추천서',
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
          value: '4년제 대학교 휴학생, 졸업예정자, 또는 기졸업자',
          desc: '학업이나 취업 준비와 병행 가능한 오전 집중 근무입니다.',
        },
        {
          label: '근무 기간',
          value: '2026년 10월 26일(월) ~ 12월 11일(금) (총 7주)',
        },
        {
          label: '근무 형태',
          value: '주 3일 / 오전 09:00 ~ 12:00',
          desc: '하루 3시간 / 주 9시간',
        },
        {
          label: '근무 장소',
          value: '온·오프라인 (영등포구) 병행',
        },
        {
          label: '급여 조건',
          value: '시급 11,000원',
          note: '(산재보험 적용)',
        },
      ],
    },
    sec2: {
      tag: 'Section 02',
      title: '담당 업무 (Roles & Responsibility)',
      sub: '타일러 미디어의 핵심 비즈니스 파트너십과 대외 PR을 주도적으로 경험합니다.',
      tasks: [
        {
          no: '01',
          tag: 'Partnership',
          title: '국내외 기업 및 광고주 협업 제안',
          bullets: [
            '타일러 미디어와 협업할 만한 국내외 기업, 브랜드, 대형 광고대행사 발굴 및 리스트업',
            '파트너십 안내서(미디어킷) 전달 및 비즈니스 협업 제안 이메일 발송',
          ],
        },
        {
          no: '02',
          tag: 'Press & PR',
          title: 'PR 및 보도자료 배포',
          bullets: [
            '신규 프로젝트 및 채널 주요 소식 보도자료 작성',
            '주요 언론사(방송·신문·IT·경제지) 기자 연락처 최신화 및 보도자료 배포',
          ],
        },
        {
          no: '03',
          tag: 'Editorial & SNS',
          title: '공식 웹사이트 블로그 및 SNS 콘텐츠 운영',
          bullets: [
            'tylerrasch.com 공식 웹사이트 자체 블로그 콘텐츠 기획 및 글 작성',
            '카드뉴스 등 주요 SNS 포스트 콘텐츠 기획·제작 및 발행',
            '에피소드 인사이트, 글로벌 트렌드 분석 아티클 에디토리얼 지원',
          ],
        },
        {
          no: '04',
          tag: 'Operations',
          title: '비즈니스 파트너십 및 미디어 오퍼레이션 운영 지원',
          bullets: [
            '제안 미팅 일정 조율 및 기본 대외 커뮤니케이션 지원',
            '주요 유튜브 채널들의 브랜드 협찬 및 광고 트렌드 모니터링',
            '프로젝트 진행 및 팀 운영에 필요한 전반적인 미디어 오퍼레이션 지원',
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
          '기본적인 비즈니스 이메일 작성과 꼼꼼한 정보 검색이 가능하신 분',
          '사람들과 소통하는 것을 좋아하고 예의 바른 커뮤니케이션 태도를 갖추신 분',
          '주 3일 오전 근무(09:00~12:00)에 집중할 수 있는 분',
        ],
      },
      preferred: {
        tag: '우대 사항',
        title: 'Preferred',
        bullets: [
          {
            text: '영문 이메일 작성이나 해외 기업 리서치가 가능하신 분 ',
            highlight: '(영어 능통자)',
          },
          {
            text: '슬랙(Slack), 노션(Notion), 구글 문서 활용이 익숙하신 분',
          },
          {
            text: '미디어, 광고, 홍보, 비즈니스 협업에 관심이 많으신 분',
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
          date: ['10월 2일(금) ~', '10월 15일(목) 자정'],
          desc: '* 서류 접수 순 순차 검토 및 면접 진행 (적격자 채용 시 조기 마감 가능)',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 02',
          title: '화상 면접',
          date: ['10월 12일(월) ~', '10월 16일(금)'],
          desc: '온라인 구글 미트 20분 내외 진행',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 03',
          title: '합격자 발표',
          date: ['10월 16일(금)'],
          desc: '합격자 대상 개별 이메일 및 유선 안내',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 04',
          title: '사전 실무 교육',
          date: ['10월 19일(월) 주간'],
          desc: '오리엔테이션 및 실무 툴 온보딩 (일정 조율)',
          borderClass: 'border-t-[#ffc700]',
          textClass: 'text-[#ffc700]',
        },
        {
          step: 'STEP 05',
          title: '정식 근무 시작',
          date: ['10월 26일(월)'],
          desc: '7주간 집중 근무 시작 (12월 11일까지)',
          borderClass: 'border-t-[#00be61]',
          textClass: 'text-[#00be61]',
        },
      ],
    },
    sec5: {
      tag: 'Application Form',
      title: '인턴십 지원하기',
      titleEn: '(Apply Now)',
      subtitle: '아래 지원 폼을 작성해 제출해 주시면 서류 검토 후 순차적으로 연락드립니다.',
      iframeTitle: '타일러 미디어 인턴십 지원서',
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
      titleLine1: 'Join Tyler Media as a',
      titleLine2: 'Corporate Partnership & PR Intern',
      subtitle:
        'Tyler Media, the creator of global knowledge channel One Big World Show (1BWS) and lifestyle channel Really Tyler, is looking for talent to build business partnerships and hands-on PR together.',
      chips: [
        {
          tag: 'Schedule',
          title: '3 Days / 3 Hours per Day',
          sub: '09:00 AM ~ 12:00 PM',
        },
        {
          tag: 'Flexibility',
          title: 'Optimized for Studies & Job Prep',
          sub: 'Focused 3-day morning schedule',
        },
        {
          tag: 'Certification',
          title: 'Hands-on Experience & Certificate',
          sub: 'Official Tyler Media certificate & reference',
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
          desc: 'Immediately assigned to practical projects working closely with the team.',
        },
        {
          label: 'Eligibility',
          value: 'Undergraduates on leave, prospective or recent 4-year university graduates',
          desc: 'Morning-focused schedule compatible with academic studies or career preparation.',
        },
        {
          label: 'Employment Period',
          value: 'October 26, 2026 (Mon) ~ December 11, 2026 (Fri) (7 Weeks)',
        },
        {
          label: 'Work Schedule',
          value: '3 Days a Week / 09:00 AM ~ 12:00 PM',
          desc: '3 hours/day, 9 hours/week',
        },
        {
          label: 'Location',
          value: 'Hybrid Onsite & Remote (Yeongdeungpo-gu, Seoul)',
        },
        {
          label: 'Compensation',
          value: 'KRW 11,000 / hour',
          note: '(Industrial accident insurance included)',
        },
      ],
    },
    sec2: {
      tag: 'Section 02',
      title: 'Roles & Responsibility',
      sub: 'Gain hands-on experience driving core business partnerships and external PR at Tyler Media.',
      tasks: [
        {
          no: '01',
          tag: 'Partnership',
          title: 'Corporate Partnership & Brand Collaboration Proposals',
          bullets: [
            'Identify and compile prospective corporate clients, brands, and major advertising agencies suitable for Tyler Media partnerships',
            'Deliver partnership media kits and conduct outreach for business collaboration proposals',
          ],
        },
        {
          no: '02',
          tag: 'Press & PR',
          title: 'PR & Press Release Distribution',
          bullets: [
            'Draft press releases for new productions, strategic initiatives, and major channel updates',
            'Maintain up-to-date press contacts across major media outlets (broadcast, print, tech, business) and distribute releases',
          ],
        },
        {
          no: '03',
          tag: 'Editorial & SNS',
          title: 'Official Website Blog & Social Media Management',
          bullets: [
            'Plan and write original editorial blog content for the official tylerrasch.com platform',
            'Design, create, and publish social media content including carousel card news and channel posts',
            'Support editorial write-ups on episode insights and global trend analyses',
          ],
        },
        {
          no: '04',
          tag: 'Operations',
          title: 'Partnership Operations & Media Production Support',
          bullets: [
            'Coordinate proposal meeting schedules and support general external communications',
            'Monitor industry sponsorship trends and brand integrations across top YouTube channels',
            'Provide comprehensive operational support for project execution and team workflows',
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
          'Ability to compose professional business emails and conduct thorough information research',
          'Enthusiastic and respectful communication style with strong interpersonal skills',
          'Able to commit fully to 3 mornings a week (09:00 AM ~ 12:00 PM)',
        ],
      },
      preferred: {
        tag: 'Preferred',
        title: 'Preferred',
        bullets: [
          {
            text: 'Fluent in English: ability to draft professional English business correspondence and conduct international corporate research ',
            highlight: '(English Proficiency)',
          },
          {
            text: 'Familiarity with modern productivity tools including Slack, Notion, and Google Workspace',
          },
          {
            text: 'High interest in digital media, advertising, public relations, and corporate partnerships',
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
          date: ['Oct 2 (Fri) ~', 'Oct 15 (Thu) Midnight'],
          desc: '* Applications reviewed on a rolling basis; early closure upon hiring suitable candidates',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 02',
          title: 'Video Interview',
          date: ['Oct 12 (Mon) ~', 'Oct 16 (Fri)'],
          desc: 'Approx. 20-min online interview via Google Meet',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 03',
          title: 'Final Results',
          date: ['Oct 16 (Fri)'],
          desc: 'Individual notification via email and phone call',
          borderClass: 'border-t-accent',
          textClass: 'text-accent',
        },
        {
          step: 'STEP 04',
          title: 'Orientation & Training',
          date: ['Week of Oct 19 (Mon)'],
          desc: 'Orientation and tool onboarding (schedule coordinated)',
          borderClass: 'border-t-[#ffc700]',
          textClass: 'text-[#ffc700]',
        },
        {
          step: 'STEP 05',
          title: 'Internship Commences',
          date: ['Oct 26 (Mon)'],
          desc: '7-week intensive program begins (concludes Dec 11)',
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
        'Please complete and submit the application form below. We will review submissions on a rolling basis and contact qualified candidates.',
      iframeTitle: 'Tyler Media Internship Application Form',
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
              data-tally-src="https://tally.so/r/BzMd9K?transparentBackground=1"
              src="https://tally.so/r/BzMd9K?transparentBackground=1"
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
