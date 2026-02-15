"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

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
    careers?: string;
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
          summary: string;
        };
        instagram: {
          label: string;
          tagline: string;
          gender_label: string;
          gender: { male: number; female: number };
          age_label: string;
          age_value: string;
          insight: string;
          summary: string;
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
        features?: Guest[];
        featureLabel?: string;
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
  careers?: {
    heading: string;
    subheading: string;
    desc: string;
    values: { title: React.ReactNode; desc: React.ReactNode }[];
    positions: { title: string; desc: React.ReactNode; action: string }[];
  };
};

const contentData: Record<'KR' | 'EN', Content> = {
  KR: {
    sidebar: {
      vision: "비전",
      impact: "미디어 영향력",
      originals: "오리지널 시리즈",
      brands: "브랜드 파트너십",
      packages: "파트너십",
      contact: "문의하기",
      careers: "채용",
      sticky_cta: "타일러와 협업하기"
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
            insight: "경제 활동이 가장 활발한 '구매 핵심층'으로, 테크, 금융, 자동차 등 고관여 제품군에 즉각 반응합니다.",
            summary: "경제 활동이 가장 활발한 '구매 핵심층'"
          },
          instagram: {
            label: "INSTAGRAM",
            tagline: "트렌드 리더",
            gender_label: "Gender: 여성 77% / 남성 23%",
            gender: { male: 23, female: 77 },
            age_label: "Core Age: 35 - 44세 (Dominant)",
            age_value: "Dominant",
            insight: "트렌드와 라이프스타일 소비를 주도하는 핵심 연령층으로, 뷰티, 패션, 리빙 등 비주얼 중심 소비재에 높은 반응률을 보입니다.",
            summary: "트렌드와 라이프스타일 소비를 주도하는 데모그래픽"
          }
        }
      },
      ecosystem: {
        channel_title: "Tylerbolkkayo Channel",
        personal_title: "Tyler Rasch",
        platforms: [
          { name: "YouTube", handle: "@tylerbolkkayo", count: "165K", icon: "youtube", url: "https://www.youtube.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tylerbolkkayo", count: "70K+", icon: "instagram", url: "https://www.instagram.com/tylerbolkkayo", isChannel: true },
          { name: "TikTok", handle: "@tylerbolkkayo", count: "50K+", icon: "tiktok", url: "https://www.tiktok.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tyleroninsta", count: "247K", icon: "instagram", url: "https://www.instagram.com/tyleroninsta/" },
          { name: "Threads", handle: "@tyleroninsta", count: "", icon: "threads", url: "https://www.threads.com/@tyleroninsta" },
          { name: "LinkedIn", handle: "Tyler Rasch", count: "30K+", icon: "linkedin", url: "https://www.linkedin.com/in/tylerrasch/" },
          { name: "X", handle: "@tylerrasch", count: "65K+", icon: "twitter", url: "https://x.com/tylerrasch" },
          { name: "Facebook", handle: "Tyler Rasch", count: "18K+", icon: "facebook", url: "https://www.facebook.com/people/Tyler-Rasch/100011625431145/" }
        ]
      }
    },
    portfolio: {
      originals: {
        heading: "오리지널 시리즈",
        items: [
          {
            title: "Tylerbolkkayo",
            subtitle: "타일러볼까요 본편",
            desc: "세상을 보는 새로운 관점",
            thumbnail: "https://i.ytimg.com/vi/71o3DGhGtXw/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=71o3DGhGtXw",
            features: [
              { name: "세상과 이슈", topic: "글로벌 트렌드와 시사 이슈의 본질", tag: "#GlobalIssues" },
              { name: "관점과 생각", topic: "현상을 읽는 새로운 프레임워크", tag: "#Perspective" },
              { name: "문화와 삶", topic: "다양성 속에서 발견하는 보편적 가치", tag: "#Culture" },
              { name: "언어와 학습", topic: "사고를 확장하는 도구로서의 언어", tag: "#Learning" }
            ],
            featureLabel: "다양한 주제"
          },
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
          { client: "LG Electronics", title: "한국인이 얼음에 집착하는 이유 (Ice Culture)", category: "Branded Content", thumbnail: "/portfolio/lg_thumbnail.jpg", url: "https://www.youtube.com/watch?v=Qzwno5WrXl8" },
          { client: "Cooper Vision", title: "플라스틱 중립: 새로운 경제 모델", category: "ESG Campaign", thumbnail: "/portfolio/cooper_thumbnail.png", url: "https://www.youtube.com/watch?v=vVnqUP0-h8o" },
          { client: "고용노동부", title: "노동시간과 경제 성장의 관계", category: "Public Sector", thumbnail: "/portfolio/moel_thumbnail.png", url: "https://youtu.be/_zrFXYSseMI?si=01QGXlcK_-JqLAaB" },
          { client: "NOOGI", title: "자세를 바로잡는 쿠션 통합 마케팅", category: "Product Placement", thumbnail: "/portfolio/noogi_thumbnail.png", url: "https://youtu.be/Vdx9J0oco4o?si=AcMv88pc7XKIt0V-&t=353" },
          { client: "8APM", title: "몰입을 돕는 포커스 젤 활용 제안", category: "Product Placement", thumbnail: "/portfolio/8apm_thumbnail.png", url: "https://youtu.be/XbTgQWIeTN8?si=o352uQggIJFkPa53&t=51" }
        ]
      }
    },
    packages: {
      heading: "파트너십 패키지",
      subheading: "브랜드의 격을 높이는 전략적 솔루션",
      items: [
        {
          title: "브랜디드 콘텐츠 (프리미엄)",
          subtitle: "Signature Storytelling Content",
          desc: "단순 광고가 아닌, 하나의 완성된 지적 콘텐츠",
          detail: "10분 내외의 본편 영상을 통해 브랜드의 핵심 메시지를 타일러의 시각으로 깊이 있게 분석하고 전달합니다. 시청자가 자발적으로 찾아보고 공유하는 고품격 스토리텔링을 제공합니다."
        },
        {
          title: "PPL (Product Placement)",
          subtitle: "자연스러운 노출 (Seamless Integration)",
          desc: "콘텐츠의 흐름을 방해하지 않는 최적화된 브랜드 노출",
          detail: "콘텐츠의 흐름을 방해하지 않는 최적화된 위치에 광고를 배치합니다. 시청자의 몰입을 유지하면서도, 필요한 순간에 브랜드가 자연스럽게 노출되어 광고 피로도를 최소화합니다. (약 90초 내외 노출)"
        },
        {
          title: "SNS & 숏폼",
          subtitle: "Viral Impact",
          desc: "즉각적인 확산과 도달을 위한 숏폼 전략",
          detail: "인스타그램 릴스와 유튜브 쇼츠를 통해 핵심 메시지를 강렬하게 전달합니다. 2544 핵심 타겟층에게 빠르고 감각적으로 소구하는 고효율 바이럴 솔루션입니다."
        }
      ]
    },
    contact: {
      heading: <>Lead with Authority.<br />Partner with Tyler.</>
    },
    careers: {
      heading: "채용",
      subheading: "지적 영향력을 설계하는 사람들",
      desc: "우리는 조회수 너머의 가치를 만듭니다. 타일러와 함께 미디어의 새로운 기준이 되어주세요.",
      values: [
        { title: "Deep Dive (본질적 탐구)", desc: "표면적인 재미가 아닌, 본질을 꿰뚫는 기획을 지향합니다. '왜?'라는 질문을 멈추지 않는 집요함이 필요합니다." },
        { title: <>Autonomous Growth<br />(자율과 성장)</>, desc: "시키는 일만 하지 않습니다. 스스로 브랜드의 성장을 위한 가설을 세우고, 검증하고, 결과를 만들어냅니다." },
        { title: "Global Standard (글로벌 기준)", desc: "단순한 유튜버 팀이 아닙니다. 글로벌 탑티어 브랜드와 협업하며 업계 최고의 퀄리티를 타협하지 않습니다." }
      ],
      positions: [
        { title: "Head of Content (콘텐츠 총괄)", desc: "타일러볼까요 채널의 'Showrunner'를 찾습니다. 단순 제작을 넘어, 데이터 기반의 성장 전략 수립부터 제작 시스템 총괄, 퀄리티 컨트롤(QC)까지. 타일러의 지적 자산을 가장 매력적인 콘텐츠로 가공하는 최종 책임자입니다.", action: "지원하기" },
        { title: "Head of Community (커뮤니티 총괄)", desc: "구독자를 강력한 '지적 연대'로 변화시킬 설계자(Architect)를 찾습니다. 멤버십 비즈니스 모델을 구축하고, 브랜드 에반젤리스트를 양성하여 자생적이고 결속력 있는 팬덤 생태계를 직접 설계하고 리딩합니다.", action: "지원하기" }
      ]
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
            insight: "Core purchasing power. Creates immediate reaction to high-involvement products (Tech, Finance, Automotive).",
            summary: "A core consumer segment with peak economic activity."
          },
          instagram: {
            label: "INSTAGRAM",
            tagline: "Cultural Drivers",
            gender_label: "Gender: Female 77% / Male 23%",
            gender: { male: 23, female: 77 },
            age_label: "Core Age: 35 - 44 (Dominant)",
            age_value: "Dominant",
            insight: "Leading trends and lifestyle consumption. High responsiveness to visual-centric goods (Beauty, Fashion, Living).",
            summary: "A key demographic leading trends and lifestyle consumption."
          }
        }
      },
      ecosystem: {
        channel_title: "Tylerbolkkayo Channel",
        personal_title: "Tyler Rasch",
        platforms: [
          { name: "YouTube", handle: "@tylerbolkkayo", count: "", icon: "youtube", url: "https://www.youtube.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tylerbolkkayo", count: "", icon: "instagram", url: "https://www.instagram.com/tylerbolkkayo", isChannel: true },
          { name: "TikTok", handle: "@tylerbolkkayo", count: "", icon: "tiktok", url: "https://www.tiktok.com/@tylerbolkkayo", isChannel: true },
          { name: "Instagram", handle: "@tyleroninsta", count: "", icon: "instagram", url: "https://www.instagram.com/tyleroninsta/" },
          { name: "Threads", handle: "@tyleroninsta", count: "", icon: "threads", url: "https://www.threads.com/@tyleroninsta" },
          { name: "LinkedIn", handle: "Tyler Rasch", count: "", icon: "linkedin", url: "https://www.linkedin.com/in/tylerrasch/" },
          { name: "X", handle: "@tylerrasch", count: "", icon: "twitter", url: "https://x.com/tylerrasch" },
          { name: "Facebook", handle: "Tyler Rasch", count: "", icon: "facebook", url: "https://www.facebook.com/people/Tyler-Rasch/100011625431145/" }
        ]
      }
    },
    portfolio: {
      originals: {
        heading: "ORIGINAL SERIES",
        items: [
          {
            title: "Tylerbolkkayo",
            subtitle: "Tylerbolkkayo Main Series",
            desc: "New Perspectives on the World",
            thumbnail: "https://i.ytimg.com/vi/71o3DGhGtXw/hqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=71o3DGhGtXw",
            features: [
              { name: "World & Issues", topic: "Deep dive into global trends", tag: "#GlobalIssues" },
              { name: "Perspectives", topic: "New frameworks for thinking", tag: "#Perspective" },
              { name: "Culture & Life", topic: "Universal values in diversity", tag: "#Culture" },
              { name: "Language", topic: "Tools for expanding thought", tag: "#Learning" }
            ],
            featureLabel: "Topics"
          },
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
          { client: "LG Electronics", title: "Why Koreans Can't Live Without Ice", category: "Branded Content", thumbnail: "/portfolio/lg_thumbnail.jpg", url: "https://www.youtube.com/watch?v=Qzwno5WrXl8" },
          { client: "Cooper Vision", title: "The Plastic Neutral Economic Model", category: "ESG Campaign", thumbnail: "/portfolio/cooper_thumbnail.png", url: "https://www.youtube.com/watch?v=vVnqUP0-h8o" },
          { client: "Ministry of Employment and Labor", title: "Economy of Shorter Labor Hours", category: "Public Sector", thumbnail: "/portfolio/moel_thumbnail.png", url: "https://youtu.be/_zrFXYSseMI?si=01QGXlcK_-JqLAaB" },
          { client: "NOOGI", title: "Ergonomic Cushion Integration", category: "Product Placement", thumbnail: "/portfolio/noogi_thumbnail.png", url: "https://youtu.be/Vdx9J0oco4o?si=AcMv88pc7XKIt0V-&t=353" },
          { client: "8APM", title: "Focus Gel for Productive Sessions", category: "Product Placement", thumbnail: "/portfolio/8apm_thumbnail.png", url: "https://youtu.be/XbTgQWIeTN8?si=o352uQggIJFkPa53&t=51" }
        ]
      }
    },
    packages: {
      heading: "PARTNERSHIP",
      subheading: "Strategic Integration for Industry Leaders",
      items: [
        {
          title: "Branded Contents (Premium)",
          subtitle: "Signature Storytelling Content",
          desc: "Not an Ad, but Intellectual Property.",
          detail: "A dedicated ~10m episode where Tyler deconstructs your brand message through his analytical lens. We create content that viewers actively seek out, ensuring deep engagement and high retention."
        },
        {
          title: "PPL (Product Placement)",
          subtitle: "Seamless Integration",
          desc: "Strategic Exposure that respects the viewer’s focus",
          detail: "Seamless Integration that respects the viewer’s focus. By placing your brand within high-engagement segments, we minimize ad fatigue while maintaining maximum impact. (~90s exposure)"
        },
        {
          title: "Social Network & Short-Form",
          subtitle: "Viral Impact",
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

const Sidebar = ({ lang, setLang, view, setView }: { lang: 'KR' | 'EN', setLang: (l: 'KR' | 'EN') => void, view: 'home' | 'careers', setView: (v: 'home' | 'careers') => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = contentData[lang].sidebar;

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#02060C]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
        <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="font-black text-xl tracking-tighter leading-none text-white cursor-pointer">
          TYLER <span className="text-accent">MEDIA</span>
        </button>
        <div className="flex items-center gap-4">
          {/* Mobile Language Toggle */}
          <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-full relative w-20">
            <motion.div
              animate={{ x: lang === 'EN' ? '100%' : '0%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-accent rounded-full"
            />
            <button
              onClick={() => setLang('KR')}
              className={`relative z-10 flex-1 py-1 text-[10px] font-black transition-colors ${lang === 'KR' ? 'text-black' : 'text-zinc-500'}`}
            >
              KR
            </button>
            <button
              onClick={() => setLang('EN')}
              className={`relative z-10 flex-1 py-1 text-[10px] font-black transition-colors ${lang === 'EN' ? 'text-black' : 'text-zinc-500'}`}
            >
              EN
            </button>
          </div>

          <button onClick={toggleMenu} className="text-white p-2 -mr-2">
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-[#02060C] md:hidden pt-24 px-8"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 text-xl font-bold tracking-widest uppercase">
                {['vision', 'impact', 'originals', 'brands', 'packages', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => { setView('home'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-4 transition-colors ${view === 'home' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-white'}`}
                  >
                    {t[item as keyof typeof t]}
                  </a>
                ))}
                {lang === 'KR' && (
                  <button
                    onClick={() => { setView('careers'); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-4 transition-colors text-left uppercase font-bold tracking-widest ${view === 'careers' ? 'text-accent' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {t.careers}
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR (Persistent) */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 z-50 glass border-r border-white/10 flex-col justify-between py-12 px-8">
        <div>
          <button onClick={() => { setView('home'); window.scrollTo(0, 0); }} className="font-black text-2xl tracking-tighter leading-none mb-1 text-left block hover:opacity-80 transition-opacity cursor-pointer">
            TYLER<br />RASCH<br /><span className="text-accent">MEDIA</span>
          </button>
        </div>

        <div className="flex flex-col gap-8 text-sm font-bold tracking-widest uppercase">
          {['vision', 'impact', 'originals', 'brands', 'packages', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={() => setView('home')}
              className={`flex items-center gap-4 transition-colors group ${view === 'home' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`w-1 h-1 bg-accent rounded-full transition-opacity ${view === 'home' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              <span>{t[item as keyof typeof t]}</span>
            </a>
          ))}
          {lang === 'KR' && (
            <button
              onClick={() => setView('careers')}
              className={`flex items-center gap-4 transition-colors group text-left font-bold tracking-widest uppercase ${view === 'careers' ? 'text-accent' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`w-1 h-1 bg-accent rounded-full transition-opacity ${view === 'careers' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              <span>{t.careers}</span>
            </button>
          )}
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
                className={`relative z-10 flex-1 py-1.5 text-xs font-black transition-colors ${lang === 'KR' ? 'text-black' : 'text-zinc-500'}`}
              >
                KR
              </button>
              <button
                onClick={() => setLang('EN')}
                className={`relative z-10 flex-1 py-1.5 text-xs font-black transition-colors ${lang === 'EN' ? 'text-black' : 'text-zinc-500'}`}
              >
                EN
              </button>
            </div>
          </div>
          <div className="text-[10px] text-zinc-700 px-1">
            © 2026 TRM
          </div>
        </div>
      </nav>
    </>
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
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
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
    ),
    threads: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 192 192">
        <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
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
              {typeof item.val === 'string' ? (
                item.val.split(/(만|\+|%)/).map((part, index) =>
                  ['만', '+', '%'].includes(part) ? (
                    <span key={index} className="text-3xl font-bold mx-0.5">{part}</span>
                  ) : part
                )
              ) : item.val}
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

          {/* Age Group only */}
          <div className="mb-10">
            <div className="text-xl font-black text-white">{t.platform_demography.tabs.youtube.age_label}</div>
          </div>

          {/* Gender Bar */}
          <div>
            <div className="text-xl font-black text-white mb-2">{t.platform_demography.tabs.youtube.gender_label}</div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex mb-6">
              <div className="h-full bg-zinc-600 flex items-center justify-center text-[9px] font-bold text-white/50" style={{ width: `${t.platform_demography.tabs.youtube.gender.male}%` }}>M</div>
              <div className="h-full bg-red-600 flex items-center justify-center text-[9px] font-bold text-white/90" style={{ width: `${t.platform_demography.tabs.youtube.gender.female}%` }}>F</div>
            </div>
            <div className="border-t border-white/5 pt-4">
              <div className="text-white text-sm font-bold tracking-wide border-l-2 border-red-600 pl-4">
                {t.platform_demography.tabs.youtube.summary}
              </div>
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

          {/* Age Group only */}
          <div className="mb-10">
            <div className="text-xl font-black text-white">{t.platform_demography.tabs.instagram.age_label}</div>
          </div>

          {/* Gender Bar */}
          <div>
            <div className="text-xl font-black text-white mb-2">{t.platform_demography.tabs.instagram.gender_label}</div>
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex mb-6">
              <div className="h-full bg-zinc-600 flex items-center justify-center text-[9px] font-bold text-white/50" style={{ width: `${t.platform_demography.tabs.instagram.gender.male}%` }}>M</div>
              <div className="h-full bg-pink-500 flex items-center justify-center text-[9px] font-bold text-white/90" style={{ width: `${t.platform_demography.tabs.instagram.gender.female}%` }}>F</div>
            </div>
            <div className="border-t border-white/5 pt-4">
              <div className="text-white text-sm font-bold tracking-wide border-l-2 border-pink-500 pl-4">
                {t.platform_demography.tabs.instagram.summary}
              </div>
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

        <div className="flex flex-col items-center gap-24">
          {/* Personal Group */}
          <div className="space-y-8 w-full max-w-5xl">
            <h4 className="text-xl font-black text-white italic tracking-tight border-b border-white/5 pb-4 text-center">{t.ecosystem.personal_title}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
              {t.ecosystem.platforms.filter(p => !p.isChannel).map((p, i) => (
                <motion.a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-4 aspect-square w-full max-w-[160px] glass rounded-2xl border border-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center text-center group gap-2"
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

          {/* Channel Brand Group */}
          <div className="space-y-8 w-full max-w-3xl">
            <h4 className="text-xl font-black text-white italic tracking-tight border-b border-white/5 pb-4 text-center">{t.ecosystem.channel_title}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
              {t.ecosystem.platforms.filter(p => p.isChannel).map((p, i) => (
                <motion.a
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="p-4 aspect-square w-full max-w-[160px] glass rounded-2xl border border-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center text-center group gap-2"
                >
                  <div className="text-zinc-400 group-hover:text-accent transition-colors scale-125">
                    <SocialIcon name={p.icon} />
                  </div>
                  <div className="w-full">
                    <div className="text-xs font-black text-white mb-1 uppercase tracking-tighter truncate w-full">{p.name}</div>
                    <div className="text-[10px] text-zinc-500 group-hover:text-accent font-bold truncate w-full">{p.handle}</div>
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
const SectionBackground = ({ src, y, pos = "object-[center_10%]", mobilePos = "object-[center_15%]", priority = false }: { src: string, y: any, pos?: string, mobilePos?: string, priority?: boolean }) => (
  <motion.div
    style={{ y }}
    className="absolute right-0 top-0 bottom-0 w-full md:w-[65%] lg:w-[55%] opacity-[0.8] md:opacity-[0.6] grayscale pointer-events-none z-0 transition-opacity duration-700"
  >
    <Image
      src={src}
      alt="Background Tyler"
      fill
      className={`object-cover ${mobilePos} md:${pos}`}
      priority={priority}
    />
    {/* Responsive gradients to protect face visibility on mobile */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#02060C] via-[#02060C]/30 md:via-[#02060C]/20 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-b from-[#02060C] via-transparent to-[#02060C]" />
  </motion.div>
);

const StickyCTA = ({ text, setView }: { text: string, setView: (v: 'home' | 'careers') => void }) => {
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
        onClick={() => setView('home')}
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

const MediaKitModal = ({ isOpen, onClose, title, btnText, lang }: { isOpen: boolean, onClose: () => void, title: string, btnText: string, lang: 'KR' | 'EN' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      console.log('Lead Captured:', formData);

      // Trigger Download
      const fileName = lang === 'KR' ? 'TylerRasch_MediaKit_2026_KR.pdf' : 'TylerRasch_MediaKit_2026_EN.pdf';
      const link = document.createElement('a');
      link.href = `/assets/docs/${fileName}`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsLoading(false);
      setFormData({ name: '', company: '', email: '' });
      onClose();
    }, 1500);
  };

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
          <p className="text-zinc-400 text-sm mt-2">
            {lang === 'KR' ? '제안서 전문을 확인하기 위해 간단한 정보를 입력해주세요.' : 'Please enter your details to receive the full partnership guide.'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder={lang === 'KR' ? '성함' : 'Name'}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder={lang === 'KR' ? '소속 (회사명)' : 'Company / Organization'}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder={lang === 'KR' ? '이메일 주소' : 'Email Address'}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-accent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                {lang === 'KR' ? 'PDF 다운로드' : 'Download PDF'} &rarr;
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const VideoModal = ({ isOpen, onClose, videoUrl }: { isOpen: boolean, onClose: () => void, videoUrl: string | null }) => {
  if (!isOpen || !videoUrl) return null;
  const videoId = getYouTubeId(videoUrl);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/50 hover:text-white transition-colors bg-black/50 p-2 rounded-full hover:bg-black/80 backdrop-blur-sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </motion.div>
    </div>
  );
};

const BrandLogoWall = () => {
  const partners = [
    { name: "SK Telecom", logo: "/partners/sk_telecom_new.png" },
    { name: "Maxim", logo: "/partners/media__1771143610825.png" },
    { name: "LG Electronics", logo: "/partners/media__1771143613583.png" },
    { name: "3M", logo: "/partners/3m_new.png" },
    { name: "고용노동부", logo: "/partners/media__1771143619967.png" },
    { name: "NOOGI", logo: "/partners/media__1771143764734.png" },
    { name: "8APM", logo: "/partners/media__1771143767907.png" },
    { name: "Breezm", logo: "/partners/media__1771143782118.png" },
    { name: "Nicorette", logo: "/partners/nicorette_new.png" },
    { name: "LG U+", logo: "/partners/media__1771143772354.png" },
    { name: "NordVPN", logo: "/partners/media__1771143775321.png" },
    { name: "CooperVision", logo: "/partners/coopervision_new.png" }
  ];

  return (
    <div className="mt-32 pt-20 border-t border-white/5">
      <p className="text-[12px] font-bold text-accent/40 tracking-[0.4em] uppercase mb-16 text-center">Trusted Partners</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center justify-items-center">
        {partners.map((brand, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1 }}
            className="relative w-32 h-12 opacity-30 hover:opacity-100 transition-all duration-500 cursor-default"
            style={{
              filter: 'brightness(0) saturate(100%) invert(64%) sepia(91%) saturate(2847%) hue-rotate(145deg) brightness(105%) contrast(102%)'
            }}
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              fill
              className="object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');
  const [view, setView] = useState<'home' | 'careers'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const t = contentData[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

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
      <Sidebar lang={lang} setLang={setLang} view={view} setView={setView} />
      <StickyCTA text={t.sidebar.sticky_cta} setView={setView} />
      <MediaKitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.hero.media_kit_cta} btnText={lang === 'KR' ? '받기' : 'Receive Deck'} lang={lang} />
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo} />

      <main className="pt-16 md:pt-0 pl-0 md:pl-64">
        {view === 'home' ? (
          <>

            {/* 1. HERO section */}
            <section id="vision" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,229,255,0.05)_0%,transparent_50%)]" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl"
              >
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
              <SectionBackground src="/headshots/tyler_suit_thinking.jpg" y={yHero} priority={true} mobilePos="object-[center_10%]" />
            </section>

            {/* 2. PHILOSOPHY */}
            <section className="relative py-48 px-8 md:px-20 border-b border-white/5 bg-white/[0.01] overflow-hidden">
              {/* SWITCH: Using tyler_crossed_arms_front.jpg here */}
              <SectionBackground src="/headshots/tyler_crossed_arms_front.jpg" y={yPhil} mobilePos="object-[center_5%]" />
              <div className="max-w-5xl relative z-10">
                <div className="mb-20">
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic break-keep">{t.sidebar.vision}</h2>
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
              <SectionBackground src="/headshots/tyler_laughing.jpg" y={yImpact} mobilePos="object-[center_10%]" />
              <div className="relative z-10">
                <ImpactDashboard t={t.dashboard} title={t.sidebar.impact} />
              </div>
            </section>

            {/* 4. ORIGINAL CONTENTS */}
            <section id="originals" className="relative pt-72 pb-48 px-8 md:px-20 border-b border-white/5 overflow-hidden">
              {/* SWITCH: Using tyler_prayer_hands.jpg here */}
              <SectionBackground src="/headshots/tyler_prayer_hands.jpg" y={yOriginals} mobilePos="object-[center_5%]" />
              <div className="mb-20 relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic break-keep">{t.portfolio.originals.heading}</h2>
                <div className="w-20 h-1 bg-accent/30 mt-8" />
              </div>

              <div className="grid grid-cols-1 gap-24 relative z-10">
                {t.portfolio.originals.items.map((item, i) => (
                  <div key={i} className="grid grid-cols-1 xl:grid-cols-[0.8fr_1.2fr] gap-12 xl:gap-20 items-start">
                    <motion.div
                      onClick={() => item.videoUrl && setSelectedVideo(item.videoUrl)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl block cursor-pointer"
                    >
                      <Image src={item.thumbnail} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized={item.thumbnail.startsWith('http')} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <span className="text-white font-bold text-sm">&rarr; WATCH PREVIEW</span>
                      </div>
                    </motion.div>

                    <div className="space-y-8">
                      <div>
                        <span className="text-accent text-sm font-bold tracking-[0.3em] uppercase block mb-4">{item.subtitle}</span>
                        <h3 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 italic">{item.title}</h3>
                        <p className="text-zinc-400 text-xl leading-relaxed max-w-xl">{item.desc}</p>
                      </div>

                      {(item.guests || item.features) && (
                        <div className="space-y-4">
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            {item.featureLabel || "Featured Guests & Topics"}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(item.guests || item.features)?.map((feature: any, idx: number) => (
                              <div key={idx} className="p-4 glass rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                  <span className="text-white font-bold">{feature?.name}</span>
                                  <span className="text-xs text-accent font-mono">{feature?.tag}</span>
                                </div>
                                <p className="text-xs text-zinc-500">{feature?.topic}</p>
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
              <SectionBackground src="/headshots/tyler_crossed_arms_side.jpg" y={yBrands} mobilePos="object-[center_10%]" />
              <div className="relative z-10">
                <div className="mb-20">
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic break-keep">{t.portfolio.brands.heading}</h2>
                  <p className="text-accent text-sm font-bold uppercase tracking-widest mt-4">{t.portfolio.brands.subheading}</p>
                  <div className="w-20 h-1 bg-accent/30 mt-8" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {t.portfolio.brands.items.map((item, i) => (
                    <motion.div
                      key={i}
                      onClick={() => item.url && setSelectedVideo(item.url)}
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
                        <div className="aspect-video w-full bg-black/40 rounded-lg flex items-center justify-center border border-white/5 overflow-hidden relative">
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
                    </motion.div>
                  ))}
                </div>
                <BrandLogoWall />
              </div>
            </section>

            {/* 6. PARTNERSHIP PACKAGES */}
            <section id="packages" className="relative py-48 px-8 md:px-20 border-b border-white/5 overflow-hidden bg-white/[0.01]">
              {/* AUDIT: Using unique '20251206_TylerRasch0425_BW.jpg' */}
              <SectionBackground src="/headshots/20251206_TylerRasch0425_BW.jpg" y={yPackages} mobilePos="object-[center_10%]" />
              <div className="relative z-10">
                <div className="mb-20">
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic break-keep">{t.packages.heading}</h2>
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
              <SectionBackground src="/headshots/20251206_TylerRasch0253_BW.jpg" y={yContact} mobilePos="object-[center_10%]" />
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
          </>
        ) : (
          /* CAREERS VIEW (KOREAN ONLY) */
          lang === 'KR' && t.careers && (
            <section className="relative min-h-screen py-32 px-8 md:px-20 bg-[#02060C] overflow-hidden">
              <SectionBackground src="/headshots/tyler_suit_thinking.jpg" y={yHero} priority={true} mobilePos="object-[center_10%]" />
              <div className="relative z-10 max-w-6xl mx-auto">
                <div className="mb-20">
                  <span className="text-accent text-sm font-bold tracking-[0.4em] uppercase block mb-4">Careers</span>
                  <h2 className="text-5xl md:text-8xl font-black text-white leading-none uppercase tracking-tighter italic break-keep">{t.careers.heading}</h2>
                  <div className="w-20 h-1 bg-accent/30 mt-8" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
                  <div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep tracking-tight">{t.careers.subheading}</h3>
                    <p className="text-xl text-zinc-400 break-keep leading-relaxed">{t.careers.desc}</p>
                  </div>
                </div>

                {/* Core Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                  {t.careers.values.map((value: any, i: number) => (
                    <div key={i} className="p-8 border border-white/10 bg-white/5 rounded-3xl hover:border-accent/30 transition-all hover:-translate-y-1 duration-300">
                      <h4 className="text-xl font-bold text-white mb-4">{value.title}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed break-keep">{value.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Open Positions */}
                <div className="space-y-8">
                  {t.careers.positions.map((pos: any, i: number) => (
                    <div key={i} className="p-10 border border-white/10 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-accent/50 transition-all bg-white/[0.02] hover:bg-white/[0.04]">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">{pos.title}</h4>
                        <p className="text-zinc-400 max-w-2xl break-keep">{pos.desc}</p>
                      </div>
                      <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-accent transition-colors whitespace-nowrap">
                        {pos.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        )}
      </main>
    </div>
  );
}
