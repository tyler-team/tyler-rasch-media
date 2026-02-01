"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- TYPES & CONTENT DICTIONARY ---

type Guest = {
  name: string;
  topic: string;
  tag: string;
};

type Content = {
  sidebar: {
    vision: string;
    impact: string;
    originals: string;
    brands: string;
    packages: string;
    contact: string;
  };
  hero: {
    label: string;
    title_span: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  philosophy: {
    heading: string;
    p1: React.ReactNode;
    p2: React.ReactNode;
    quote: string;
  };
  dashboard: {
    label: string;
    views: string;
    views_label: string;
    reach: string;
    reach_label: string;
    trust: string;
    trust_label: string;
  };
  portfolio: {
    originals: {
      heading: string;
      items: {
        title: string;
        subtitle: string;
        desc: string;
        thumbnail: string;
        videoUrl?: string;
        guests?: Guest[];
        locations?: string[];
      }[];
    };
    brands: {
      heading: string;
      subheading: string;
      items: {
        client: string;
        title: string;
        category: string;
      }[];
    };
  };
  packages: {
    heading: string;
    subheading: string;
    items: {
      title: string;
      subtitle: string;
      desc: string;
      detail: string;
    }[];
  };
  contact: {
    heading: React.ReactNode;
  };
};

const contentData: Record<'KR' | 'EN', Content> = {
  KR: {
    sidebar: {
      vision: "비전",
      impact: "영향력",
      originals: "오리지널",
      brands: "브랜드 프로젝트",
      packages: "파트너십",
      contact: "문의하기"
    },
    hero: {
      label: "STRATEGIC PARTNERSHIP",
      title_span: "RASCH",
      subtitle: "지적인 아이콘 • 현대 미디어의 권위자",
      description: "타일러 라쉬는 단순한 방송인이 아닙니다. 대한민국에서 가장 신뢰받는 외국인 지식인이자, 브랜드의 메시지에 '지적 권위'를 부여하는 독보적인 미디어 솔루션입니다.",
      cta: "협업 문의하기"
    },
    philosophy: {
      heading: "THE INTELLECTUAL AUTHORITY",
      p1: <>타일러 라쉬는 <span className="text-accent font-bold">국민적 인지도</span>와 <span className="text-white font-bold">높은 신뢰도</span>를 동시에 보유한 유일한 인물입니다. 단순한 인플루언서를 넘어, 기후 변화, 인문학, 세계 경제를 논하는 '시대의 지성'으로서 브랜드에 깊이 있는 가치를 더합니다.</>,
      p2: <>우리는 단순한 노출을 제안하지 않습니다. 귀사의 브랜드 철학이 타일러의 언어를 통해 대중에게 <span className="text-accent font-bold">논리적이고 설득력 있게</span> 전달되는 '전략적 커뮤니케이션'을 약속합니다.</>,
      quote: "진정성 있는 메시지만이 세상을 움직입니다."
    },
    dashboard: {
      label: "REAL-TIME IMPACT",
      views: "6,300만+",
      views_label: "누적 유튜브 조회수",
      reach: "67만+",
      reach_label: "채널 구독자 수",
      trust: "TOP 1%",
      trust_label: "브랜드 신뢰도 지수"
    },
    portfolio: {
      originals: {
        heading: "ORIGINAL CONTENTS",
        items: [
          {
            title: "Candid Couch",
            subtitle: "캔디드 카우치",
            desc: "김지윤 박사, 이수지 등 다양한 분야의 전문가/셀럽과 나누는 진솔한 대화",
            thumbnail: "https://i.ytimg.com/vi/G1jeMQCh3MI/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=G1jeMQCh3MI",
            guests: [
              { name: "김지윤 박사", topic: "국제 정세 전문가와 나누는 영어 토크", tag: "#GlobalRelations" },
              { name: "이수지", topic: "풍자와 해학, 그리고 시대의 언어", tag: "#Satire" },
              { name: "딘딘", topic: "솔직하고 담백한 인생 철학 대담", tag: "#CandidTalk" },
              { name: "스텔라장", topic: "음악과 언어 사이의 지적 교감", tag: "#MusicAndMind" }
            ]
          },
          {
            title: "Walk with Tyler",
            subtitle: "타일러와 걷기 (Travel VLOG)",
            desc: "보스턴, 런던, 브뤼셀. 타일러의 시선으로 담아낸 세계 도시의 정취",
            thumbnail: "https://i.ytimg.com/vi/CSy63AkYl-A/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=CSy63AkYl-A",
            locations: ["Boston", "Vancouver", "Brussels", "London", "Munich", "Istanbul"]
          }
        ]
      },
      brands: {
        heading: "BRAND COLLABORATIONS",
        subheading: "브랜드 철학을 타일러만의 논리적인 서사로 재해석한 성공 사례",
        items: [
          { client: "SK Telecom", title: "당신의 시간을 아끼는 법 (Neuroscience of Design)", category: "Branded Content" },
          { client: "LG Electronics", title: "한국인이 얼음에 집착하는 이유 (Ice Culture)", category: "Branded Content" },
          { client: "Cooper Vision", title: "플라스틱 중립: 새로운 경제 모델", category: "ESG Campaign" },
          { client: "고용노동부", title: "노동시간과 경제 성장의 관계", category: "Public Sector" },
          { client: "NOOGI", title: "자세를 바로잡는 쿠션 통합 마케팅", category: "Product Placement" },
          { client: "8APM", title: "몰입을 돕는 포커스 젤 활용 제안", category: "Product Placement" }
        ]
      }
    },
    packages: {
      heading: "PARTNERSHIP PACKAGES",
      subheading: "브랜드의 격을 높이는 전략적 솔루션",
      items: [
        {
          title: "Branded Storytelling",
          subtitle: "브랜디드 콘텐츠 (Main)",
          desc: "단순 광고가 아닌, 하나의 완성된 지적 콘텐츠",
          detail: "10분 내외의 본편 영상을 통해 브랜드의 핵심 메시지를 타일러의 시각으로 깊이 있게 분석하고 전달합니다. 시청자가 자발적으로 찾아보고 공유하는 고품격 스토리텔링을 제공합니다."
        },
        {
          title: "Organic Integration",
          subtitle: "PPL (In-Video)",
          desc: "흐름을 해치지 않는 자연스러운 맥락 연결",
          detail: "콘텐츠의 지적 논의 과정에서 브랜드 제품이나 서비스가 자연스러운 해결책이나 예시로 등장합니다. 90초 내외의 노출로 거부감 없이 확실한 각인 효과를 창출합니다."
        },
        {
          title: "Viral Impact",
          subtitle: "Short-form & SNS",
          desc: "즉각적인 확산과 도달을 위한 숏폼 전략",
          detail: "인스타그램 릴스와 유튜브 쇼츠를 통해 핵심 메시지를 강렬하게 전달합니다. 2544 핵심 타겟층에게 빠르고 감각적으로 소구하는 고효율 바이럴 솔루션입니다."
        }
      ]
    },
    contact: {
      heading: <>Lead with Authority.<br />Partner with Tyler.</>
    }
  },
  EN: {
    sidebar: {
      vision: "Vision",
      impact: "Impact",
      originals: "Originals",
      brands: "Brand Projects",
      packages: "Packages",
      contact: "Inquire"
    },
    hero: {
      label: "STRATEGIC PARTNERSHIP",
      title_span: "RASCH",
      subtitle: "The Intellectual Icon • Modern Media Authority",
      description: "Tyler Rasch is more than a broadcaster. He is Korea's most trusted foreign intellectual—a unique media solution that imbues your brand message with undeniable authority and depth.",
      cta: "Inquire Now"
    },
    philosophy: {
      heading: "THE INTELLECTUAL AUTHORITY",
      p1: <>Tyler holds a unique position in the Korean market, combining <span className="text-accent font-bold">National Recognition</span> with <span className="text-white font-bold">Unwavering Trust</span>. As a thought leader on Climate, Humanities, and Economics, he elevates brands beyond simple promotion.</>,
      p2: <>We don't just offer exposure. We promise <span className="text-accent font-bold">Strategic Communication</span> where your brand philosophy is translated into Tyler's logical, persuasive language, resonating deeply with the "Active Economic Class".</>,
      quote: "Authenticity is the only currency that matters."
    },
    dashboard: {
      label: "REAL-TIME IMPACT",
      views: "63M+",
      views_label: "Total YouTube Views",
      reach: "677K+",
      reach_label: "YouTube Subscribers",
      trust: "TOP 1%",
      trust_label: "Brand Trust Index"
    },
    portfolio: {
      originals: {
        heading: "ORIGINAL CONTENTS",
        items: [
          {
            title: "Candid Couch",
            subtitle: "Guest Talk Show",
            desc: "Sincere, unscripted conversations with various intellectuals and celebrities.",
            thumbnail: "https://i.ytimg.com/vi/G1jeMQCh3MI/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=G1jeMQCh3MI",
            guests: [
              { name: "Dr. Jiyoon Kim", topic: "English Talk with Int'l Relations Expert", tag: "#GlobalRelations" },
              { name: "Lee Su-ji", topic: "The Aesthetics of Satire and Humor", tag: "#Humor" },
              { name: "DinDin", topic: "Honest Life Philosophy Sessions", tag: "#CandidTalk" },
              { name: "Stella Jang", topic: "Intellectual Connection in Music", tag: "#MusicAndMind" }
            ]
          },
          {
            title: "Walk with Tyler",
            subtitle: "Travel VLOG Series",
            desc: "Experiencing global cities and cultures through Tyler's intellectual lens.",
            thumbnail: "https://i.ytimg.com/vi/CSy63AkYl-A/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=CSy63AkYl-A",
            locations: ["Boston", "Vancouver", "Brussels", "London", "Munich", "Istanbul"]
          }
        ]
      },
      brands: {
        heading: "BRAND COLLABORATIONS",
        subheading: "Brand philosophies translated into Tyler's logical narratives.",
        items: [
          { client: "SK Telecom", title: "Neuroscience Behind Design", category: "Branded Content" },
          { client: "LG Electronics", title: "Why Koreans Can't Live Without Ice", category: "Branded Content" },
          { client: "Cooper Vision", title: "The Plastic Neutral Economic Model", category: "ESG Campaign" },
          { client: "MOEL", title: "Economy of Shorter Labor Hours", category: "Public Sector" },
          { client: "NOOGI", title: "Ergonomic Cushion Integration", category: "Product Placement" },
          { client: "8APM", title: "Focus Gel for Productive Sessions", category: "Product Placement" }
        ]
      }
    },
    packages: {
      heading: "PARTNERSHIP PACKAGES",
      subheading: "Strategic Integration for Industry Leaders",
      items: [
        {
          title: "Branded Storytelling",
          subtitle: "Signature Content (Main)",
          desc: "Not an Ad, but Intellectual Property.",
          detail: "A dedicated ~10m episode where Tyler deconstructs your brand message through his analytical lens. We create content that viewers actively seek out, ensuring deep engagement and high retention."
        },
        {
          title: "Organic Integration",
          subtitle: "Product Placement (PPL)",
          desc: "Context-Driven Seamless Exposure",
          detail: "Your product appears as a natural solution or example within a high-level intellectual discussion. (~90s). We ensure zero viewer fatigue while maximizing brand recall."
        },
        {
          title: "Viral Impact",
          subtitle: "Short-form & Socials",
          desc: "High-Frequency Visual Communication",
          detail: "Leveraging Instagram Reels and YouTube Shorts for immediate viral reach. Targeting the 25-44 demographic with punchy, visually sophisticated narratives."
        }
      ]
    },
    contact: {
      heading: <>Lead with Authority.<br />Partner with Tyler.</>
    }
  }
};

// --- COMPONENTS ---

const Sidebar = ({ lang, setLang }: { lang: 'KR' | 'EN', setLang: (l: 'KR' | 'EN') => void }) => {
  const t = contentData[lang].sidebar;

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-20 md:w-64 z-50 glass border-r border-white/10 flex flex-col justify-between py-12 px-4 md:px-8">

      <div>
        <div className="font-black text-2xl tracking-tighter leading-none mb-1 text-center md:text-left">
          <span className="md:hidden">TR</span>
          <span className="hidden md:block">TYLER<br />RASCH<br /><span className="text-accent">MEDIA</span></span>
        </div>
      </div>

      <div className="flex flex-col gap-8 text-xs md:text-sm font-bold tracking-widest uppercase">
        {['vision', 'impact', 'originals', 'brands', 'packages', 'contact'].map((item) => (
          <a key={item} href={`#${item}`} className="flex items-center gap-4 hover:text-accent transition-colors group">
            <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="hidden md:inline">{t[item as keyof typeof t]}</span>
            <span className="md:hidden text-[10px]">{t[item as keyof typeof t].substring(0, 2)}</span>
          </a>
        ))}
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase px-1">Language</span>
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-full relative">
            <motion.div
              animate={{ x: lang === 'EN' ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-accent rounded-full shadow-[0_0_15px_rgba(0,209,160,0.3)]"
            />
            <button
              onClick={() => setLang('KR')}
              className={`relative z-10 flex-1 py-1.5 text-[10px] md:text-xs font-black transition-colors ${lang === 'KR' ? 'text-black' : 'text-zinc-500'}`}
            >
              KR
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`relative z-10 flex-1 py-1.5 text-[10px] md:text-xs font-black transition-colors ${lang === 'EN' ? 'text-black' : 'text-zinc-500'}`}
            >
              EN
            </button>
          </div>
        </div>
        <div className="text-[10px] text-zinc-700 hidden md:block px-1">
          © 2026 TRM
        </div>
      </div>
    </nav>
  );
};

const TypeformEmbed = () => {
  return (
    <div className="w-full h-[600px] md:h-[710px] rounded-sm overflow-hidden bg-white/5 border border-white/10">
      <iframe
        id="typeform-full"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="camera; microphone; autoplay; encrypted-media;"
        src="https://form.typeform.com/to/PgzHUUgI?typeform-medium=embed-sdk&typeform-source=www.tylerrasch.com"
        title="Tyler Rasch Partnership Inquiry"
      ></iframe>
    </div>
  );
};

const ImpactDashboard = ({ t }: { t: Content['dashboard'] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto relative z-20 px-0">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass p-8 rounded-2xl border-t border-accent/20 flex flex-col items-center text-center shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-[#0A192F]/80 backdrop-blur-xl hover:border-accent/50 transition-colors"
        >
          <p className="text-accent text-xs font-bold tracking-[0.2em] mb-2 uppercase">{i === 0 ? t.label : '\u00A0'}</p>
          <div className="text-5xl lg:text-5xl font-black text-white mb-2 tracking-tighter">
            {i === 0 && t.views}
            {i === 1 && t.reach}
            {i === 2 && t.trust}
          </div>
          <div className="h-1 w-12 bg-accent/50 rounded-full mb-4" />
          <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
            {i === 0 && t.views_label}
            {i === 1 && t.reach_label}
            {i === 2 && t.trust_label}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// --- FINAL CALIBRATED SECTION BACKGROUND ---
const SectionBackground = ({ src, y, priority = false }: { src: string, y: any, priority?: boolean }) => (
  <motion.div
    style={{ y }}
    className="absolute right-0 top-0 bottom-0 w-full md:w-[65%] lg:w-[55%] opacity-[0.6] grayscale pointer-events-none z-0"
  >
    <Image
      src={src}
      alt="Background Tyler"
      fill
      className="object-cover object-[center_15%] md:object-[center_10%]" // Pin focus on the face/upper body
      priority={priority}
    />
    {/* Even lighter gradients to prioritize the portrait visibility */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#02060C] via-[#02060C]/20 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#02060C] via-transparent to-[#02060C]" />
  </motion.div>
);

export default function Home() {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');
  const t = contentData[lang];

  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const yPhil = useTransform(scrollYProgress, [0, 0.4], [50, -50]);
  const yImpact = useTransform(scrollYProgress, [0.2, 0.6], [50, -50]);
  const yOriginals = useTransform(scrollYProgress, [0.4, 0.8], [50, -50]);
  const yBrands = useTransform(scrollYProgress, [0.5, 0.9], [50, -50]);
  const yPackages = useTransform(scrollYProgress, [0.6, 1], [50, -50]);
  const yContact = useTransform(scrollYProgress, [0.8, 1], [50, 0]);

  return (
    <div className="min-h-screen bg-[#02060C] text-foreground selection:bg-accent selection:text-black font-sans scroll-smooth uppercase-headings">
      <Sidebar lang={lang} setLang={setLang} />

      <main className="pl-20 md:pl-64">

        {/* 1. HERO section */}
        <section id="vision" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,229,255,0.05)_0%,transparent_50%)]" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-[1px] bg-accent/50" />
              <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">{t.hero.label}</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase">
              TYLER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800">RASCH</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium mb-4">{t.hero.subtitle}</p>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl word-keep-all mb-12">
              {t.hero.description}
            </p>
            <a href="#contact" className="px-8 py-4 bg-accent text-black font-bold text-sm tracking-widest hover:bg-white transition-colors">
              {t.hero.cta} &rarr;
            </a>
          </motion.div>

          {/* AUDIT: Keep 'tyler_suit_thinking.jpg' as the first one as requested */}
          <SectionBackground src="/headshots/tyler_suit_thinking.jpg" y={yHero} priority={true} />
        </section>

        {/* 2. PHILOSOPHY */}
        <section className="relative py-48 px-8 md:px-20 border-b border-white/5 bg-white/[0.01] overflow-hidden">
          {/* AUDIT: Using unique 'tyler_crossed_arms_front.jpg' */}
          <SectionBackground src="/headshots/tyler_crossed_arms_front.jpg" y={yPhil} />
          <div className="max-w-5xl relative z-10">
            <h2 className="text-sm font-bold text-zinc-500 tracking-[0.2em] mb-12 uppercase">{t.philosophy.heading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg md:text-xl leading-relaxed text-zinc-400 border-l border-accent/20 pl-8">
              <p className="word-keep-all">{t.philosophy.p1}</p>
              <p className="word-keep-all">{t.philosophy.p2}</p>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="text-2xl md:text-4xl font-serif italic text-white/80">"{t.philosophy.quote}"</p>
            </div>
          </div>
        </section>

        {/* 3. IMPACT DASHBOARD */}
        <section id="impact" className="relative py-72 px-8 md:px-20 border-b border-white/5 overflow-hidden">
          {/* AUDIT: Using unique 'tyler_prayer_hands.jpg' */}
          <SectionBackground src="/headshots/tyler_prayer_hands.jpg" y={yImpact} />
          <div className="relative z-10">
            <ImpactDashboard t={t.dashboard} />
          </div>
        </section>

        {/* 4. ORIGINAL CONTENTS */}
        <section id="originals" className="relative py-48 px-8 md:px-20 border-b border-white/5 overflow-hidden">
          {/* AUDIT: Using unique '20251206_TylerRasch0253_BW.jpg' */}
          <SectionBackground src="/headshots/20251206_TylerRasch0253_BW.jpg" y={yOriginals} />
          <div className="mb-20 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">{t.portfolio.originals.heading}</h2>
            <div className="w-20 h-1 bg-accent/30" />
          </div>

          <div className="grid grid-cols-1 gap-24 relative z-10">
            {t.portfolio.originals.items.map((item, i) => (
              <div key={i} className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
                <motion.a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl block"
                >
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized={item.thumbnail.startsWith('http')} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-white font-bold text-sm">&rarr; WATCH PREVIEW</span>
                  </div>
                </motion.a>

                <div className="space-y-8">
                  <div>
                    <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">{item.subtitle}</span>
                    <h3 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 italic">{item.title}</h3>
                    <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">{item.desc}</p>
                  </div>

                  {item.guests && (
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Featured Guests & Topics</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.guests.map((guest, idx) => (
                          <div key={idx} className="p-4 glass rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-white font-bold">{guest.name}</span>
                              <span className="text-[10px] text-accent font-mono">{guest.tag}</span>
                            </div>
                            <p className="text-xs text-zinc-500">{guest.topic}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BRAND COLLABORATIONS */}
        <section id="brands" className="relative py-48 px-8 md:px-20 border-b border-white/5 bg-white/[0.01] overflow-hidden">
          {/* AUDIT: Using unique 'tyler_laughing.jpg' */}
          <SectionBackground src="/headshots/tyler_laughing.jpg" y={yBrands} />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">{t.portfolio.brands.heading}</h2>
                <p className="text-accent text-sm font-bold uppercase tracking-widest">{t.portfolio.brands.subheading}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.portfolio.brands.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="p-8 bg-zinc-900/40 border border-white/5 hover:border-accent/40 rounded-2xl group cursor-pointer transition-all hover:bg-zinc-900/60"
                >
                  <div className="flex flex-col h-full justify-between gap-12">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase py-1 px-3 border border-zinc-800 rounded-full">{item.category}</span>
                        <span className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors leading-snug mb-2">{item.title}</h3>
                      <p className="text-zinc-500 text-sm font-medium">{item.client}</p>
                    </div>
                    <div className="h-24 w-full bg-black/40 rounded-lg flex items-center justify-center border border-white/5 overflow-hidden">
                      <div className="text-zinc-800 font-black text-4xl tracking-tighter select-none opacity-20 uppercase group-hover:opacity-40 transition-opacity">
                        {item.client.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PARTNERSHIP PACKAGES */}
        <section id="packages" className="relative py-48 px-8 md:px-20 border-b border-white/5 overflow-hidden bg-white/[0.01]">
          {/* AUDIT: Using unique '20251206_TylerRasch0425_BW.jpg' */}
          <SectionBackground src="/headshots/20251206_TylerRasch0425_BW.jpg" y={yPackages} />
          <div className="relative z-10">
            <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase">{t.packages.heading}</h2>
              <p className="text-accent text-sm font-mono tracking-widest uppercase">{t.packages.subheading}</p>
            </div>

            <div className="space-y-24">
              {t.packages.items.map((item, i) => (
                <div key={i} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 border-l-2 border-white/5 pl-8 hover:border-accent transition-colors duration-500">
                  <div className="lg:col-span-4">
                    <span className="text-8xl font-black text-white/5 -ml-4 block -mt-10 mb-4 select-none">0{i + 1}</span>
                    <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-accent text-sm font-bold uppercase tracking-wider">{item.subtitle}</p>
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    <p className="text-xl text-white font-medium word-keep-all">{item.desc}</p>
                    <p className="text-zinc-400 leading-relaxed word-keep-all">{item.detail}</p>
                    <div className="pt-4">
                      <a href="#contact" className="inline-block border-b border-white/20 pb-1 text-xs font-bold uppercase tracking-widest hover:text-accent hover:border-accent transition-all">
                        {t.sidebar.contact} &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CONTACT */}
        <section id="contact" className="relative py-48 px-8 md:px-20 bg-[#050A10] overflow-hidden">
          {/* AUDIT: Make '20251206_TylerRasch0129_BW.jpg' the last one as requested */}
          <SectionBackground src="/headshots/20251206_TylerRasch0129_BW.jpg" y={yContact} />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-12 flex items-baseline gap-6">
              <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">PARTNERSHIP</h2>
              <div className="mb-2 animate-bounce text-accent text-2xl">↓</div>
            </div>

            <TypeformEmbed />

            <div className="mt-12 flex justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest">
              <span>© 2026 Tyler Rasch Media</span>
              <a href="mailto:contact@tylerrasch.com" className="hover:text-white transition-colors">contact@tylerrasch.com</a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
