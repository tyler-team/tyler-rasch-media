"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SMEStartupProgramView from "../components/SMEStartupProgramView";
import PressBlogSection from "../components/PressBlogSection";
import PressView from "../components/PressView";
import BlogView from "../components/BlogView";
import CareersInternshipView from "../components/CareersInternshipView";

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
    "sme-startup-program"?: string;
    press?: string;
    blog?: string;
    sticky_cta: string;
  };
  hero: {
    label: string;
    title_span: string;
    subtitle: string;
    description: React.ReactNode;
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
    growth?: string;
    growth_label?: string;
    trust: string;
    trust_label: string;
    trust_tag?: string;
    source_note?: string;
    platform_demography: {
      title: string;
      synergy_badge?: string;
      synergy_title?: string;
      synergy_desc?: string;
      synergy_yt_title?: string;
      synergy_yt_stat?: string;
      synergy_yt_target?: string;
      synergy_ig_title?: string;
      synergy_ig_stat?: string;
      synergy_ig_target?: string;
      cross_amplifier?: string;
      tabs: {
        youtube: {
          label: string;
          tagline: string;
          audience_type?: string;
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
          audience_type?: string;
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
      really_tyler_title?: string;
      platforms: {
        name: string;
        handle: string;
        count: string;
        icon: string;
        url: string;
        category?: 'personal' | '1bws' | 'really_tyler';
        isChannel?: boolean;
      }[];
    };
  };
  portfolio: {
    originals: {
      heading: string;
      subheading?: string;
      filter_all?: string;
      filter_1bws?: string;
      filter_really_tyler?: string;
      items: {
        title: string;
        subtitle: string;
        channel?: '1bws' | 'really_tyler';
        channelLabel?: string;
        desc: React.ReactNode;
        thumbnail: string;
        videoUrl?: string;
        tags?: string[];
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
    guide?: string;
    includesLabel?: string;
    recommendedLabel?: string;
    items: {
      title: string;
      subtitle: string;
      desc: React.ReactNode;
      includes?: string;
      recommendedFor?: string;
      detail?: string;
      tags?: string[];
    }[];
  };
  contact: {
    heading: React.ReactNode;
    intro?: string;
    tallyFormId?: string;
  };
  careers?: {
    heading: string;
    subheading: React.ReactNode;
    desc: React.ReactNode;
    values: { title: React.ReactNode; desc: React.ReactNode }[];
    positions: {
      title: string;
      desc: React.ReactNode;
      action: string;
      details?: {
        responsibilities: { label: string; items: string[] };
        qualifications: { label: string; items: string[] };
        preferred: { label: string; items: string[] };
        workInfo: { label: string; items: { label: string; value: string }[] };
      }
    }[];
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
      "sme-startup-program": "SME/스타트업 지원",
      press: "보도자료",
      blog: "블로그 & 에세이",
      sticky_cta: "타일러와 협업하기"
    },
    hero: {
      label: "STRATEGIC PARTNERSHIP",
      title_span: "RASCH",
      subtitle: "지적 아이콘 • 브랜드에 지성을 더하는 목소리",
      description: (
        <>
          타일러 라쉬는 단순한 방송인이 아닙니다. 대한민국에서 가장 신뢰받는 외국인 지식인이자,
          <br />
          브랜드의 메시지에 &apos;지적 권위&apos;를 부여하는 독보적인 미디어 솔루션입니다.
        </>
      ),
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
      label: "핵심 지표 (2026 기준)",
      views: "9,900만+",
      views_label: "누적 유튜브 조회수",
      reach: "180만+",
      reach_label: "월간 오디언스 도달",
      engagement: "87.7만+",
      engagement_label: "1BWS 유튜브 채널 구독자",
      growth: "+32만+",
      growth_label: "최근 12개월 순증 +32만",
      trust: "60%",
      trust_label: "25–54세 핵심 경제활동층",
      trust_tag: "핵심 타깃",
      source_note: "* 데이터 출처: YouTube Studio · Instagram Insights (2026년 기준)",
      platform_demography: {
        title: "PLATFORM DEMOGRAPHY",
        synergy_badge: "360° TOTAL AUDIENCE SYNERGY",
        synergy_title: "경제 의사결정층과 라이프스타일 소비층, 한 번에 도달합니다.",
        synergy_desc: "원빅월드쇼 유튜브(남성 63% · 여성 37%의 균형 잡힌 25-54 핵심 경제활동 인구)와 타일러 인스타그램(여성 77%, 35-44 트렌드 리더)의 상호보완적 결합으로, 테크·금융·비즈니스 의사결정권자부터 프리미엄 F&B, 뷰티, 라이프스타일 소비 주도층까지 성별과 세대의 장벽 없이 전방위로 타겟팅할 수 있는 독보적인 미디어 생태계를 구축합니다.",
        synergy_yt_title: "원빅월드쇼 유튜브 엔진",
        synergy_yt_stat: "25-54 핵심 경제인구 60% · 남녀 6:4 균형 (남성 63% / 여성 37%)",
        synergy_yt_target: "가계 소비 & 기업 투자 의사결정권자 · 테크/금융/B2B/비즈니스",
        synergy_ig_title: "타일러 인스타그램 엔진",
        synergy_ig_stat: "여성 77% · 35-44세 트렌드 리더층",
        synergy_ig_target: "F&B · 뷰티 · 패션 · 리빙 · 감각적 라이프스타일 소비재",
        cross_amplifier: "타일러 라쉬 공식 인스타그램(@tylerrasch, 여성 77% 중심의 강력한 문화 소비력)과 각 채널별 숏폼 네트워크가 1BWS와 리얼리 타일러의 콘텐츠를 소셜 전반에 크로스 증폭시킵니다.",
        tabs: {
          youtube: {
            label: "ONE BIG WORLD SHOW",
            tagline: "글로벌 지정학, 매크로 경제 & 테크 인사이트",
            audience_type: "지적 오디언스 & 비즈니스 리더십",
            gender_label: "Gender: 남성 63% / 여성 37%",
            gender: { male: 63, female: 37 },
            age_label: "Core Age: 25 - 54세 중심 (60%) / 35 - 64세 확장 (66.5%)",
            age_value: "60%",
            insight: "사회·경제적 실권을 쥐고 가계와 기업의 투자를 주도하는 25-54 핵심 경제활동 인구",
            summary: "사회·경제적 실권을 쥐고 가계와 기업의 투자를 주도하는 25-54 핵심 경제활동 인구"
          },
          instagram: {
            label: "REALLY TYLER",
            tagline: "글로벌 라이프스타일, 언어 마인드셋 & 컬처 큐레이션",
            audience_type: "라이프스타일, 언어 & 트렌드 소비층",
            gender_label: "Gender: 여성 중심 (라이프스타일 소비 타깃)",
            gender: { male: 30, female: 70 },
            age_label: "Core Age: 20 - 44세 영프로페셔널 & 트렌드 소비 주도층",
            age_value: "Dominant",
            insight: "취향과 문화, 미식과 라이프스타일 트렌드를 선도하는 대중적 소비 주도층",
            summary: "취향과 문화, 미식과 라이프스타일 트렌드를 선도하는 대중적 소비 주도층"
          }
        }
      },
      ecosystem: {
        channel_title: "1BWS / One Big World Show",
        personal_title: "Tyler Rasch",
        really_tyler_title: "Really Tyler",
        platforms: [
          { name: "YouTube", handle: "@원빅월드쇼", count: "877K", icon: "youtube", url: "https://www.youtube.com/@원빅월드쇼", category: "1bws", isChannel: true },
          { name: "Instagram", handle: "@onebigworldshow", count: "", icon: "instagram", url: "https://www.instagram.com/onebigworldshow", category: "1bws", isChannel: true },
          { name: "TikTok", handle: "@onebigworldshow", count: "", icon: "tiktok", url: "https://www.tiktok.com/@onebigworldshow", category: "1bws", isChannel: true },
          { name: "YouTube", handle: "@reallytylerofficial", count: "8.2K", icon: "youtube", url: "https://www.youtube.com/@reallytylerofficial", category: "really_tyler" },
          { name: "Instagram", handle: "@reallytylerofficial", count: "", icon: "instagram", url: "https://www.instagram.com/reallytylerofficial/", category: "really_tyler" },
          { name: "TikTok", handle: "@reallytylerofficial", count: "", icon: "tiktok", url: "https://www.tiktok.com/@reallytylerofficial", category: "really_tyler" },
          { name: "Instagram", handle: "@tyleroninsta", count: "247K", icon: "instagram", url: "https://www.instagram.com/tyleroninsta/", category: "personal" },
          { name: "Threads", handle: "@tyleroninsta", count: "", icon: "threads", url: "https://www.threads.com/@tyleroninsta", category: "personal" },
          { name: "LinkedIn", handle: "Tyler Rasch", count: "30K+", icon: "linkedin", url: "https://www.linkedin.com/in/tylerrasch/", category: "personal" },
          { name: "X", handle: "@tylerrasch", count: "65K+", icon: "twitter", url: "https://x.com/tylerrasch", category: "personal" },
          { name: "Facebook", handle: "Tyler Rasch", count: "18K+", icon: "facebook", url: "https://www.facebook.com/people/Tyler-Rasch/100011625431145/", category: "personal" }
        ]
      }
    },
    portfolio: {
      originals: {
        heading: "오리지널 시리즈",
        subheading: "지적 담론(1BWS)부터 라이프스타일 & 언어(Really Tyler)까지 아우르는 4대 오리지널 라인업",
        filter_all: "전체 보기 (4)",
        filter_1bws: "원빅월드쇼 (2)",
        filter_really_tyler: "리얼리 타일러 (2)",
        items: [
          {
            title: "1BWS Talking Head",
            subtitle: "지정학 · 거시경제 · 테크 심층 분석",
            channel: "1bws",
            channelLabel: "ONE BIG WORLD SHOW",
            desc: "글로벌 경제, 첨단 테크, 지정학적 패권 경쟁과 국제 이슈의 거대한 판을 읽어내는 타일러의 심층 인사이트",
            thumbnail: "https://i.ytimg.com/vi/FNkI37iEbt0/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=FNkI37iEbt0",
            tags: ["#지정학", "#세계이슈", "#거시경제", "#테크트렌드", "#국제질서", "#미래전망"]
          },
          {
            title: "1BWS Podcast",
            subtitle: "세계 이슈와 일상의 대화",
            channel: "1bws",
            channelLabel: "ONE BIG WORLD SHOW",
            desc: "멀게만 느껴지는 거대한 글로벌 이슈, 경제, 테크 변화가 우리의 일상과 지갑에 어떤 영향을 미치는지 편안하고 솔직하게 풀어내는 캐주얼 토크",
            thumbnail: "https://i.ytimg.com/vi/egCLFB75zkM/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=egCLFB75zkM",
            tags: ["#세계이슈", "#일상과경제", "#테크", "#지정학", "#캐주얼토크", "#삶의맥락"]
          },
          {
            title: "Really Tyler: Language",
            subtitle: "언어 & 영어 마인드셋",
            channel: "really_tyler",
            channelLabel: "REALLY TYLER",
            desc: "단순 암기식 영어를 넘어, 다국어 구사자 타일러가 제안하는 진짜 소통을 위한 언어 접근법과 영어 마인드셋",
            thumbnail: "https://i.ytimg.com/vi/U2lzr4lgkC8/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=U2lzr4lgkC8",
            tags: ["#외국어공부", "#영어회화", "#다국어", "#언어학습", "#타일러영어", "#소통의기술"]
          },
          {
            title: "Really Tyler: Life & Stories",
            subtitle: "일상, 라이프스타일 & 다양한 이야기",
            channel: "really_tyler",
            channelLabel: "REALLY TYLER",
            desc: "소소한 일상 브이로그부터 요리와 미식 탐방, 새로운 경험과 취향의 발견, 그리고 국내외 여행까지. 타일러의 삶과 다채로운 이야기들을 솔직하고 풍성하게 담아내는 라이프스타일 콘텐츠",
            thumbnail: "https://i.ytimg.com/vi/n_kYQr50cEE/maxresdefault.jpg",
            videoUrl: "https://youtu.be/n_kYQr50cEE",
            tags: ["#타일러일상", "#데일리로그", "#미식과요리", "#국내외여행", "#라이프스타일"]
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
      heading: "파트너십 (PARTNERSHIP)",
      subheading: "단순 노출을 넘어선 설득과 전환. 브랜드의 마케팅·PR 목표에 최적화된 협업 방식을 제안합니다.",
      guide: "캠페인 일정 및 마케팅 목표에 맞춘 포맷별 번들링(단독 기획, 팟캐스트 호스트 리드, 에피소드 분할 집행 등)이 가능합니다. 프로젝트의 목적에 맞는 최적의 파트너십 구조를 제안해 드립니다.",
      includesLabel: "포함 구성",
      recommendedLabel: "추천 목적",
      items: [
        {
          title: "브랜디드 스토리텔링",
          subtitle: "BRANDED SERIES & SPECIALS",
          desc: "설명이 필요한 복잡한 기술, 브랜드의 진짜 가치와 기업 비전을 타일러의 언어로 쉽고 명확하게 풀어냅니다.\n10~15분 본편 전체가 브랜드의 핵심 아젠다를 깊이 있게 조명하여, 신제품 런칭은 물론 기업 홍보(PR)와 IR 브랜딩에서 높은 신뢰와 오디언스 몰입을 이끌어냅니다.",
          includes: "본편 1편 단독 기획 + 쇼츠(Shorts) 재가공 클립 번들 + 커뮤니티 홍보 탭 포스팅 지원",
          recommendedFor: "기업 홍보 및 IR/PR, 신제품/신기술 런칭, B2B·테크 솔루션, 브랜드 철학 전달",
          tags: ["기업홍보및IR", "신제품신기술런칭", "B2B테크솔루션"]
        },
        {
          title: "맥락형 PPL & 스폰서십",
          subtitle: "SEAMLESS PPL & SPONSORSHIP",
          desc: "광고의 거부감을 없애고, 콘텐츠의 대화 흐름 속에 제품을 가장 자연스럽게 녹여냅니다.\n타일러의 공신력 있는 구두 추천과 스튜디오 실물 노출, 고정 댓글 링크를 통해 실질적인 유입과 구매 전환을 만듭니다.",
          includes: "30~90초 호스트 리드 세그먼트 + 스튜디오 실물 노출 + 유튜브 타임라인 챕터 표기 & 고정 댓글 공식 링크",
          recommendedFor: "앱 서비스 및 플랫폼, 라이프스타일/F&B 소비재, 프로모션 링크 유입",
          tags: ["제품앱서비스", "타깃클릭전환", "합리적스폰서십"]
        },
        {
          title: "스페셜 인터뷰 & 멀티 확산",
          subtitle: "SPECIAL INTERVIEW & VIRAL",
          desc: "글로벌 기업가부터 세계적인 베스트셀러 작가, 저널리스트, 오피니언 리더, 크리에이터, 셀럽과의 1:1 심층 대담을 진행합니다.\n한국어·영어 Bilingual 모더레이팅으로 인터뷰 게스트와 브랜드의 공신력을 극대화하고, 핵심 하이라이트를 릴스·쇼츠·틱톡으로 크로스 바이럴합니다.",
          includes: "1:1 Bilingual 대담 본편 + 유튜브 Shorts · 인스타 Reels · 틱톡 멀티플랫폼 숏폼 확산",
          recommendedFor: "글로벌 명사/셀럽 협업, 브랜드 아젠다 선점, CEO/인물 브랜딩, 숏폼 도달 극대화",
          tags: ["글로벌명사인터뷰", "Bilingual대담", "숏폼옴니채널"]
        }
      ]
    },
    contact: {
      heading: <>Lead with Authority.<br />Partner with Tyler.</>,
      tallyFormId: "A7qA7W"
    },
    careers: {
      heading: "CAREERS",
      subheading: <>Tyler Brand is a business.<br />We do not accept mediocrity.</>,
      desc: <>
        타일러 라쉬(Tyler Rasch)는 단순한 유튜버나 인플루언서 브랜드가 아닙니다. 우리는 타일러의 독보적인 시선(언어, 문화, 시스템)을 바탕으로 세상을 해석하고, 이를 글로벌 미디어 비즈니스로 확장해 나가는 팀입니다.
        <br /><br />
        우리는 안정을 쫓는 사람보다 변화와 성장을 갈망하는 ‘빌더(Builder)’를 찾습니다. 두려움 없이 실험하고, 활발하게 협업하며, 높은 기준(High Standard)으로 시장에 임팩트를 남길 준비가 되셨다면 지금 바로 합류하세요.
      </>,
      values: [
        { title: "Deep Dive (본질적 탐구)", desc: "표면적인 재미가 아닌, 본질을 꿰뚫는 기획을 지향합니다. '왜?'라는 질문을 멈추지 않는 집요함이 필요합니다." },
        { title: <>Autonomous Growth<br />(자율과 성장)</>, desc: "시키는 일만 하지 않습니다. 스스로 브랜드의 성장을 위한 가설을 세우고, 검증하고, 결과를 만들어냅니다." },
        { title: "Global Standard (글로벌 기준)", desc: "단순한 유튜버 팀이 아닙니다. 글로벌 탑티어 브랜드와 협업하며 업계 최고의 퀄리티를 타협하지 않습니다." }
      ],
      positions: [
        {
          "title": "CONTENT LEAD (콘텐츠 리드)",
          "desc": <>단순한 PD가 아닌, 타일러 IP 세계관을 총괄할 ‘쇼러너(Showrunner)’를 찾습니다. 기획부터 제작, 발행까지의 A to Z를 리딩하며, 트래픽 소스(Traffic Source)와 이탈 구간을 분석하는 그로스 해킹(Growth Hacking) 역량을 갖춰야 합니다. AI와 데이터를 기반으로 한국과 글로벌 트렌드를 동시에 포착하고, 하나의 콘텐츠를 블로그, 팟캐스트 등 다양한 포맷으로 재가공하는 OSMU 전략을 통해 브랜드 가치를 극대화해 주십시오.</>,
          "action": "지원하기",
          "details": {
            "responsibilities": {
              "label": "주요 업무",
              "items": [
                "<1BWS / One Big World Show> 채널의 롱폼/숏폼 등 모든 콘텐츠 기획 및 제작 파이프라인 총괄",
                "유튜브 업로드 전략 수립 (제목/카피라이팅 기획, 썸네일 콘셉트 도출, 메타데이터 및 SEO 최적화)",
                "내/외부 인력(편집팀 등)의 스케줄링 관리 및 타일러 브랜드 톤앤매너(\"Deep, yet Fun\")에 맞춘 최종 퀄리티 컨트롤(QC)",
                "AI 툴(Gemini, ChatGPT 등)을 적극 활용한 스크립트 작성, 기획안 도출 및 업무 효율화",
                "시청 지속 시간 및 클릭률 향상을 위한 훅(Hook) 지속 연구 및 신규 포맷 개발",
                "하나의 콘텐츠를 숏폼, 팟캐스트, 뉴스레터 등으로 확장하는 OSMU 전략 수립 및 실행"
              ]
            },
            "qualifications": {
              "label": "자격 요건",
              "items": [
                "뉴미디어/유튜브 채널 콘텐츠 기획, 제작, 채널 운영 리드 경험을 보유하신 분 (최소 2년 이상)",
                "유튜브 알고리즘, 제목/썸네일/SEO가 트래픽에 미치는 영향력을 깊이 이해하고 계신 분",
                "영상 기획부터 촬영, 후반작업 까지 프로덕션 전반의 프로세스를 꿰뚫고 계신 분",
                "타일러 브랜드의 철학과 높은 퀄리티 스탠다드를 유지하며, 작업자들과 원활히 소통할 수 있는 분"
              ]
            },
            "preferred": {
              "label": "우대 사항",
              "items": [
                "100만 구독자 이상의 대형 채널 운영 및 다수의 프로젝트를 조율해 본 PM 경험자",
                "IP(지식재산권) 기반의 비즈니스 확장 경험이 있으신 분",
                "탁월한 카피라이팅 기획 감각을 보유하신 분"
              ]
            },
            "workInfo": {
              "label": "근무 형태 및 보상",
              "items": [
                {
                  "label": "근무 형태",
                  "value": "풀타임 계약직, 정규직 전환 가능"
                },
                {
                  "label": "근무 방식",
                  "value": "하이브리드 근무 (재택 + 오피스 출근 병행). 성과 중심의 자율 근무제를 지향하며, 업무의 효율성에 맞춰 유연하게 조정합니다."
                },
                {
                  "label": "근무지",
                  "value": "서울특별시 영등포구"
                },
                {
                  "label": "급여 및 보상",
                  "value": "지원자의 경력과 역량을 고려하여 합리적이고 경쟁력 있는 기본급을 책정하며, 채널 및 비즈니스 성장에 기여한 임팩트에 비례하는 성과급 구조를 별도로 협의합니다."
                }
              ]
            }
          }
        },
        {
          "title": "COMMUNITY LEAD (커뮤니티 리드)",
          "desc": <>구독자를 팬덤으로, 팬덤을 ‘타일러쉽(Tylership)’이라는 견고한 생태계로 진화시킬 ‘관계의 건축가’를 찾습니다. 온/오프라인을 넘나드는 리추얼(Ritual)과 밋업을 설계하여 소속감을 고취하고, 커뮤니티의 목소리(VOC)를 비즈니스에 반영하는 피드백 루프를 구축해야 합니다. 단순 관리를 넘어 멤버십의 가치 제안(Value Proposition)을 설계하고, 브랜드의 철학을 자발적으로 전파하는 충성 고객군(Evangelist)을 양성하는 전략가입니다.</>,
          "action": "지원하기",
          "details": {
            "responsibilities": {
              "label": "주요 업무",
              "items": [
                "신규 프리미엄 멤버십 ‘타일러쉽(Tylership)’의 등급별 가치 제안(Value Proposition) 설계 및 운영",
                "팬덤을 충성 고객군(Evangelist)으로 전환시키기 위한 온/오프라인 이벤트, 밋업, 캠페인 기획 총괄",
                "커뮤니티 여론 및 VOC(Voice of Customer) 분석을 통한 실시간 피드백 루프 구축",
                "이탈률(Churn rate) 방어 및 커뮤니티 내 크고 작은 갈등 요소 사전 관리",
                "멤버십 기반의 독자적인 수익화 모델 기획 및 실행"
              ]
            },
            "qualifications": {
              "label": "자격 요건",
              "items": [
                "팬덤 비즈니스, 커뮤니티 매니징, 혹은 CRM 기획/운영 경험을 보유하신 분 (최소 3년 이상)",
                "온/오프라인을 아우르는 행사 기획력과 실행력을 갖추신 분",
                "복잡한 이해관계자들 사이에서 갈등을 중재하고 해결하는 뛰어난 외교적 소통 능력",
                "무(無)에서 유(Y)를 만드는 인프라 초기 셋업 경험이 있으신 분"
              ]
            },
            "preferred": {
              "label": "우대 사항",
              "items": [
                "유료 구독/멤버십 서비스 런칭 및 운영 경험자",
                "대규모 오프라인 이벤트(팬미팅, 컨퍼런스 등) PM 경험자"
              ]
            },
            "workInfo": {
              "label": "근무 형태 및 보상",
              "items": [
                {
                  "label": "근무 형태",
                  "value": "풀타임 계약직, 정규직 전환 가능"
                },
                {
                  "label": "근무 방식",
                  "value": "하이브리드 근무 (재택 + 오피스 출근 병행). 성과 중심의 자율 근무제를 지향하며, 업무의 효율성에 맞춰 유연하게 조정합니다."
                },
                {
                  "label": "근무지",
                  "value": "서울특별시 영등포구"
                },
                {
                  "label": "급여 및 보상",
                  "value": "지원자의 경력과 역량을 고려하여 합리적이고 경쟁력 있는 기본급을 책정하며, 채널 및 비즈니스 성장에 기여한 임팩트에 비례하는 성과급 구조를 별도로 협의합니다."
                }
              ]
            }
          }
        },
        {
          "title": "DATA & TRENDS LEAD (데이터 & 트렌드 리드)",
          "desc": <>직감이 아닌 객관적 지표(ROI, LTV 등)로 의사결정을 지원할 ‘비즈니스 인텔리전스(BI) 파트너’입니다. 매의 눈으로 채널 데이터와 경쟁사를 분석하여 성공 방정식을 도출하고, 복잡한 데이터를 직관적인 인사이트로 시각화해 팀의 나침반 역할을 수행합니다. 알고리즘 변화와 글로벌 미디어 트렌드를 감지하여 타일러 브랜드가 선점해야 할 새로운 니치(Niche) 시장을 발굴해 주십시오.</>,
          "action": "지원하기",
          "details": {
            "responsibilities": {
              "label": "주요 업무",
              "items": [
                "유튜브 채널 리포트, 멤버십 가입률, 유입 경로 등 자사 비즈니스 데이터의 정밀 분석",
                "성장을 저해하는 병목 구간 파악 및 해결을 위한 데이터 기반의 인사이트 도출",
                "신규 프로젝트 런칭 시 타겟 데모그래픽 분석 및 A/B 테스트(썸네일/타이틀 등) 성과 측정",
                "경쟁사 및 벤치마크 채널의 데이터를 모니터링하여 성공 방정식(Success Equation) 역설계",
                "실무진이 쉽게 활용할 수 있는 형태의 정기 데이터 리포트 및 대시보드 시각화 제공"
              ]
            },
            "qualifications": {
              "label": "자격 요건",
              "items": [
                "데이터 분석, 퍼포먼스 마케팅, 비즈니스 인텔리전스(BI) 관련 실무 경험이 있으신 분 (최소 2년 이상)",
                "수많은 지표 속에서 '비즈니스 임팩트'를 창출할 핵심 KPI를 찾아내는 통찰력",
                "정량적 데이터를 정성적 언어로 번역해 팀원들을 설득할 수 있는 탁월한 커뮤니케이션 능력"
              ]
            },
            "preferred": {
              "label": "우대 사항",
              "items": [
                "콘텐츠/미디어/엔터테인먼트 산업 내 데이터 분석 경험자",
                "데이터 시각화 툴(Tableau, Google Data Studio 등) 활용 능숙자"
              ]
            },
            "workInfo": {
              "label": "근무 형태 및 보상",
              "items": [
                {
                  "label": "근무 형태",
                  "value": "풀타임 계약직, 정규직 전환 가능"
                },
                {
                  "label": "근무 방식",
                  "value": "하이브리드 근무 (재택 + 오피스 출근 병행). 성과 중심의 자율 근무제를 지향하며, 업무의 효율성에 맞춰 유연하게 조정합니다."
                },
                {
                  "label": "근무지",
                  "value": "서울특별시 영등포구"
                },
                {
                  "label": "급여 및 보상",
                  "value": "지원자의 경력과 역량을 고려하여 합리적이고 경쟁력 있는 기본급을 책정하며, 채널 및 비즈니스 성장에 기여한 임팩트에 비례하는 성과급 구조를 별도로 협의합니다."
                }
              ]
            }
          }
        },
        {
          "title": "SHORTFORM PRODUCTION (숏폼 제작)",
          "desc": <>인스타그램, 틱톡, 유튜브 쇼츠의 문법을 완벽히 체화한 ‘숏폼 네이티브’를 찾습니다. 단순히 유튜브 본편으로 유입시키는 예고편 제작자가 아닙니다. 독자적인 기획과 폭발적인 조회수로 자체적인 수익 모델을 창출할 수 있는 ‘성장 엔진’을 만드는 것이 핵심입니다. 3초 안에 시선을 사로잡는 강력한 훅(Hook)과 감각적인 편집으로, 타일러의 숏폼 채널을 하나의 거대한 플랫폼으로 키워낼 야심 찬 크리에이터를 기다립니다.</>,
          "action": "지원하기",
          "details": {
            "responsibilities": {
              "label": "주요 업무",
              "items": [
                "인스타그램 릴스, 틱톡, 유튜브 쇼츠에 최적화된 오리지널 숏폼 콘텐츠 기획/촬영/편집",
                "타일러의 일상 및 외부 활동을 밀착 마크하여 트렌디한 숏폼 콘텐츠로 즉각 가공",
                "성공하는 숏폼의 3초 훅(Hook)과 밈(Meme) 패턴을 분석하여 '성공 공식 라이브러리' 구축",
                "타 크리에이터와의 숏폼 콜라보레이션 기획 및 숏폼 시리즈물 기획을 통한 팔로워 확보",
                "숏폼 플랫폼 내 자체 트래픽을 활용한 비즈니스 모델(브랜디드 광고 등) 연계"
              ]
            },
            "qualifications": {
              "label": "자격 요건",
              "items": [
                "숏폼 플랫폼의 문법과 트렌드를 완벽하게 이해하고 즉각 반영할 수 있는 분",
                "스마트폰 중심의 기동성 있는 촬영 및 모바일/PC 숏폼 편집 툴(CapCut, Premiere 등) 활용 능력",
                "한 번의 실패에 머무르지 않고, 데이터를 보며 끊임없이 가설을 테스트하는 유연성"
              ]
            },
            "preferred": {
              "label": "우대 사항",
              "items": [
                "본인이 직접 운영하여 바이럴(떡상)을 만들어 본 숏폼 채널(인스타/틱톡) 보유자",
                "빠른 턴어라운드(Turn-around) 환경에 익숙하신 분"
              ]
            },
            "workInfo": {
              "label": "근무 형태 및 보상",
              "items": [
                {
                  "label": "근무 형태",
                  "value": "계약직, 프리랜서 등 지원자의 상황과 당사의 니즈에 맞춰 유연하게 협의 가능합니다."
                },
                {
                  "label": "근무 방식",
                  "value": "숏폼 콘텐츠 특성상 타일러의 스케줄에 맞춘 동행 및 현장 촬영이 주 업무가 됩니다. 편집 등 기타 업무는 가장 효율적인 방식으로 탄력적으로 조율합니다."
                },
                {
                  "label": "근무지",
                  "value": "타일러의 주요 활동 현장 및 서울특별시 영등포구"
                },
                {
                  "label": "급여 및 보상",
                  "value": "근무 형태 및 개인의 역량, 경력에 따라 상호 협의하여 합리적으로 결정합니다."
                }
              ]
            }
          }
        },
        {
          "title": "SHOOT & EDIT TEAM MEMBER (촬영 및 편집)",
          "desc": <>타일러 브랜드의 철학을 카메라 앵글과 컷 편집으로 구현할 ‘크리에이티브 스페셜리스트(Creative Specialist)’입니다. 야외 로케이션부터 딥다이브 스튜디오 촬영까지, 상황에 맞게 유연하게 대처하며 영상의 미적 기준을 책임집니다. 현장에서 조명과 카메라를 능숙하게 다루고, 모바일과 전문 툴을 오가며 기동성 있게 콘텐츠를 제작할 프로페셔널한 파트너들을 모십니다.</>,
          "action": "지원하기",
          "details": {
            "responsibilities": {
              "label": "주요 업무",
              "items": [
                "스튜디오 촬영, 야외 브이로그 등 다양한 형태의 영상 메인 촬영 (카메라, 조명, 오디오 세팅)",
                "브랜드 가이드라인에 맞춘 빠르고 감각적인 영상 컷 편집 및 후반 작업",
                "콘텐츠 리드의 기획에 맞춘 시선을 끄는 유튜브 썸네일 이미지 디자인 및 제작",
                "AI 툴을 적극 활용한 바이럴 쇼츠 영상 대량 제작 및 SNS 플랫폼 게시",
                "인스타그램 등 SNS 채널을 위한 정보성 카드뉴스 및 캐러셀(Carousel) 포맷 기획·디자인·게시",
                "현장의 돌발 상황에 대처하며 롱/숏폼 리드와 협업하여 최적화된 영상/시각 소스 제공"
              ]
            },
            "qualifications": {
              "label": "자격 요건",
              "items": [
                "상업 영상, 방송, 또는 하이엔드 유튜브 콘텐츠 촬영 및 편집 실무 경험자",
                "다중 카메라(Multi-cam) 세팅, 오디오 수음, 조명 설계 등 독립적인 현장 운용 능력",
                "영상 편집 툴(Premiere Pro, After Effects, DaVinci Resolve 등) 및 2D 이미지 편집 툴(Photoshop, Illustrator 등) 활용 능력이 모두 우수하신 분"
              ]
            },
            "preferred": {
              "label": "우대 사항",
              "items": [
                "[핵심 우대] 평소 타일러의 콘텐츠를 즐겨 소비하며, <1BWS / One Big World Show> 브랜드 철학과 세계관에 대한 이해도가 매우 높으신 분",
                "지식형 콘텐츠, 인터뷰, 다큐멘터리 포맷 제작 경험자",
                "감각적인 모션 그래픽, 자막 템플릿, 시각 디자인 포트폴리오를 보유하신 분"
              ]
            },
            "workInfo": {
              "label": "근무 형태 및 보상",
              "items": [
                {
                  "label": "근무 형태",
                  "value": "수습/계약 기간을 거쳐 직무 평가에 따라 정규직 전환을 적극 고려합니다."
                },
                {
                  "label": "근무 방식",
                  "value": "현장 촬영 일정 및 편집 마감일에 맞춰 탄력적으로 조율합니다."
                },
                {
                  "label": "근무지",
                  "value": "촬영 현장 및 재택/오피스 병행"
                },
                {
                  "label": "급여 및 보상",
                  "value": "근무 형태 및 개인의 역량에 따라 상호 협의하여 결정합니다."
                }
              ]
            }
          }
        },
        {
          "title": "ASSISTANT (업무 지원 & 세일즈 오퍼레이션)",
          "desc": <>폭발적으로 성장하는 미디어 비즈니스의 ‘오퍼레이션 코디네이터’입니다. 외부 파트너와의 커뮤니케이션을 1차적으로 조율하고, 제안서 초안 작성, 계약 검토, 데이터베이스 관리(CRM) 등 영업 행정 업무의 완결성을 확보합니다. 엔터테인먼트 산업의 딜(Deal) 구조와 협상 과정을 현장에서 배우며, 향후 세일즈 리드나 운영 전문가로 성장할 수 있는 기회입니다.</>,
          "action": "지원하기",
          "details": {
            "responsibilities": {
              "label": "주요 업무",
              "items": [
                "국내외 브랜드 협찬, 강연, 제휴 등 인바운드 비즈니스 문의 1차 응대 및 필터링",
                "기존 세일즈 담당자를 보조하여 제안서 초안 작성, 견적 산출, 계약서 검토 지원",
                "대내외 회의 일정 조율, 미팅 준비 및 꼼꼼한 회의록(Meeting Minutes) 작성",
                "파트너사 데이터베이스(CRM) 업데이트 및 기타 영업 행정, 세무/정산 보조 업무 수행"
              ]
            },
            "qualifications": {
              "label": "자격 요건",
              "items": [
                "격식 있고 매끄러운 비즈니스 이메일 및 유선 커뮤니케이션이 가능하신 분",
                "주어진 업무를 꼼꼼하게 챙기고, 복잡한 일정을 오차 없이 조율하는 꼼꼼함",
                "협업 툴(Google Workspace, Slack, Notion 등) 활용에 능숙하신 분",
                "엔터테인먼트/미디어 산업 비즈니스 딜(Deal) 프로세스에 대한 강한 학습 의지"
              ]
            },
            "preferred": {
              "label": "우대 사항",
              "items": [
                "미디어, MCN, 또는 엔터테인먼트 업계 인턴 및 실무 경험자"
              ]
            },
            "workInfo": {
              "label": "근무 형태 및 보상",
              "items": [
                {
                  "label": "근무 형태",
                  "value": "인턴십으로 시작하여 추후 업무 성과 및 상호 니즈에 따라 계약직 또는 정규직으로 유연하게 전환을 고려합니다."
                },
                {
                  "label": "근무 방식",
                  "value": "하이브리드 근무 (재택 + 오피스 출근 병행) 및 유연 근무제 지향"
                },
                {
                  "label": "근무지",
                  "value": "서울특별시 영등포구 및 협의"
                },
                {
                  "label": "급여 및 보상",
                  "value": "인턴십 규정에 따르며, 전환 시 역량에 맞춰 상호 협의하여 합리적으로 결정합니다."
                }
              ]
            }
          }
        }
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
      careers: "Careers",
      "sme-startup-program": "SME/Startup Program",
      press: "Press & Media",
      blog: "Blogs & Essays",
      sticky_cta: "Work with Tyler"
    },
    hero: {
      label: "STRATEGIC PARTNERSHIP",
      title_span: "RASCH",
      subtitle: "The Intellectual Icon • Modern Media Authority",
      description: "Bridging Global Perspectives and Korean Culture. Tyler Media delivers intellectual authority, high-impact storytelling, and multi-platform reach for world-class brands.",
      cta: "Inquire Now",
      media_kit_cta: "Download Media Kit"
    },
    philosophy: {
      heading: "VISION",
      p1: <>Tyler holds a unique position in the Korean market, combining <span className="text-accent font-bold">National Recognition</span> with <span className="text-accent font-bold">Unwavering Trust</span>. As a thought leader on Global Affairs, Macroeconomics, and Technology Security, he elevates brands beyond simple promotion.</>,
      p2: <>We don't just offer exposure. We promise <span className="text-accent font-bold">Strategic Communication</span> where your brand philosophy is translated into Tyler's logical, persuasive language, resonating deeply with the "Active Economic Class".</>,
      quote: "Authenticity is the only currency that matters.",
      manifesto: <><span className="block mb-2">Turn Complex Messages into <br className="hidden md:block" />Compelling Narratives</span>Lend <span className="text-accent">Intellectual Authority</span> to Your Brand</>
    },
    dashboard: {
      label: "KEY METRICS (2026)",
      views: "99M+",
      views_label: "Total YouTube Views",
      reach: "1.8M+",
      reach_label: "Monthly Audience Reach",
      engagement: "877K+",
      engagement_label: "1BWS YouTube Subscribers",
      growth: "+320K+",
      growth_label: "12-Month Net Growth +320K",
      trust: "60%",
      trust_label: "Ages 25–54 Core Economic Class",
      trust_tag: "CORE DEMOGRAPHIC",
      source_note: "* Data Source: YouTube Studio · Instagram Insights (As of 2026)",
      platform_demography: {
        title: "PLATFORM DEMOGRAPHY",
        synergy_badge: "360° TOTAL AUDIENCE SYNERGY",
        synergy_title: "Reach economic decision-makers and lifestyle consumers in one campaign.",
        synergy_desc: "By uniting 1BWS YouTube (balanced 63% Male / 37% Female prime 25-54 economic drivers) with Tyler's Instagram (77% Female, 35-44 cultural trendsetters), Tyler Media eliminates gender and category barriers—enabling seamless, authoritative targeting from high-stakes tech and corporate decision-makers to trend-leading F&B and lifestyle consumer markets.",
        synergy_yt_title: "1BWS YouTube Engine",
        synergy_yt_stat: "25-54 Core Economic Class 60% · 6:4 Balance (M 63% / F 37%)",
        synergy_yt_target: "Household & Corporate Decision-Makers · Tech, Finance & B2B",
        synergy_ig_title: "Tyler Instagram Engine",
        synergy_ig_stat: "Female 77% · Age 35-44 Cultural Trendsetters",
        synergy_ig_target: "F&B, Beauty, Fashion, Living & High-Engagement Lifestyle",
        cross_amplifier: "Tyler Rasch's official Instagram (@tylerrasch, powerful cultural consumption driven by 77% female audience) and multi-channel short-form networks cross-amplify 1BWS and Really Tyler content across global social media.",
        tabs: {
          youtube: {
            label: "ONE BIG WORLD SHOW",
            tagline: "Global Geopolitics, Macroeconomics & Tech Insights",
            audience_type: "Intellectual Audience & Business Leadership",
            gender_label: "Gender: Male 63% / Female 37%",
            gender: { male: 63, female: 37 },
            age_label: "Core Age: 25 - 54 Core (60%) / 35 - 64 Expansion (66.5%)",
            age_value: "60%",
            insight: "Senior decision-makers leading household consumption and corporate investments (Ages 25-54).",
            summary: "Senior decision-makers leading household consumption and corporate investments (Ages 25-54)."
          },
          instagram: {
            label: "REALLY TYLER",
            tagline: "Global Lifestyle, Language Mindset & Cultural Curation",
            audience_type: "Lifestyle, Language & Cultural Trendsetters",
            gender_label: "Gender: Female-Driven (Lifestyle Consumption Core)",
            gender: { male: 30, female: 70 },
            age_label: "Core Age: 20 - 44 Young Professionals & Trendsetters",
            age_value: "Dominant",
            insight: "Trendsetters driving taste, culture, culinary adventures, and modern lifestyle consumption.",
            summary: "Trendsetters driving taste, culture, culinary adventures, and modern lifestyle consumption."
          }
        }
      },
      ecosystem: {
        channel_title: "1BWS / One Big World Show",
        personal_title: "Tyler Rasch",
        really_tyler_title: "Really Tyler",
        platforms: [
          { name: "YouTube", handle: "@원빅월드쇼", count: "877K", icon: "youtube", url: "https://www.youtube.com/@원빅월드쇼", category: "1bws", isChannel: true },
          { name: "Instagram", handle: "@onebigworldshow", count: "", icon: "instagram", url: "https://www.instagram.com/onebigworldshow", category: "1bws", isChannel: true },
          { name: "TikTok", handle: "@onebigworldshow", count: "", icon: "tiktok", url: "https://www.tiktok.com/@onebigworldshow", category: "1bws", isChannel: true },
          { name: "YouTube", handle: "@reallytylerofficial", count: "8.2K", icon: "youtube", url: "https://www.youtube.com/@reallytylerofficial", category: "really_tyler" },
          { name: "Instagram", handle: "@reallytylerofficial", count: "", icon: "instagram", url: "https://www.instagram.com/reallytylerofficial/", category: "really_tyler" },
          { name: "TikTok", handle: "@reallytylerofficial", count: "", icon: "tiktok", url: "https://www.tiktok.com/@reallytylerofficial", category: "really_tyler" },
          { name: "Instagram", handle: "@tyleroninsta", count: "247K", icon: "instagram", url: "https://www.instagram.com/tyleroninsta/", category: "personal" },
          { name: "Threads", handle: "@tyleroninsta", count: "", icon: "threads", url: "https://www.threads.com/@tyleroninsta", category: "personal" },
          { name: "LinkedIn", handle: "Tyler Rasch", count: "30K+", icon: "linkedin", url: "https://www.linkedin.com/in/tylerrasch/", category: "personal" },
          { name: "X", handle: "@tylerrasch", count: "65K+", icon: "twitter", url: "https://x.com/tylerrasch", category: "personal" },
          { name: "Facebook", handle: "Tyler Rasch", count: "18K+", icon: "facebook", url: "https://www.facebook.com/people/Tyler-Rasch/100011625431145/", category: "personal" }
        ]
      }
    },
    portfolio: {
      originals: {
        heading: "ORIGINAL SERIES",
        subheading: "Four flagship series spanning deep intellectual discourse (1BWS) to lifestyle and language (Really Tyler)",
        filter_all: "All Series (4)",
        filter_1bws: "One Big World Show (2)",
        filter_really_tyler: "Really Tyler (2)",
        items: [
          {
            title: "1BWS Talking Head",
            subtitle: "Geopolitics · Macroeconomics · Tech Deep Dive",
            channel: "1bws",
            channelLabel: "ONE BIG WORLD SHOW",
            desc: "Deep-dive analytical perspectives by Tyler deciphering the intersection of global affairs, macroeconomics, tech disruption, and shifting geopolitics.",
            thumbnail: "https://i.ytimg.com/vi/FNkI37iEbt0/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=FNkI37iEbt0",
            tags: ["#Geopolitics", "#GlobalIssues", "#MacroEconomics", "#TechTrends", "#WorldOrder", "#FutureOutlook"]
          },
          {
            title: "1BWS Podcast",
            subtitle: "Global Affairs & Everyday Conversations",
            channel: "1bws",
            channelLabel: "ONE BIG WORLD SHOW",
            desc: "Candid, relatable conversations breaking down how massive global shifts, geopolitics, and emerging technologies directly impact our daily lives and personal decisions.",
            thumbnail: "https://i.ytimg.com/vi/egCLFB75zkM/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=egCLFB75zkM",
            tags: ["#GlobalAffairs", "#EverydayImpact", "#Tech", "#MacroEconomics", "#CasualTalk", "#RealLifeContext"]
          },
          {
            title: "Really Tyler: Language",
            subtitle: "Language & Global Mindset",
            channel: "really_tyler",
            channelLabel: "REALLY TYLER",
            desc: "Breaking beyond rote memorization: practical philosophies, English mastery, and cultural communication insights from polyglot Tyler.",
            thumbnail: "https://i.ytimg.com/vi/U2lzr4lgkC8/maxresdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=U2lzr4lgkC8",
            tags: ["#LanguageLearning", "#EnglishSpeaking", "#Polyglot", "#Communication", "#LanguageHacks", "#Mindset"]
          },
          {
            title: "Really Tyler: Life & Stories",
            subtitle: "Lifestyle, Daily Vlogs & Stories",
            channel: "really_tyler",
            channelLabel: "REALLY TYLER",
            desc: "An authentic and multifaceted journey into Tyler's world: spanning daily life vlogs, culinary adventures, personal curiosities, and travel experiences around the globe.",
            thumbnail: "https://i.ytimg.com/vi/n_kYQr50cEE/maxresdefault.jpg",
            videoUrl: "https://youtu.be/n_kYQr50cEE",
            tags: ["#DailyLife", "#LifestyleVlog", "#Culinary", "#Travel", "#Lifestyle"]
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
      subheading: "Beyond mere exposure—driving persuasion and conversion. Strategic collaboration tailored to your marketing & PR objectives.",
      guide: "Custom bundling (bespoke editorial specials, podcast host lead-ins, split episode campaigns, etc.) is fully available based on campaign timelines and marketing objectives. We design the optimal partnership architecture tailored to your strategic goals.",
      includesLabel: "Includes",
      recommendedLabel: "Recommended For",
      items: [
        {
          title: "Branded Storytelling",
          subtitle: "BRANDED SERIES & SPECIALS",
          desc: "Deconstructing complex technologies, true brand value, and corporate vision into clear, compelling narratives in Tyler's voice.\nDedicated 10–15 minute flagship episodes spotlight brand agendas in depth, driving authoritative trust and deep audience engagement for product launches, corporate PR, and IR branding.",
          includes: "1 Dedicated Flagship Episode + Repurposed Shorts Clips Bundle + YouTube Community Tab Promotion",
          recommendedFor: "Corporate PR & IR, New Product/Tech Launches, B2B & Tech Solutions, Brand Philosophy",
          tags: ["CorporatePR_IR", "ProductLaunch", "B2BTechSolutions"]
        },
        {
          title: "Seamless PPL & Sponsorship",
          subtitle: "SEAMLESS PPL & SPONSORSHIP",
          desc: "Eliminating ad friction by naturally integrating your product into the conversational flow of the episode.\nWith Tyler's trusted verbal endorsement, in-studio physical placement, and pinned comment links, we drive qualified traffic and tangible purchasing conversions.",
          includes: "30–90s Host-Read Segment + In-Studio Physical Placement + Timeline Chapters & Official Pinned Link",
          recommendedFor: "Apps & Digital Platforms, Lifestyle & F&B Consumer Goods, Promotional Campaign Traffic",
          tags: ["AppsAndServices", "TargetConversion", "SmartSponsorship"]
        },
        {
          title: "Special Interview & Viral Syndication",
          subtitle: "SPECIAL INTERVIEW & VIRAL",
          desc: "In-depth 1:1 dialogues with global entrepreneurs, bestselling authors, journalists, opinion leaders, creators, and celebrities.\nTyler's Korean & English bilingual moderation maximizes authority for both guest and brand, while key highlights are cross-amplified across Reels, Shorts, and TikTok.",
          includes: "Full 1:1 Bilingual Dialogue Episode + Cross-Platform Shorts, Reels & TikTok Viral Syndication",
          recommendedFor: "Global Dignitary & Celebrity Features, Brand Agenda Setting, CEO/Personal Branding, Short-Form Reach",
          tags: ["GlobalGuestDialogue", "BilingualInterview", "OmnichannelShorts"]
        }
      ]
    },
    contact: {
      heading: <>Lead with Authority.<br />Partner with Tyler.</>,
      tallyFormId: process.env.NEXT_PUBLIC_TALLY_FORM_EN || "A7qA7W"
    },
    careers: {
      "heading": "CAREERS",
      "subheading": <>Tyler Brand is a business.<br />We do not accept mediocrity.</>,
      "desc": <>
        Tyler Rasch is not just a YouTuber or an influencer brand. On the Tyler Team, we interpret the world through Tyler's unique perspective (language, culture, systems) and expand upon those insights to develop them into a global media business.
        <br /><br />
        We are looking for "Builders"—those who crave change and growth rather than stability. If you are ready to experiment without fear, collaborate actively, and leave a market impact through high standards, join us now.
      </>,
      "values": [
        {
          "title": "Deep Dive",
          "desc": "We seek planning that pierces through the surface to the essence. Relentlessly asking 'Why?' is essential."
        },
        {
          "title": "Autonomous Growth",
          "desc": "We don't just follow orders. We set hypotheses for brand growth, verify them, and create results."
        },
        {
          "title": "Global Standard",
          "desc": "We are not just a YouTuber team. We collaborate with top-tier global brands and never compromise on quality."
        }
      ],
      "positions": [
        {
          "title": "CONTENT LEAD",
          "desc": <>We are looking for a visionary "Showrunner" who can oversee the entire lifecycle of our IP. Drive our brand value through strategic OSMU planning.</>,
          "action": "Apply",
          "details": {
            "responsibilities": {
              "label": "Key Responsibilities",
              "items": [
                "Oversee the entire planning and production pipeline for all content (Long-form/Short-form) on the <1BWS / One Big World Show> channel.",
                "Establish YouTube upload strategies (Title/Copywriting planning, thumbnail concepts, metadata, and SEO optimization).",
                "Manage scheduling for internal/external staff (editing teams, etc.) and perform final Quality Control (QC) aligned with the brand tone: \"Deep, yet Fun.\"",
                "Actively utilize AI tools (Gemini, ChatGPT, etc.) for scriptwriting, proposal generation, and workflow efficiency.",
                "Continuously research \"Hooks\" and develop new formats to improve retention and CTR.",
                "Establish and execute OSMU (One Source Multi-Use) strategies, expanding single content pieces into short-forms, podcasts, and newsletters."
              ]
            },
            "qualifications": {
              "label": "Requirements",
              "items": [
                "2+ years of experience leading content planning, production, and channel management for New Media/YouTube.",
                "Deep understanding of the YouTube algorithm and how titles/thumbnails/SEO impact traffic.",
                "Comprehensive knowledge of the production process, from planning to filming and post-production.",
                "Ability to maintain the Tyler brand philosophy and high-quality standards while communicating smoothly with creators."
              ]
            },
            "preferred": {
              "label": "Preferred Qualifications",
              "items": [
                "PM experience operating a large-scale channel with over 1 million subscribers and coordinating multiple projects.",
                "Experience in business expansion based on IP (Intellectual Property).",
                "Exceptional sense for copywriting and planning."
              ]
            },
            "workInfo": {
              "label": "Work Format & Compensation",
              "items": [
                {
                  "label": "Employment Type",
                  "value": "Full-time Contract (Conversion to permanent role available upon review)."
                },
                {
                  "label": "Work Style",
                  "value": "Hybrid Work (A mix of Remote and On-site). We prioritize a performance-driven, autonomous environment where flexibility is adjusted based on operational efficiency."
                },
                {
                  "label": "Location",
                  "value": "Yeongdeungpo-gu, Seoul."
                },
                {
                  "label": "Compensation",
                  "value": "We offer a reasonable and competitive base salary commensurate with your experience and expertise. Additionally, a performance-based incentive structure directly tied to your impact on the channel and business growth will be negotiated separately."
                }
              ]
            }
          }
        },
        {
          "title": "COMMUNITY LEAD",
          "desc": <>We need an "Architect of Relationships" to evolve our fandom into the 'Tylership' ecosystem. Design value propositions and cultivate evangelists.</>,
          "action": "Apply",
          "details": {
            "responsibilities": {
              "label": "Key Responsibilities",
              "items": [
                "Design and operate the Value Proposition for the new premium membership, \"Tylership.\"",
                "Oversee the planning of online/offline events, meetups, and campaigns to convert the fandom into Evangelists (loyal customers).",
                "Establish a real-time feedback loop through community sentiment and VOC (Voice of Customer) analysis.",
                "Manage churn rate defense and proactively resolve conflicts within the community.",
                "Plan and execute independent monetization models based on the membership."
              ]
            },
            "qualifications": {
              "label": "Requirements",
              "items": [
                "3+ years of experience in fandom business, community management, or CRM planning/operation.",
                "Strong planning and execution skills for both online and offline events.",
                "Excellent diplomatic communication skills to mediate and resolve conflicts among complex stakeholders.",
                "Experience in initial infrastructure setup (from 0 to 1)."
              ]
            },
            "preferred": {
              "label": "Preferred Qualifications",
              "items": [
                "Experience launching and operating paid subscription/membership services.",
                "PM experience for large-scale offline events (fan meetings, conferences, etc.)."
              ]
            },
            "workInfo": {
              "label": "Work Format & Compensation",
              "items": [
                {
                  "label": "Employment Type",
                  "value": "Full-time Contract (Conversion to permanent role available upon review)."
                },
                {
                  "label": "Work Style",
                  "value": "Hybrid Work (A mix of Remote and On-site). We prioritize a performance-driven, autonomous environment where flexibility is adjusted based on operational efficiency."
                },
                {
                  "label": "Location",
                  "value": "Yeongdeungpo-gu, Seoul."
                },
                {
                  "label": "Compensation",
                  "value": "We offer a reasonable and competitive base salary commensurate with your experience and expertise. Additionally, a performance-based incentive structure directly tied to your impact on the channel and business growth will be negotiated separately."
                }
              ]
            }
          }
        },
        {
          "title": "DATA & TRENDS LEAD",
          "desc": <>A 'BI Partner' supporting decisions with objective metrics. Visualize data into insights to serve as the team's compass.</>,
          "action": "Apply",
          "details": {
            "responsibilities": {
              "label": "Key Responsibilities",
              "items": [
                "Perform precision analysis of business data (YouTube reports, membership sign-up rates, inflow paths, etc.).",
                "Identify growth bottlenecks and derive data-driven insights to solve them.",
                "Analyze target demographics for new projects and measure performance via A/B testing (thumbnails, titles, etc.).",
                "Monitor competitors and benchmark channels to reverse-engineer \"Success Equations.\"",
                "Provide regular data reports and visualized dashboards that are easily actionable for the team."
              ]
            },
            "qualifications": {
              "label": "Requirements",
              "items": [
                "2+ years of professional experience in Data Analysis, Performance Marketing, or Business Intelligence (BI).",
                "Insight to identify key KPIs that create \"Business Impact\" amidst a sea of metrics.",
                "Exceptional communication skills to translate quantitative data into qualitative language to persuade team members."
              ]
            },
            "preferred": {
              "label": "Preferred Qualifications",
              "items": [
                "Data analysis experience within the content/media/entertainment industry.",
                "Proficiency in data visualization tools (Tableau, Google Data Studio, etc.)."
              ]
            },
            "workInfo": {
              "label": "Work Format & Compensation",
              "items": [
                {
                  "label": "Employment Type",
                  "value": "Full-time Contract (Conversion to permanent role available upon review)."
                },
                {
                  "label": "Work Style",
                  "value": "Hybrid Work (A mix of Remote and On-site). We prioritize a performance-driven, autonomous environment where flexibility is adjusted based on operational efficiency."
                },
                {
                  "label": "Location",
                  "value": "Yeongdeungpo-gu, Seoul."
                },
                {
                  "label": "Compensation",
                  "value": "We offer a reasonable and competitive base salary commensurate with your experience and expertise. Additionally, a performance-based incentive structure directly tied to your impact on the channel and business growth will be negotiated separately."
                }
              ]
            }
          }
        },
        {
          "title": "SHORTFORM PRODUCTION (Director)",
          "desc": <>Looking for a 'Shortform Native' who lives and breathes shortform grammar. Create a 'Growth Engine' with its own revenue model.</>,
          "action": "Apply",
          "details": {
            "responsibilities": {
              "label": "Key Responsibilities",
              "items": [
                "Plan, film, and edit original short-form content optimized for Instagram Reels, TikTok, and YouTube Shorts.",
                "Closely follow Tyler’s daily life and external activities to process them into trendy short-form content immediately.",
                "Build a \"Success Formula Library\" by analyzing 3-second hooks and meme patterns.",
                "Acquire followers through short-form collaborations with other creators and specialized short-form series.",
                "Link business models (branded ads, etc.) utilizing native short-form platform traffic."
              ]
            },
            "qualifications": {
              "label": "Requirements",
              "items": [
                "Complete understanding of short-form platform grammar/trends and the ability to reflect them instantly.",
                "Mobile-centric filming agility and proficiency in short-form editing tools (CapCut, Premiere, etc.).",
                "Flexibility to constantly test hypotheses based on data rather than being discouraged by a single failure."
              ]
            },
            "preferred": {
              "label": "Preferred Qualifications",
              "items": [
                "Experience running a personal short-form channel (Instagram/TikTok) that has achieved viral success.",
                "Accustomed to a fast turn-around environment."
              ]
            },
            "workInfo": {
              "label": "Work Format & Compensation",
              "items": [
                {
                  "label": "Employment Type",
                  "value": "Highly flexible and negotiable (Part-time, Contract, or Freelance) based on the candidate's availability and company needs."
                },
                {
                  "label": "Work Style",
                  "value": "On-site work and accompanying Tyler's schedule will be the primary focus due to the nature of short-form filming. Editing and other tasks will be managed flexibly."
                },
                {
                  "label": "Location",
                  "value": "Tyler's main activity sites and Yeongdeungpo-gu, Seoul."
                },
                {
                  "label": "Compensation",
                  "value": "Negotiable based on employment type, experience, and expertise."
                }
              ]
            }
          }
        },
        {
          "title": "SHOOT & EDIT TEAM MEMBER",
          "desc": <>A specialist to bring Tyler's brand philosophy to life through camera angles and editing. Be a professional partner responsible for visual standards.</>,
          "action": "Apply",
          "details": {
            "responsibilities": {
              "label": "Key Responsibilities",
              "items": [
                "Lead filming for studio shoots, outdoor vlogs, etc. (Camera, lighting, audio setup).",
                "Fast, sensory video cutting and post-production aligned with brand guidelines.",
                "Design eye-catching YouTube thumbnails based on the Content Lead’s planning.",
                "Mass-produce viral Shorts using AI tools and post across SNS platforms.",
                "Design and post informative card news and carousel formats for Instagram.",
                "Handle unexpected on-site situations and collaborate with Long/Short-form leads to provide optimized video/visual assets."
              ]
            },
            "qualifications": {
              "label": "Requirements",
              "items": [
                "Professional experience in filming and editing commercial videos, broadcasts, or high-end YouTube content.",
                "Independent field operation skills (Multi-cam setup, audio recording, lighting design).",
                "Proficiency in video tools (Premiere Pro, After Effects, DaVinci Resolve) and 2D design tools (Photoshop, Illustrator)."
              ]
            },
            "preferred": {
              "label": "Preferred Qualifications",
              "items": [
                "[Core Preference]: Deep understanding of the <1BWS / One Big World Show> brand philosophy and worldview as an active consumer of the content.",
                "Experience in producing knowledge-based content, interviews, or documentary formats.",
                "Possess a portfolio showcasing trendy motion graphics, subtitle templates, and visual design."
              ]
            },
            "workInfo": {
              "label": "Work Format & Compensation",
              "items": [
                {
                  "label": "Employment Type",
                  "value": "Probationary/Contract period with strong consideration for permanent full-time conversion based on performance. (Project-based or freelance options also highly flexible/negotiable)."
                },
                {
                  "label": "Work Style",
                  "value": "Flexible working hours adjusted according to shooting schedules and editing deadlines."
                },
                {
                  "label": "Location",
                  "value": "On-site shoots and Remote/On-site hybrid for editing."
                },
                {
                  "label": "Compensation",
                  "value": "Negotiable based on employment type, experience, and expertise."
                }
              ]
            }
          }
        },
        {
          "title": "ASSISTANT (Sales Operations & Support)",
          "desc": <>A coordinator for a rapidly growing media business. Ensure the completion of partner communication and sales administration.</>,
          "action": "Apply",
          "details": {
            "responsibilities": {
              "label": "Key Responsibilities",
              "items": [
                "Initial response and filtering for inbound business inquiries (Sponsorships, lectures, partnerships).",
                "Assist Sales Managers in drafting proposals, calculating quotes, and reviewing contracts.",
                "Coordinate internal/external meeting schedules and draft meticulous Meeting Minutes.",
                "Update Partner CRM databases and support administrative, tax, and settlement tasks."
              ]
            },
            "qualifications": {
              "label": "Requirements",
              "items": [
                "Ability to conduct professional and smooth business communication via email and phone.",
                "Meticulousness in managing complex schedules and following through on assigned tasks without error.",
                "Proficiency in collaboration tools (Google Workspace, Slack, Notion).",
                "Strong willingness to learn the business deal processes of the entertainment/media industry."
              ]
            },
            "preferred": {
              "label": "Preferred Qualifications",
              "items": [
                "Internship or practical experience in the media, MCN, or entertainment industry."
              ]
            },
            "workInfo": {
              "label": "Work Format & Compensation",
              "items": [
                {
                  "label": "Employment Type",
                  "value": "Starting as an Internship with highly flexible opportunities for conversion to Contract or Full-time based on performance and mutual needs."
                },
                {
                  "label": "Work Style",
                  "value": "Hybrid Work (A mix of Remote and On-site) with flexible working hours."
                },
                {
                  "label": "Location",
                  "value": "Yeongdeungpo-gu, Seoul (or Remote, open to discussion)."
                },
                {
                  "label": "Compensation",
                  "value": "Based on internship guidelines; negotiable upon conversion based on performance and experience."
                }
              ]
            }
          }
        }
      ]
    }
  }
};

// --- COMPONENTS ---

const Sidebar = ({ lang, setLang, view, setView }: { lang: 'KR' | 'EN', setLang: (l: 'KR' | 'EN') => void, view: 'home' | 'careers' | 'sme-startup-program' | 'press' | 'blog', setView: (v: 'home' | 'careers' | 'sme-startup-program' | 'press' | 'blog') => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = contentData[lang].sidebar;

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#02060C]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">
        <a href="/" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo(0, 0); window.history.pushState(null, '', '/'); }} className="font-black text-xl tracking-tighter leading-none text-white cursor-pointer">
          TYLER <span className="text-accent">MEDIA</span>
        </a>
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
                {['vision', 'impact', 'originals', 'brands', 'packages'].map((item) => (
                  <a
                    key={item}
                    href={`/#${item}`}
                    onClick={(e) => { e.preventDefault(); setView('home'); setMobileMenuOpen(false); window.history.pushState(null, '', `/#${item}`); const el = document.getElementById(item); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`flex items-center gap-4 transition-colors ${view === 'home' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-white'}`}
                  >
                    {t[item as keyof typeof t]}
                  </a>
                ))}
                {t["sme-startup-program"] && (
                  <a
                    href="/sme-startup-program"
                    onClick={(e) => { e.preventDefault(); setView('sme-startup-program'); setMobileMenuOpen(false); window.scrollTo(0, 0); window.history.pushState(null, '', '/sme-startup-program'); }}
                    className={`flex items-center gap-4 transition-colors text-left uppercase font-bold tracking-widest ${view === 'sme-startup-program' ? 'text-accent' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {t["sme-startup-program"]}
                  </a>
                )}
                {t.blog && (
                  <a
                    href="/blog"
                    onClick={(e) => { e.preventDefault(); setView('blog'); setMobileMenuOpen(false); window.scrollTo(0, 0); window.history.pushState(null, '', '/blog'); }}
                    className={`flex items-center gap-4 transition-colors text-left uppercase font-bold tracking-widest ${view === 'blog' ? 'text-accent' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {t.blog}
                  </a>
                )}
                {t.press && (
                  <a
                    href="/press"
                    onClick={(e) => { e.preventDefault(); setView('press'); setMobileMenuOpen(false); window.scrollTo(0, 0); window.history.pushState(null, '', '/press'); }}
                    className={`flex items-center gap-4 transition-colors text-left uppercase font-bold tracking-widest ${view === 'press' ? 'text-accent' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {t.press}
                  </a>
                )}
                {t.careers && (
                  <a
                    href="/careers"
                    onClick={(e) => { e.preventDefault(); setView('careers'); setMobileMenuOpen(false); window.scrollTo(0, 0); window.history.pushState(null, '', '/careers'); }}
                    className={`flex items-center gap-4 transition-colors text-left uppercase font-bold tracking-widest ${view === 'careers' ? 'text-accent' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {t.careers}
                  </a>
                )}
                {t.contact && (
                  <a
                    href="/#contact"
                    onClick={(e) => { e.preventDefault(); setView('home'); setMobileMenuOpen(false); window.history.pushState(null, '', '/#contact'); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                    className={`flex items-center gap-4 transition-colors text-left uppercase font-bold tracking-widest ${view === 'home' ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-white'}`}
                  >
                    {t.contact}
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR (Persistent) */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 z-50 glass border-r border-white/10 flex-col justify-between py-10 px-8 items-start">
        <div className="w-full">
          <a href="/" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo(0, 0); window.history.pushState(null, '', '/'); }} className="font-black text-2xl tracking-tighter leading-none mb-1 text-left block hover:opacity-80 transition-opacity cursor-pointer">
            TYLER<br />RASCH<br /><span className="text-accent">MEDIA</span>
          </a>
        </div>

        <div className={`flex flex-col gap-4.5 font-bold tracking-widest uppercase w-full items-start ${lang === 'KR' ? 'text-[13.5px]' : 'text-xs'}`}>
          {['vision', 'impact', 'originals', 'brands', 'packages'].map((item) => {
            const isActive = view === 'home';
            return (
              <a
                key={item}
                href={`/#${item}`}
                onClick={(e) => { e.preventDefault(); setView('home'); window.history.pushState(null, '', `/#${item}`); const el = document.getElementById(item); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className={`relative pl-6 py-1 transition-colors group text-left font-bold tracking-widest uppercase block w-full ${view === 'home' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
                <span>{t[item as keyof typeof t]}</span>
              </a>
            );
          })}
          {t["sme-startup-program"] && (
            <a
              href="/sme-startup-program"
              onClick={(e) => { e.preventDefault(); setView('sme-startup-program'); window.scrollTo(0, 0); window.history.pushState(null, '', '/sme-startup-program'); }}
              className={`relative pl-6 py-1 transition-colors group text-left font-bold tracking-widest uppercase block w-full ${view === 'sme-startup-program' ? 'text-accent' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${view === 'sme-startup-program' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
              <span>{t["sme-startup-program"]}</span>
            </a>
          )}
          {t.blog && (
            <a
              href="/blog"
              onClick={(e) => { e.preventDefault(); setView('blog'); window.scrollTo(0, 0); window.history.pushState(null, '', '/blog'); }}
              className={`relative pl-6 py-1 transition-colors group text-left font-bold tracking-widest uppercase block w-full ${view === 'blog' ? 'text-accent' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${view === 'blog' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
              <span>{t.blog}</span>
            </a>
          )}
          {t.press && (
            <a
              href="/press"
              onClick={(e) => { e.preventDefault(); setView('press'); window.scrollTo(0, 0); window.history.pushState(null, '', '/press'); }}
              className={`relative pl-6 py-1 transition-colors group text-left font-bold tracking-widest uppercase block w-full ${view === 'press' ? 'text-accent' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${view === 'press' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
              <span>{t.press}</span>
            </a>
          )}
          {t.careers && (
            <a
              href="/careers"
              onClick={(e) => { e.preventDefault(); setView('careers'); window.scrollTo(0, 0); window.history.pushState(null, '', '/careers'); }}
              className={`relative pl-6 py-1 transition-colors group text-left font-bold tracking-widest uppercase block w-full ${view === 'careers' ? 'text-accent' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${view === 'careers' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
              <span>{t.careers}</span>
            </a>
          )}
          {t.contact && (
            <a
              href="/#contact"
              onClick={(e) => { e.preventDefault(); setView('home'); window.history.pushState(null, '', '/#contact'); const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              className={`relative pl-6 py-1 transition-colors group text-left font-bold tracking-widest uppercase block w-full ${view === 'home' ? 'text-white' : 'text-zinc-500 hover:text-white'}`}
            >
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rounded-full transition-all duration-300 ${view === 'home' ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
              <span>{t.contact}</span>
            </a>
          )}
        </div>

        <div className="space-y-6 w-full items-start">
          <div className="flex flex-col gap-2.5 w-full items-start">
            <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase px-1">Language</span>
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-full relative w-full">
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
          <div className="text-[10px] text-zinc-700 px-1 text-left">
            © 2026 TRM
          </div>
        </div>
      </nav>
    </>
  );
};

const TallyEmbed = ({ lang = 'KR', formId = 'A7qA7W' }: { lang?: 'KR' | 'EN'; formId?: string }) => {
  useEffect(() => {
    // If Tally widget script has already loaded, re-initialize the embed on mount or language/form switch
    if (typeof (window as any).Tally !== "undefined") {
      try {
        (window as any).Tally.loadEmbeds();
      } catch (err) {
        console.error("Failed to load Tally embeds:", err);
      }
    }
  }, [lang, formId]);

  const tallyUrl = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1&lang=${lang.toLowerCase()}&locale=${lang.toLowerCase()}`;

  return (
    <div className="w-full min-h-[900px] md:min-h-[1100px] rounded-3xl overflow-hidden bg-white shadow-2xl border border-white/10 transition-all duration-500">
      <iframe
        key={`${formId}-${lang}`}
        data-tally-src={tallyUrl}
        src={tallyUrl}
        loading="lazy"
        width="100%"
        height="100%"
        frameBorder="0"
        title={lang === 'EN' ? "Tyler Rasch Partnership Inquiry" : "타일러 라쉬 비즈니스 제휴 문의"}
        className="min-h-[900px] md:min-h-[1100px]"
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

const ImpactDashboard = ({ t, title, lang = 'KR' }: { t: Content['dashboard'], title: string, lang?: 'KR' | 'EN' }) => {
  return (
    <div className="w-full relative z-20 space-y-24">

      {/* 1. Section Header Block */}
      <div className="mb-14">
        <span className="text-accent text-sm font-bold tracking-[0.4em] uppercase block mb-4">
          {lang === 'KR' ? '핵심 성과 지표' : 'KEY PERFORMANCE METRICS'}
        </span>
        <div>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic">
            {title}
          </h2>
          <div className="w-20 h-1 bg-accent/30 mt-8" />
        </div>
      </div>

      {/* 2. Main Statistics Grid */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {[
            { label: t.views_label, val: t.views, tag: t.label },
            { label: t.reach_label, val: t.reach, tag: lang === 'KR' ? "월간 도달" : "MONTHLY REACH" },
            { label: t.engagement_label, val: t.engagement, tag: lang === 'KR' ? "네트워크 규모" : "NETWORK SCALE", sub: t.growth_label },
            { label: t.trust_label, val: t.trust, tag: t.trust_tag || (lang === 'KR' ? "핵심 타깃" : "CORE DEMOGRAPHIC") }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className=" glass p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center hover:border-accent/30 transition-all group"
            >
              <span className="text-accent text-[10px] font-black tracking-[0.3em] mb-4 opacity-70">{item.tag}</span>
              <div className="text-5xl font-black text-white text-[#ffffff] mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                {typeof item.val === 'string' ? (
                  item.val.split(/(만|M|K|\+|%)/).map((part, index) =>
                    ['만', 'M', 'K', '+', '%'].includes(part) ? (
                      <span key={index} className="text-3xl font-bold mx-0.5 text-white text-[#ffffff]">{part}</span>
                    ) : (
                      <span key={index} className="text-white text-[#ffffff]">{part}</span>
                    )
                  )
                ) : item.val}
              </div>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
              {item.sub && (
                <span className="mt-3 text-[10px] font-extrabold text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                  {item.sub}
                </span>
              )}
            </motion.div>
          ))}
        </div>
        {t.source_note && (
          <p className="text-right text-[11px] font-mono text-zinc-500 px-6">
            {t.source_note}
          </p>
        )}
      </div>

      {/* 3. Platform Demography Subsection */}
      <div className="space-y-10">
        <div className="px-4">
          <span className="text-accent text-xs font-mono font-bold tracking-[0.3em] uppercase block mb-3">{t.platform_demography.title}</span>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight break-keep">
            {t.platform_demography.synergy_title}
          </h3>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 items-stretch">

        {/* ONE BIG WORLD SHOW (YouTube) */}
        <div className="lg:col-span-6 glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#00be61]/40 transition-colors flex flex-col justify-between h-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#00be61]" />
          <div>
            <div className="flex justify-between items-start mb-8 min-h-[96px]">
              <div>
                {t.platform_demography.tabs.youtube.audience_type && (
                  <div className="mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00be61] bg-[#00be61]/10 px-2.5 py-0.5 rounded-full border border-[#00be61]/30">
                      {t.platform_demography.tabs.youtube.audience_type}
                    </span>
                  </div>
                )}
                <h4 className="text-3xl font-black text-white italic tracking-tighter">{t.platform_demography.tabs.youtube.label}</h4>
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mt-1">{t.platform_demography.tabs.youtube.tagline}</p>
              </div>
              <div className="scale-125 text-[#00be61] pt-1"><SocialIcon name="youtube" /></div>
            </div>

            {/* Age Group */}
            <div className="mb-8 min-h-[72px] flex flex-col justify-center">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Target Age Demographics</div>
              <div className="text-xl font-black text-white flex flex-wrap items-center gap-2">
                <span>{t.platform_demography.tabs.youtube.age_label.split(' / ')[0]}</span>
                {t.platform_demography.tabs.youtube.age_label.includes(' / ') && (
                  <span className="text-xs font-bold text-[#00be61] px-2.5 py-0.5 rounded-full bg-[#00be61]/10 border border-[#00be61]/30">
                    {t.platform_demography.tabs.youtube.age_label.split(' / ')[1]}
                  </span>
                )}
              </div>
            </div>

            {/* Gender Bar */}
            <div className="mb-6">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Gender Demographics</div>
              <div className="text-xl font-black text-white mb-2">{t.platform_demography.tabs.youtube.gender_label}</div>
              <div className="h-5 w-full bg-white/5 rounded-full overflow-hidden flex mb-2 p-0.5">
                <div
                  className="h-full bg-[#00be61] rounded-l-full flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_rgba(0,190,97,0.4)] transition-all duration-500"
                  style={{ width: `${t.platform_demography.tabs.youtube.gender.male}%` }}
                >
                  M {t.platform_demography.tabs.youtube.gender.male}%
                </div>
                <div
                  className="h-full bg-zinc-800 rounded-r-full flex items-center justify-center text-[10px] font-black text-zinc-300 transition-all duration-500"
                  style={{ width: `${t.platform_demography.tabs.youtube.gender.female}%` }}
                >
                  F {t.platform_demography.tabs.youtube.gender.female}%
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 min-h-[68px] flex items-center">
            <div className="text-zinc-200 text-sm font-semibold tracking-wide border-l-2 border-[#00be61] pl-4 leading-relaxed break-keep">
              {t.platform_demography.tabs.youtube.summary}
            </div>
          </div>
        </div>

        {/* REALLY TYLER (YouTube) */}
        <div className="lg:col-span-6 glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-[#ffc700]/40 transition-colors flex flex-col justify-between h-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#ffc700]" />
          <div>
            <div className="flex justify-between items-start mb-8 min-h-[96px]">
              <div>
                {t.platform_demography.tabs.instagram.audience_type && (
                  <div className="mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#ffc700] px-2.5 py-0.5 rounded-full border border-[#ffc700]/40 shadow-sm">
                      {t.platform_demography.tabs.instagram.audience_type}
                    </span>
                  </div>
                )}
                <h4 className="text-3xl font-black text-white italic tracking-tighter">{t.platform_demography.tabs.instagram.label}</h4>
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mt-1">{t.platform_demography.tabs.instagram.tagline}</p>
              </div>
              <div className="scale-125 text-[#ffc700] pt-1"><SocialIcon name="youtube" /></div>
            </div>

            {/* Age Group */}
            <div className="mb-8 min-h-[72px] flex flex-col justify-center">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Target Age Demographics</div>
              <div className="text-xl font-black text-white flex flex-wrap items-center gap-2">
                <span>{t.platform_demography.tabs.instagram.age_label.split(' / ')[0]}</span>
                {t.platform_demography.tabs.instagram.age_label.includes(' / ') && (
                  <span className="text-xs font-black text-black px-2.5 py-0.5 rounded-full bg-[#ffc700] border border-[#ffc700]/40">
                    {t.platform_demography.tabs.instagram.age_label.split(' / ')[1]}
                  </span>
                )}
              </div>
            </div>

            {/* Gender Bar */}
            <div className="mb-6">
              <div className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-1.5">Gender Distribution</div>
              <div className="text-xl font-black text-white mb-2">{t.platform_demography.tabs.instagram.gender_label}</div>
              <div className="h-5 w-full bg-white/5 rounded-full overflow-hidden flex mb-2 p-0.5">
                <div
                  className="h-full bg-zinc-800 rounded-l-full flex items-center justify-center text-[10px] font-bold text-zinc-300 transition-all duration-500"
                  style={{ width: `${t.platform_demography.tabs.instagram.gender.male}%` }}
                >
                  M {t.platform_demography.tabs.instagram.gender.male}%
                </div>
                <div
                  className="h-full bg-[#ffc700] text-black rounded-r-full flex items-center justify-center text-[10px] font-black shadow-[0_0_10px_rgba(255,199,0,0.4)] transition-all duration-500"
                  style={{ width: `${t.platform_demography.tabs.instagram.gender.female}%` }}
                >
                  F {t.platform_demography.tabs.instagram.gender.female}%
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 min-h-[68px] flex items-center">
            <div className="text-zinc-200 text-sm font-semibold tracking-wide border-l-2 border-[#ffc700] pl-4 leading-relaxed break-keep">
              {t.platform_demography.tabs.instagram.summary}
            </div>
          </div>
        </div>

        {/* High-End Tech Visual: Cross-Platform Demographics Amplifier */}
        <div className="lg:col-span-12 bg-[#141014] bg-gradient-to-br from-[#833AB4]/10 via-[#161616] to-[#FCAF45]/10 p-7 md:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl relative overflow-hidden group">
          {/* Instagram Signature Top & Bottom Gradient Accent Lines */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]" />

          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/80 border border-[#E1306C]/80 shadow-[0_0_15px_rgba(225,48,108,0.25)] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#E1306C] shadow-[0_0_8px_#E1306C] animate-pulse" />
              <span className="text-white font-mono font-bold text-xs tracking-wider uppercase">[CROSS-PLATFORM AMPLIFIER]</span>
            </div>
            <div className="text-[11px] font-mono text-[#E1306C] uppercase tracking-widest hidden md:flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#833AB4] to-[#FCAF45]" />
              Instagram Engine & Multi-Channel Syndication
            </div>
          </div>

          {/* 3 Horizontal Data Chips */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chip 1: Official Instagram Real Data */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#E1306C]/60 hover:bg-white/[0.05] transition-all">
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium mb-1.5 truncate">
                <span>{lang === 'KR' ? '타일러 라쉬 공식 인스타그램' : "Tyler's Official Instagram"}</span>
                <span className="text-[#E1306C] font-semibold">@tyleroninsta</span>
                <svg className="w-3.5 h-3.5 text-[#3897f0] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="text-xl font-black text-white tracking-tight">
                246K+ <span className="text-sm font-bold text-zinc-300">Followers {lang === 'KR' ? '(24.6만+)' : ''}</span>
              </div>
            </div>

            {/* Chip 2: Target Power */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#E1306C]/60 hover:bg-white/[0.05] transition-all">
              <div className="text-xs font-bold text-white mb-1.5 leading-snug">
                {lang === 'KR' ? '여성 77% 중심의 트렌드·라이프스타일 소비 주도층' : '77% Female Trend & Lifestyle Consumption Core'}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                {lang === 'KR' ? '(35-44세 중심 실질적 가계 구매력 코어)' : '(Ages 35-44 Primary Household Purchasing Power)'}
              </div>
            </div>

            {/* Chip 3: Multi-Channel Synergy */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#E1306C]/60 hover:bg-white/[0.05] transition-all">
              <div className="text-xs font-bold text-white mb-1.5 leading-snug">
                {lang === 'KR' ? '1BWS & Really Tyler 숏폼 크로스 바이럴' : '1BWS & Really Tyler Short-Form Cross-Viral'}
              </div>
              <div className="text-[11px] text-zinc-400 font-mono">
                {lang === 'KR' ? '(유튜브 Shorts, 인스타그램 Reels, 틱톡 통합 신디케이션)' : '(Integrated Syndication: YouTube Shorts, Reels, TikTok)'}
              </div>
            </div>
          </div>

          {/* Bottom Summary Copy */}
          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed border-t border-white/10 pt-4 break-keep">
            {lang === 'KR'
              ? "유튜브 롱폼의 지적 담론과 라이프스타일 메시지를 24.6만 공식 인스타그램(@tyleroninsta) 및 멀티 숏폼 네트워크로 크로스 확산하여 브랜드 파급력을 극대화합니다."
              : "Cross-amplifying intellectual discourse and lifestyle narratives from YouTube long-form to 246K+ official Instagram (@tyleroninsta) and multi-platform short-form networks to maximize brand impact."}
          </p>
        </div>

      </div>
      </div>

      {/* 3. Social Media Ecosystem (Compact 3-Column Grid) */}
      <div className="px-4 space-y-10">
        <div className="text-center">
          <h3 className="text-sm font-black text-zinc-500 uppercase tracking-[0.5em] mb-4">SOCIAL MEDIA ECOSYSTEM</h3>
          <div className="h-[1px] w-20 bg-accent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full items-stretch">
          {/* Column 1: Tyler Rasch */}
          <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 hover:border-accent/30 transition-all flex flex-col justify-between relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
            <div>
              <div className="flex items-center justify-between mb-4 h-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                  Personal Official
                </span>
                <span className="text-xs text-zinc-500 font-mono">5 Channels</span>
              </div>
              <h4 className="text-2xl font-black text-white italic tracking-tight mb-6 h-10 flex items-center">
                {t.ecosystem.personal_title}
              </h4>
              <div className="space-y-2.5">
                {t.ecosystem.platforms.filter(p => p.category === 'personal' || (!p.category && !p.isChannel)).map((p, i) => (
                  <motion.a
                    key={i}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-accent/30 transition-all group/item"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-zinc-400 group-hover/item:text-accent transition-colors scale-110 flex-shrink-0">
                        <SocialIcon name={p.icon} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover/item:text-accent transition-colors truncate">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono truncate">
                          {p.handle}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0 ml-2">
                      {p.count ? (
                        <span className="text-[10px] font-mono font-bold text-zinc-300 group-hover/item:text-accent px-2 py-0.5 rounded-full bg-white/5 border border-white/10 transition-colors">
                          {p.count}
                        </span>
                      ) : null}
                      <span className="text-zinc-600 group-hover/item:text-accent transition-colors text-xs">
                        &rarr;
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: One Big World Show */}
          <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#00be61]/40 transition-all flex flex-col justify-between relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00be61]" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4 h-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#00be61] px-2.5 py-0.5 rounded-full border border-[#00be61]/40 shadow-sm">
                    Global & Tech IP
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">3 Channels</span>
                </div>
                <h4 className="text-2xl font-black text-white italic tracking-tight mb-6 h-10 flex items-center">
                  {t.ecosystem.channel_title}
                </h4>
                <div className="space-y-2.5">
                  {t.ecosystem.platforms.filter(p => p.category === '1bws' || (!p.category && p.isChannel)).map((p, i) => (
                    <motion.a
                      key={i}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#00be61]/40 transition-all group/item"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-zinc-400 group-hover/item:text-[#00be61] transition-colors scale-110 flex-shrink-0">
                          <SocialIcon name={p.icon} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover/item:text-[#00be61] transition-colors truncate">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate">
                            {p.handle}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 flex-shrink-0 ml-2">
                        {p.count ? (
                          <span className="text-[10px] font-mono font-bold text-emerald-400 group-hover/item:text-white px-2 py-0.5 rounded-full bg-[#00be61]/10 border border-[#00be61]/30 transition-colors">
                            {p.count}
                          </span>
                        ) : null}
                        <span className="text-zinc-600 group-hover/item:text-[#00be61] transition-colors text-xs">
                          &rarr;
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Complementary Focus Block to Balance Height */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00be61]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#00be61] font-bold">
                    Global IP Focus
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed break-keep">
                  {lang === 'KR'
                    ? "지정학, 매크로 경제, 테크 트렌드 심층 분석을 선도하는 지적 미디어 엔진"
                    : "Intellectual media engine deciphering global geopolitics, macroeconomics, and tech trends."}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Really Tyler */}
          <div className="glass p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#ffc700]/40 transition-all flex flex-col justify-between relative overflow-hidden group h-full">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#ffc700]" />
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between mb-4 h-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-black bg-[#ffc700] px-2.5 py-0.5 rounded-full border border-[#ffc700]/40 shadow-sm">
                    Lifestyle & Culture IP
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">3 Channels</span>
                </div>
                <h4 className="text-2xl font-black text-white italic tracking-tight mb-6 h-10 flex items-center">
                  {t.ecosystem.really_tyler_title || "Really Tyler"}
                </h4>
                <div className="space-y-2.5">
                  {t.ecosystem.platforms.filter(p => p.category === 'really_tyler').map((p, i) => (
                    <motion.a
                      key={i}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#ffc700]/40 transition-all group/item"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-zinc-400 group-hover/item:text-[#ffc700] transition-colors scale-110 flex-shrink-0">
                          <SocialIcon name={p.icon} />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover/item:text-[#ffc700] transition-colors truncate">
                            {p.name}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate">
                            {p.handle}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5 flex-shrink-0 ml-2">
                        {p.count ? (
                          <span className="text-[10px] font-mono font-bold text-amber-300 group-hover/item:text-white px-2 py-0.5 rounded-full bg-[#ffc700]/10 border border-[#ffc700]/30 transition-colors">
                            {p.count}
                          </span>
                        ) : null}
                        <span className="text-zinc-600 group-hover/item:text-[#ffc700] transition-colors text-xs">
                          &rarr;
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Complementary Focus Block to Balance Height */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffc700]" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#ffc700] font-bold">
                    Lifestyle IP Focus
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed break-keep">
                  {lang === 'KR'
                    ? "영어 마인드셋, 미식과 문화 큐레이션으로 트렌드 소비층을 연결하는 라이프스타일 엔진"
                    : "Lifestyle engine engaging trendsetters through language mindset and cultural curation."}
                </p>
              </div>
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

const StickyCTA = ({ text, setView }: { text: string, setView: (v: 'home' | 'careers' | 'sme-startup-program' | 'press' | 'blog') => void }) => {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      const heroHeight = window.innerHeight * 0.8;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const isPastHero = latest > heroHeight;
      const isBeforeFooter = latest < docHeight - 300; // Hide before hitting very bottom
      setVisible(isPastHero && isBeforeFooter);
    });
  }, [scrollY]);

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
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

const MediaKitModal = ({ isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-[#0a0f18] border border-white/10 rounded-2xl w-full max-w-4xl h-[80vh] shadow-2xl overflow-hidden"
      >
        <div className="absolute top-4 right-4 z-20">
          <button onClick={onClose} className="bg-black/20 backdrop-blur-md p-2 rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <iframe
          src="https://form.typeform.com/to/IUSk2NW1"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="camera; microphone; autoplay; encrypted-media;"
          className="rounded-2xl"
          title={title}
        ></iframe>
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

const OriginalsSection = ({
  t,
  onSelectVideo
}: {
  t: Content['portfolio']['originals'];
  onSelectVideo: (url: string) => void;
}) => {
  const [filter, setFilter] = useState<'all' | '1bws' | 'really_tyler'>('all');

  const filteredItems = t.items.filter(item => {
    if (filter === 'all') return true;
    return item.channel === filter;
  });

  return (
    <div className="relative z-10 space-y-12">
      {/* Channel Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 ${
            filter === 'all'
              ? 'bg-accent text-black shadow-[0_0_20px_rgba(0,209,160,0.3)]'
              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
        >
          <span>{t.filter_all || 'ALL (4)'}</span>
        </button>
        <button
          onClick={() => setFilter('1bws')}
          className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 ${
            filter === '1bws'
              ? 'bg-[#00be61] text-white shadow-[0_0_20px_rgba(0,190,97,0.3)]'
              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#00be61]" />
          <span>{t.filter_1bws || '1BWS (2)'}</span>
        </button>
        <button
          onClick={() => setFilter('really_tyler')}
          className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all flex items-center gap-2 ${
            filter === 'really_tyler'
              ? 'bg-[#ffc700] text-black font-black shadow-[0_0_20px_rgba(255,199,0,0.3)]'
              : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#ffc700]" />
          <span>{t.filter_really_tyler || 'REALLY TYLER (2)'}</span>
        </button>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {filteredItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl border border-white/10 hover:border-accent/40 transition-all flex flex-col justify-between overflow-hidden group relative h-full"
          >
            {/* Top Channel Accent Bar */}
            <div
              className={`h-1 w-full ${
                item.channel === '1bws'
                  ? 'bg-[#00be61]'
                  : 'bg-[#ffc700]'
              }`}
            />

            <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
              <div>
                {/* Thumbnail Container */}
                <div
                  onClick={() => item.videoUrl && onSelectVideo(item.videoUrl)}
                  className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all shadow-xl cursor-pointer bg-black/50 mb-6"
                >
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized={item.thumbnail.startsWith('http')}
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-md shadow-md ${
                        item.channel === '1bws'
                          ? 'bg-[#00be61] text-white border border-[#00be61]/40'
                          : 'bg-[#ffc700] text-black font-black border border-[#ffc700]/40'
                      }`}
                    >
                      {item.channelLabel || (item.channel === '1bws' ? '1BWS' : 'REALLY TYLER')}
                    </span>
                  </div>
                </div>

                {/* Subtitle */}
                <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase block mb-2 min-h-[1.25rem] flex items-center">
                  {item.subtitle}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-black text-white italic tracking-tight leading-tight mb-3 min-h-[2.5rem] md:min-h-[4.25rem] flex items-start">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed break-keep min-h-[4.5rem] md:min-h-[5.5rem] mb-6">
                  {item.desc}
                </p>
              </div>

              <div>
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="pt-3.5 border-t border-white/5 mb-4 h-9 flex items-center overflow-hidden">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {item.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-[10.5px] font-mono px-2 py-0.5 rounded-lg bg-white/[0.08] border border-white/15 text-zinc-200 font-medium group-hover:border-white/30 transition-colors whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Footer Button */}
                <div
                  onClick={() => item.videoUrl && onSelectVideo(item.videoUrl)}
                  className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-accent cursor-pointer transition-colors"
                >
                  <span className="tracking-widest uppercase flex items-center gap-2">
                    <span>Watch Episode</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BrandLogoWall = () => {
  const partners = [
    { name: "SK Telecom", logo: "/partners/sk_telecom_new.png", scale: 1.3 },
    { name: "Maxim", logo: "/partners/maxim_final.png", scale: 1.2 },
    { name: "LG Electronics", logo: "/partners/lg_electronics_new.png" },
    { name: "3M", logo: "/partners/3m_new.png" },
    { name: "고용노동부", logo: "/partners/media__1771143619967.png", scale: 1.2 },
    { name: "NOOGI", logo: "/partners/media__1771143764734.png", scale: 1.1 },
    { name: "8APM", logo: "/partners/media__1771143767907.png" },
    { name: "Breezm", logo: "/partners/media__1771143782118.png" },
    { name: "Nicorette", logo: "/partners/nicorette_final.png", scale: 1.1 },
    { name: "LG U+", logo: "/partners/lg_uplus_final.png" },
    { name: "NordVPN", logo: "/partners/media__1771143775321.png" },
    { name: "CooperVision", logo: "/partners/coopervision_new.png" },
    { name: "Toss", logo: "/partners/toss_final_v2.png", scale: 1.2 },
    { name: "29CM", logo: "/partners/29cm.png", scale: 1.3 },
    { name: "FSC", logo: "/partners/fsc_final_v2.png", scale: 1.1 },
    { name: "LAR", logo: "/partners/lar_final.png", scale: 1.4 }
  ];

  return (
    <div className="mt-32 pt-20 border-t border-white/5">
      <p className="text-[12px] font-bold text-accent/40 tracking-[0.4em] uppercase mb-16 text-center">Trusted Partners</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16 items-center justify-items-center">
        {partners.map((brand, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: (brand.scale || 1) * 1.08 }}
            initial={{ scale: brand.scale || 1 }}
            className="relative w-32 h-12 opacity-40 hover:opacity-95 transition-all duration-500 cursor-default"
            style={{
              filter: 'brightness(0) invert(1)'
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

export default function Home({
  initialView = 'home',
  initialLang = 'KR'
}: {
  initialView?: 'home' | 'careers' | 'sme-startup-program' | 'press' | 'blog';
  initialLang?: 'KR' | 'EN';
}) {
  const [lang, setLang] = useState<'KR' | 'EN'>(initialLang);
  const [view, setView] = useState<'home' | 'careers' | 'sme-startup-program' | 'press' | 'blog'>(initialView);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const t = contentData[lang];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/en')) {
      setLang('EN');
    }
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [view]);

  // Handle initial hash on mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Give a bit more time for initial load
    }
  }, []);

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
      <MediaKitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t.hero.media_kit_cta} />
      <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} videoUrl={selectedVideo} />

      <main className="pt-16 md:pt-0 pl-0 md:pl-64">
        {view === 'home' ? (
          <>

            {/* 1. HERO section */}
            <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden border-b border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,229,255,0.05)_0%,transparent_50%)]" />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 max-w-4xl"
              >
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8 text-white uppercase">
                  TYLER <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-500 to-zinc-600">RASCH</span>
                </h1>
                <p className="text-xl md:text-2xl text-white font-medium mb-4">{t.hero.subtitle}</p>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl word-keep-all mb-12">
                  {t.hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#contact" className="px-8 py-4 bg-accent text-black font-bold text-sm tracking-widest hover:bg-white transition-colors text-center">
                    {t.hero.cta} &rarr;
                  </a>
                </div>
              </motion.div>

              {/* AUDIT: Keep 'tyler_suit_thinking.jpg' as the first one as requested */}
              <SectionBackground src="/headshots/tyler_suit_thinking.jpg" y={yHero} priority={true} mobilePos="object-[center_10%]" />
            </section>

            {/* 2. PHILOSOPHY */}
            <section id="vision" className="relative py-36 md:py-40 px-8 md:px-20 border-b border-white/5 bg-white/[0.01] overflow-hidden">
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
            <section id="impact" className="relative py-36 md:py-40 px-8 md:px-20 border-b border-white/5 overflow-hidden">
              {/* SWITCH: Using tyler_laughing.jpg here */}
              <SectionBackground src="/headshots/tyler_laughing.jpg" y={yImpact} mobilePos="object-[center_10%]" />
              <div className="relative z-10">
                <ImpactDashboard t={t.dashboard} title={t.sidebar.impact} lang={lang} />
              </div>
            </section>

            {/* 4. ORIGINAL CONTENTS */}
            <section id="originals" className="relative pt-48 md:pt-56 pb-36 md:pb-40 px-8 md:px-20 border-b border-white/5 overflow-hidden">
              {/* SWITCH: Using tyler_prayer_hands.jpg here */}
              <SectionBackground src="/headshots/tyler_prayer_hands.jpg" y={yOriginals} mobilePos="object-[center_5%]" />
              <div className="mb-16 relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-white leading-none uppercase tracking-tighter italic break-keep">{t.portfolio.originals.heading}</h2>
                {t.portfolio.originals.subheading && (
                  <p className="text-accent text-sm font-bold uppercase tracking-widest mt-4">{t.portfolio.originals.subheading}</p>
                )}
                <div className="w-20 h-1 bg-accent/30 mt-8" />
              </div>

              <OriginalsSection t={t.portfolio.originals} onSelectVideo={(url) => setSelectedVideo(url)} />
            </section>

            {/* 5. BRAND COLLABORATIONS */}
            <section id="brands" className="relative py-36 md:py-40 px-8 md:px-20 border-b border-white/5 bg-white/[0.01] overflow-hidden">
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
            <section id="packages" className="relative py-36 md:py-40 px-8 md:px-20 border-b border-white/5 overflow-hidden bg-white/[0.01]">
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
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 break-keep">{item.title}</h3>
                        <p className="text-accent text-xs md:text-sm font-mono font-bold uppercase tracking-wider">{item.subtitle}</p>
                      </div>
                      <div className="lg:col-span-8 space-y-6">
                        <p className="text-lg md:text-xl text-zinc-200 font-light leading-relaxed word-keep-all whitespace-pre-line">{item.desc}</p>
                        
                        {(item.includes || item.recommendedFor) && (
                          <div className="p-5 md:p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                            {item.includes && (
                              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
                                <span className="shrink-0 text-accent font-mono font-semibold text-xs uppercase tracking-wider">
                                  • {t.packages.includesLabel || "포함 구성"}:
                                </span>
                                <span className="text-zinc-200 font-light leading-relaxed break-keep">
                                  {item.includes}
                                </span>
                              </div>
                            )}
                            {item.recommendedFor && (
                              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm">
                                <span className="shrink-0 text-zinc-400 font-mono font-semibold text-xs uppercase tracking-wider">
                                  • {t.packages.recommendedLabel || "추천 목적"}:
                                </span>
                                <span className="text-zinc-300 font-light leading-relaxed break-keep">
                                  {item.recommendedFor}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {item.detail && <p className="text-zinc-400 text-sm leading-relaxed word-keep-all">{item.detail}</p>}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {item.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-tight text-zinc-300 bg-white/[0.04] border border-white/10 group-hover:border-accent/40 transition-colors"
                              >
                                <span className="text-accent/80 font-bold mr-1">#</span>{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="pt-2">
                          <a href="#contact" className="inline-block border-b border-white/20 pb-1 text-xs font-bold uppercase tracking-widest hover:text-accent hover:border-accent transition-all">
                            {t.sidebar.contact} &rarr;
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {t.packages.guide && (
                  <div className="mt-24 p-8 md:p-10 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/10 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-2 max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-accent uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          Tailored Media Architecture
                        </div>
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed word-keep-all font-light">
                          {t.packages.guide}
                        </p>
                      </div>
                      <a
                        href="#contact"
                        className="shrink-0 px-6 py-3.5 bg-white text-black hover:bg-accent font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg hover:shadow-accent/20"
                      >
                        {t.sidebar.contact} &rarr;
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <PressBlogSection lang={lang} />

            {/* 7. CONTACT */}
            <section id="contact" className="relative py-36 md:py-40 px-8 md:px-20 bg-[#050A10] overflow-hidden">
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

                <TallyEmbed lang={lang} formId={t.contact.tallyFormId} />

                <div className="mt-24 pt-12 border-t border-white/5 text-[10px] text-zinc-600 uppercase tracking-widest break-keep">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                        <span className="font-bold">주식회사 큰미르(Knmir Inc.)</span>
                        <span className="hidden md:inline text-zinc-800">|</span>
                        <span>대표자: RASCH TYLER JOSEF</span>
                        <span className="hidden md:inline text-zinc-800">|</span>
                        <span>사업자등록번호: 116-81-96227</span>
                      </div>
                      <div>주소: 서울특별시 영등포구 영중로29길 2, B1</div>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span>© 2026 Tyler Rasch Media</span>
                        <span className="text-zinc-800">•</span>
                        <a href="/careers" onClick={(e) => { e.preventDefault(); setView('careers'); window.scrollTo(0, 0); window.history.pushState(null, '', '/careers'); }} className="hover:text-white transition-colors">{lang === 'KR' ? '채용' : 'Careers'}</a>
                        <span className="text-zinc-800">•</span>
                        <a href="/policy" className="hover:text-white transition-colors">Privacy & AI Policy</a>
                      </div>
                    </div>
                    <a href="mailto:request@tylerrasch.com" className="hover:text-white transition-colors lowercase">request@tylerrasch.com</a>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : view === 'careers' ? (
          /* CAREERS VIEW (INTERNSHIP RECRUITMENT) */
          <CareersInternshipView lang={lang} onNavigateHome={() => { setView('home'); window.scrollTo(0, 0); window.history.pushState(null, '', '/'); }} />
        ) : view === 'sme-startup-program' ? (
          /* SME/STARTUP PROGRAM VIEW */
          <SMEStartupProgramView setSelectedVideo={setSelectedVideo} />
        ) : view === 'press' ? (
          /* EMBEDDED PRESS & MEDIA VIEW */
          <PressView lang={lang} />
        ) : (
          /* EMBEDDED BLOG & ESSAY VIEW */
          <BlogView lang={lang} />
        )}
      </main>
    </div>
  );
}
