"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
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
    sticky_cta: string;
  };
  hero: {
    label: string;
    title_span: string;
    subtitle: string;
    description: string;
    cta: string;
    media_kit_cta: string;
  };
  philosophy: {
    heading: string;
    p1: React.ReactNode;
    p2: React.ReactNode;
    quote: string;
    manifesto: React.ReactNode;
  };
  dashboard: {
    label: string;
    views: string;
    views_label: string;
    reach: string;
    reach_label: string;
    engagement: string;
    engagement_label: string;
    trust: string;
    trust_label: string;
    platform_demography: {
      title: string;
      tabs: {
        youtube: {
          label: string;
          tagline: string;
          gender_label: string;
          gender: { male: number; female: number };
          age_label: string;
          age_value: string;
          insight: string;
        };
        instagram: {
          label: string;
          tagline: string;
          gender_label: string;
          gender: { male: number; female: number };
          age_label: string;
          age_value: string;
          insight: string;
        };
      };
    };
    ecosystem: {
      channel_title: string;
      personal_title: string;
      platforms: {
        name: string;
        handle: string;
        count: string;
        icon: string;
        url: string;
        isChannel?: boolean;
      }[];
    };
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
        thumbnail?: string;
        url?: string;
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
      impact: "미디어 영향력",
      originals: "오리지널 시리즈",
      brands: "브랜드 파트너십",
      packages: "파트너십 패키지",
      contact: "문의하기",
      sticky_cta: "협업 문의하기"
    },
    hero: {
      label: "STRATEGIC PARTNERSHIP",
      title_span: "RASCH",
      subtitle: "지적 아이콘 • 브랜드에 지성을 더하는 목소리",
      description: "타일러 라쉬는 단순한 방송인이 아닙니다. 대한민국에서 가장 신뢰받는 외국인 지식인이자, 브랜드의 메시지에 '지적 권위'를 부여하는 독보적인 미디어 솔루션입니다.",
      cta: "협업 문의하기",
      media_kit_cta: "미디어 키트 다운로드"
    },
    philosophy: {
      heading: "비전",
      p1: <>타일러 라쉬는 <span className="text-accent font-bold">국민적 인지도</span>와 <span className="text-accent font-bold">높은 신뢰도</span>를 동시에 보유한 유일한 인물입니다. 단순한 인플루언서를 넘어, 기후 변화, 인문학, 세계 경제를 논하는 '시대의 지성'으로서 브랜드에 깊이 있는 가치를 더합니다.</>,
      p2: <>단순한 노출을 제안하지 않습니다. 귀사의 브랜드 철학이 타일러의 언어를 통해 대중에게 <span className="text-accent font-bold">논리적이고 설득력 있게</span> 전달되는 '전략적 커뮤니케이션'을 약속합니다.</>,
      quote: "진정성 있는 메시지만이 세상을 움직입니다.",
      manifesto: <><span className="block mb-2">단순한 노출을 넘어, 브랜드에 <span className="text-accent">깊이</span>를 더하세요</span>타일러의 목소리는 곧 <span className="text-accent">신뢰</span>가 됩니다</>
    },
    dashboard: {
      label: "REAL-TIME IMPACT",
      views: "6,300만+",
      views_label: "누적 유튜브 조회수",
      reach: "150만+",
      reach_label: "월간 평균 도달수",
      engagement: "67.7만+",
      engagement_label: "채널 구독자 수",
      trust: "TOP 1%",
      trust_label: "브랜드 신뢰도 지수",
      platform_demography: {
        title: "PLATFORM DEMOGRAPHY",
        tabs: {
          youtube: {
            label: "YOUTUBE",
            tagline: "지적 의사결정권자",
            gender_label: "Gender: 남성 53% / 여성 47%",
            gender: { male: 53, female: 47 },
            age_label: "Core Age: 25 - 44세 (70%)",
            age_value: "70%",
            insight: "경제 활동이 가장 활발한 '구매 핵심층'으로, 테크, 금융, 자동차 등 고관여 제품군에 즉각 반응합니다."
          },
          instagram: {
            label: "INSTAGRAM",
            tagline: "트렌드 리더",
            gender_label: "Gender: 여성 77% / 남성 23%",
            gender: { male: 23, female: 77 },
            age_label: "Core Age: 35 - 44세 (Dominant)",
            age_value: "Dominant",
            insight: "트렌드와 라이프스타일 소비를 주도하는 핵심 연령층으로, 뷰티, 패션, 리빙 등 비주얼 중심 소비재에 높은 반응률을 보입니다."
          }
        }
      },
      ecosystem: {
        channel_title: "타일러볼까요 (Channel)",
        personal_title: "Tyler Rasch (Personal)",
        platforms: [
          { name: "YouTube", handle: "@tylerbolkkayo", count: "165K", icon: "youtube", url: "https://www.youtube.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tylerbolkkayo", count: "70K+", icon: "instagram", url: "https://www.instagram.com/tylerbolkkayo", isChannel: true },
          { name: "TikTok", handle: "@tylerbolkkayo", count: "50K+", icon: "tiktok", url: "https://www.tiktok.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tyleroninsta", count: "247K", icon: "instagram", url: "https://www.instagram.com/tyleroninsta/" },
          { name: "LinkedIn", handle: "Tyler Rasch", count: "30K+", icon: "linkedin", url: "https://www.linkedin.com/in/tylerrasch/" },
          { name: "X (Twitter)", handle: "@tylerrasch", count: "65K+", icon: "twitter", url: "https://x.com/tylerrasch" },
          { name: "Facebook", handle: "Tyler Rasch", count: "18K+", icon: "facebook", url: "https://www.facebook.com/people/Tyler-Rasch/100011625431145/" }
        ]
      }
    },
    portfolio: {
      originals: {
        heading: "오리지널 시리즈",
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
        heading: "브랜드 파트너십",
        subheading: "브랜드 철학을 타일러만의 논리적인 서사로 재해석한 성공 사례",
        items: [
          { client: "SK Telecom", title: "당신의 시간을 아끼는 법 (Neuroscience of Design)", category: "Branded Content", thumbnail: "/portfolio/skt_thumbnail.jpg", url: "https://youtu.be/2WJvdU11OfM?si=Qe9XOS-FQl1Qg2-q" },
          { client: "LG Electronics", title: "한국인이 얼음에 집착하는 이유 (Ice Culture)", category: "Branded Content" },
          { client: "Cooper Vision", title: "플라스틱 중립: 새로운 경제 모델", category: "ESG Campaign" },
          { client: "고용노동부", title: "노동시간과 경제 성장의 관계", category: "Public Sector" },
          { client: "NOOGI", title: "자세를 바로잡는 쿠션 통합 마케팅", category: "Product Placement" },
          { client: "8APM", title: "몰입을 돕는 포커스 젤 활용 제안", category: "Product Placement" }
        ]
      }
    },
    packages: {
      heading: "파트너십 패키지",
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
      impact: "Media Influence",
      originals: "Original Series",
      brands: "Brand Partnership",
      packages: "Partnership",
      contact: "Inquire",
      sticky_cta: "Work with Tyler"
    },
    hero: {
      label: "STRATEGIC PARTNERSHIP",
      title_span: "RASCH",
      subtitle: "The Intellectual Icon • Modern Media Authority",
      description: "Tyler Rasch is more than a broadcaster. He is Korea's most trusted foreign intellectual—a unique media solution that imbues your brand message with undeniable authority and depth.",
      cta: "Inquire Now",
      media_kit_cta: "Download Media Kit"
    },
    philosophy: {
      heading: "VISION",
      p1: <>Tyler holds a unique position in the Korean market, combining <span className="text-accent font-bold">National Recognition</span> with <span className="text-accent font-bold">Unwavering Trust</span>. As a thought leader on Climate, Humanities, and Economics, he elevates brands beyond simple promotion.</>,
      p2: <>We don't just offer exposure. We promise <span className="text-accent font-bold">Strategic Communication</span> where your brand philosophy is translated into Tyler's logical, persuasive language, resonating deeply with the "Active Economic Class".</>,
      quote: "Authenticity is the only currency that matters.",
      manifesto: <><span className="block mb-2">Turn Complex Messages into <br className="hidden md:block" />Compelling Narratives</span>Lend <span className="text-accent">Intellectual Authority</span> to Your Brand</>
    },
    dashboard: {
      label: "REAL-TIME IMPACT",
      views: "63M+",
      views_label: "Total YouTube Views",
      reach: "1.5M+",
      reach_label: "Avg. Monthly Reach",
      engagement: "677K+",
      engagement_label: "YouTube Subscribers",
      trust: "TOP 1%",
      trust_label: "Brand Trust Index",
      platform_demography: {
        title: "PLATFORM DEMOGRAPHY",
        tabs: {
          youtube: {
            label: "YOUTUBE",
            tagline: "Intellectual Core",
            gender_label: "Gender: Male 53% / Female 47%",
            gender: { male: 53, female: 47 },
            age_label: "Core Age: 25 - 44 (70%)",
            age_value: "70%",
            insight: "Core purchasing power. Creates immediate reaction to high-involvement products (Tech, Finance, Automotive)."
          },
          instagram: {
            label: "INSTAGRAM",
            tagline: "Cultural Drivers",
            gender_label: "Gender: Female 77% / Male 23%",
            gender: { male: 23, female: 77 },
            age_label: "Core Age: 35 - 44 (Dominant)",
            age_value: "Dominant",
            insight: "Leading trends and lifestyle consumption. High responsiveness to visual-centric goods (Beauty, Fashion, Living)."
          }
        }
      },
      ecosystem: {
        channel_title: "Tylerbolkkayo (Official)",
        personal_title: "Tyler Rasch (Personal)",
        platforms: [
          { name: "YouTube", handle: "@tylerbolkkayo", count: "", icon: "youtube", url: "https://www.youtube.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tylerbolkkayo", count: "", icon: "instagram", url: "https://www.instagram.com/tylerbolkkayo", isChannel: true },
          { name: "TikTok", handle: "@tylerbolkkayo", count: "", icon: "tiktok", url: "https://www.tiktok.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tyleroninsta", count: "", icon: "instagram", url: "https://www.instagram.com/tyleroninsta/" },
          { name: "LinkedIn", handle: "Tyler Rasch", count: "", icon: "linkedin", url: "https://www.linkedin.com/in/tylerrasch/" },
          { name: "X (Twitter)", handle: "@tylerrasch", count: "", icon: "twitter", url: "https://x.com/tylerrasch" },
          { name: "Facebook", handle: "Tyler Rasch", count: "", icon: "facebook", url: "https://www.facebook.com/people/Tyler-Rasch/100011625431145/" }
        ]
      }
    },
    portfolio: {
      originals: {
        heading: "ORIGINAL SERIES",
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
        heading: "BRAND PARTNERSHIP",
        subheading: "Brand philosophies translated into Tyler's logical narratives.",
        items: [
          { client: "SK Telecom", title: "Neuroscience Behind Design", category: "Branded Content", thumbnail: "/portfolio/skt_thumbnail.jpg", url: "https://youtu.be/2WJvdU11OfM?si=Qe9XOS-FQl1Qg2-q" },
          { client: "LG Electronics", title: "Why Koreans Can't Live Without Ice", category: "Branded Content" },
          { client: "Cooper Vision", title: "The Plastic Neutral Economic Model", category: "ESG Campaign" },
          { client: "MOEL", title: "Economy of Shorter Labor Hours", category: "Public Sector" },
          { client: "NOOGI", title: "Ergonomic Cushion Integration", category: "Product Placement" },
          { client: "8APM", title: "Focus Gel for Productive Sessions", category: "Product Placement" }
        ]
      }
    },
    packages: {
      heading: "PARTNERSHIP",
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
        <a href="/" className="font-black text-2xl tracking-tighter leading-none mb-1 text-center md:text-left block hover:opacity-80 transition-opacity">
          <span className="md:hidden">TR</span>
          <span className="hidden md:block">TYLER<br />RASCH<br /><span className="text-accent">MEDIA</span></span>
        </a>
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

const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </svg>
    ),
    tiktok: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    kakao: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.506 1.64 4.708 4.12 6.046l-.82 2.99z" />
        <circle cx="12" cy="11" r="1.5" />
      </svg>
    )
  };
  return icons[name.toLowerCase()] || <span className="w-5 h-5 bg-white/10 rounded-full" />;
};

const ImpactDashboard = ({ t, title }: { t: Content['dashboard'], title: string }) => {
  return (
    <div className="w-full relative z-20 space-y-32">

      {/* 1. Main Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {[
          { label: t.views_label, val: t.views, tag: t.label },
          { label: t.reach_label, val: t.reach, tag: "MONTHLY REACH" },
          { label: t.engagement_label, val: t.engagement, tag: "ENGAGEMENT" },
          { label: t.trust_label, val: t.trust, tag: "RELIABILITY" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className=" glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center hover:border-accent/30 transition-all group"
          >
            <span className="text-accent text-[10px] font-black tracking-[0.3em] mb-4 opacity-50">{item.tag}</span>
            <div className="text-5xl font-black text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">
              {item.val}
            </div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* 2. Platform Demography */}

      {/* Title Block */}
      <div className="mb-20">
        <span className="text-accent text-sm font-bold tracking-[0.4em] uppercase block mb-4">{t.platform_demography.title}</span>
        <div>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">
            {title}
          </h2>
          <div className="w-20 h-1 bg-accent/30 mt-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">

        {/* YouTube Intelligence */}
        <div className="lg:col-span-6 glass p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-accent/20 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF0000]" />
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-3xl font-black text-white italic tracking-tighter">{t.platform_demography.tabs.youtube.label}</h4>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1">{t.platform_demography.tabs.youtube.tagline}</p>
            </div>
            <div className="scale-125"><SocialIcon name="youtube" /></div>
          </div>

          {/* Age & Insight */}
          <div className="mb-10">
            <div className="text-xl font-black text-white mb-2">{t.platform_demography.tabs.youtube.age_label}</div>
            <p className="text-white text-base font-medium leading-relaxed border-l-2 border-red-600 pl-4">
              "{t.platform_demography.tabs.youtube.insight}"
            </p>
          </div>

          {/* Gender Bar */}
          <div>
            <div className="text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wider">{t.platform_demography.tabs.youtube.gender_label}</div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
              <div className="h-full bg-zinc-600 flex items-center justify-center text-[9px] font-bold text-white/50" style={{ width: `${t.platform_demography.tabs.youtube.gender.male}%` }}>M</div>
              <div className="h-full bg-red-600 flex items-center justify-center text-[9px] font-bold text-white/90" style={{ width: `${t.platform_demography.tabs.youtube.gender.female}%` }}>F</div>
            </div>
          </div>
        </div>

        {/* Instagram Intelligence */}
        <div className="lg:col-span-6 glass p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-accent/20 transition-colors">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-3xl font-black text-white italic tracking-tighter">{t.platform_demography.tabs.instagram.label}</h4>
              <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1">{t.platform_demography.tabs.instagram.tagline}</p>
            </div>
            <div className="scale-125"><SocialIcon name="instagram" /></div>
          </div>

          {/* Age & Insight */}
          <div className="mb-10">
            <div className="text-xl font-black text-white mb-2">{t.platform_demography.tabs.instagram.age_label}</div>
            <p className="text-white text-base font-medium leading-relaxed border-l-2 border-pink-500 pl-4">
              "{t.platform_demography.tabs.instagram.insight}"
            </p>
          </div>

          {/* Gender Bar */}
          <div>
            <div className="text-sm font-bold text-zinc-500 mb-3 uppercase tracking-wider">{t.platform_demography.tabs.instagram.gender_label}</div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
              <div className="h-full bg-zinc-600 flex items-center justify-center text-[9px] font-bold text-white/50" style={{ width: `${t.platform_demography.tabs.instagram.gender.male}%` }}>M</div>
              <div className="h-full bg-pink-500 flex items-center justify-center text-[9px] font-bold text-white/90" style={{ width: `${t.platform_demography.tabs.instagram.gender.female}%` }}>F</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Social Media Ecosystem Grid */}
      <div className="px-4 space-y-12">
        <div className="text-center">
          <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.5em] mb-4">SOCIAL MEDIA ECOSYSTEM</h3>
          <div className="h-[1px] w-20 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
          {/* Channel Brand Group */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white italic tracking-tight border-b border-white/5 pb-4">{t.ecosystem.channel_title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.ecosystem.platforms.filter(p => p.isChannel).map((p, i) => (
                <motion.a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-6 h-40 glass rounded-2xl border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-white group-hover:text-accent transition-colors scale-125">
                      <SocialIcon name={p.icon} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-base text-white mb-1">{p.name}</div>
                    <div className="text-xs text-zinc-500 group-hover:text-accent transition-colors font-medium truncate">{p.handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Personal Group */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white italic tracking-tight border-b border-white/5 pb-4">{t.ecosystem.personal_title}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {t.ecosystem.platforms.filter(p => !p.isChannel).map((p, i) => (
                <motion.a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-6 h-40 glass rounded-2xl border border-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center text-center group gap-3"
                >
                  <div className="text-zinc-400 group-hover:text-accent transition-colors scale-125">
                    <SocialIcon name={p.icon} />
                  </div>
                  <div className="w-full">
                    <div className="text-xs font-black text-white mb-1 uppercase tracking-tighter truncate w-full">{p.name}</div>
                    <div className="text-[10px] text-zinc-500 group-hover:text-accent transition-colors font-bold truncate w-full">{p.handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
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

const StickyCTA = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => { // No 'React.' prefix needed if configured correctly, but we'll use standard hook usage
    return scrollY.onChange((latest) => {
      const heroHeight = window.innerHeight * 0.8;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const isPastHero = latest > heroHeight;
      const isBeforeFooter = latest < docHeight - 300; // Hide before hitting very bottom
      setVisible(isPastHero && isBeforeFooter);
    });
  }, [scrollY]);

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <a
        href="#contact"
        className="flex items-center gap-3 pl-6 pr-2 py-2 bg-accent text-black rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all group"
      >
        <span className="font-bold text-sm tracking-widest uppercase my-2 mr-2">{text}</span>
        <div className="w-10 h-10 bg-black text-accent rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        </div>
      </a>
    </div>
  );
};

const MediaKitModal = ({ isOpen, onClose, title, btnText }: { isOpen: boolean, onClose: () => void, title: string, btnText: string }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#0a0f18] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <div className="mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
          <p className="text-zinc-400 text-sm mt-2">Enter your email to receive the full partnership deck instantly.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); alert("Media Kit sent to your email!"); onClose(); }}>
          <input type="email" placeholder="name@company.com" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent mb-4" />
          <button type="submit" className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm">
            {btnText} &rarr;
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <StickyCTA text={t.sidebar.sticky_cta} />
      <MediaKitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.hero.media_kit_cta} btnText={lang === 'KR' ? '받기' : 'Receive Deck'} />

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
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="px-8 py-4 bg-accent text-black font-bold text-sm tracking-widest hover:bg-white transition-colors text-center">
                {t.hero.cta} &rarr;
              </a>
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest hover:bg-white/10 transition-colors text-center">
                {t.hero.media_kit_cta} ↓
              </button>
            </div>
          </motion.div>

          {/* AUDIT: Keep 'tyler_suit_thinking.jpg' as the first one as requested */}
          <SectionBackground src="/headshots/tyler_suit_thinking.jpg" y={yHero} priority={true} />
        </section>

        {/* 2. PHILOSOPHY */}
        <section className="relative py-48 px-8 md:px-20 border-b border-white/5 bg-white/[0.01] overflow-hidden">
          {/* SWITCH: Using tyler_crossed_arms_front.jpg here */}
          <SectionBackground src="/headshots/tyler_crossed_arms_front.jpg" y={yPhil} />
          <div className="max-w-5xl relative z-10">
            <div className="mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">{t.sidebar.vision}</h2>
              <div className="w-20 h-1 bg-accent/30 mt-8" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-lg md:text-xl leading-relaxed text-zinc-400 border-l border-accent/20 pl-8">
              <p className="word-keep-all">{t.philosophy.p1}</p>
              <p className="word-keep-all">{t.philosophy.p2}</p>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5">
              <p className="text-2xl md:text-3xl font-serif italic text-white/80 mb-20 opacity-80">"{t.philosophy.quote}"</p>
              <div className="text-3xl md:text-5xl font-black text-zinc-200 leading-tight uppercase tracking-tighter">
                {t.philosophy.manifesto}
              </div>
            </div>
          </div>
        </section>

        {/* 3. IMPACT DASHBOARD - SIGNIFICANT EXPANSION */}
        <section id="impact" className="relative py-48 px-8 md:px-20 border-b border-white/5 overflow-hidden">
          {/* SWITCH: Using tyler_laughing.jpg here */}
          <SectionBackground src="/headshots/tyler_laughing.jpg" y={yImpact} />
          <div className="relative z-10">
            <ImpactDashboard t={t.dashboard} title={t.sidebar.impact} />
          </div>
        </section>

        {/* 4. ORIGINAL CONTENTS */}
        <section id="originals" className="relative pt-72 pb-48 px-8 md:px-20 border-b border-white/5 overflow-hidden">
          {/* SWITCH: Using tyler_prayer_hands.jpg here */}
          <SectionBackground src="/headshots/tyler_prayer_hands.jpg" y={yOriginals} />
          <div className="mb-20 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">{t.portfolio.originals.heading}</h2>
            <div className="w-20 h-1 bg-accent/30 mt-8" />
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
          {/* SWITCH: Using tyler_crossed_arms_side.jpg here */}
          <SectionBackground src="/headshots/tyler_crossed_arms_side.jpg" y={yBrands} />
          <div className="relative z-10">
            <div className="mb-20">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">{t.portfolio.brands.heading}</h2>
              <p className="text-accent text-sm font-bold uppercase tracking-widest mt-4">{t.portfolio.brands.subheading}</p>
              <div className="w-20 h-1 bg-accent/30 mt-8" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.portfolio.brands.items.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.url}
                  target={item.url ? "_blank" : undefined}
                  rel={item.url ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className={`p-8 bg-zinc-900/40 border border-white/5 hover:border-accent/40 rounded-2xl group transition-all hover:bg-zinc-900/60 block ${item.url ? 'cursor-pointer' : 'cursor-default'}`}
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
                    <div className="h-48 w-full bg-black/40 rounded-lg flex items-center justify-center border border-white/5 overflow-hidden relative">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-zinc-800 font-black text-4xl tracking-tighter select-none opacity-20 uppercase group-hover:opacity-40 transition-opacity">
                          {item.client.split(' ')[0]}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
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
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">{t.packages.heading}</h2>
              <p className="text-accent text-sm font-mono tracking-widest uppercase mt-4">{t.packages.subheading}</p>
              <div className="w-20 h-1 bg-accent/30 mt-8" />
            </div>

            <div className="space-y-24">
              {t.packages.items.map((item, i) => (
                <div key={i} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 border-l-2 border-white/5 pl-8 hover:border-accent transition-colors duration-500">
                  <div className="lg:col-span-4">
                    <span className="text-8xl font-black text-white/15 -ml-4 block -mt-10 mb-4 select-none">0{i + 1}</span>
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
          {/* AUDIT: Using high-impact '20251206_TylerRasch0253_BW.jpg' as requested */}
          <SectionBackground src="/headshots/20251206_TylerRasch0253_BW.jpg" y={yContact} />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="mb-20">
              <div className="flex items-baseline gap-6 mb-8">
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">{t.sidebar.contact}</h2>
                <div className="animate-bounce text-accent text-2xl">↓</div>
              </div>
              <div className="w-20 h-1 bg-accent/30" />
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
