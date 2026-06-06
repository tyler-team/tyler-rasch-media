export interface BlogPost {
  slug: string;
  date: string;
  author: string;
  category: { KR: string; EN: string };
  title: { KR: string; EN: string };
  excerpt: { KR: string; EN: string };
  body: { KR: string[]; EN: string[] };
  socialExcerpts: {
    ratio1x1: string[];
    ratio9x16: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-era-sme-survival",
    date: "2026-05-24",
    author: "Tyler Rasch",
    category: { KR: "인공지능 & 생존", EN: "AI & Survival" },
    title: {
      KR: "2026년 AI 대전환기, 중소기업이 생존하는 연대의 로드맵",
      EN: "Navigating the 2026 AI Shift: A Solidarity Roadmap for SMEs"
    },
    excerpt: {
      KR: "인공지능 대격변의 한복판에서 중소기업과 스타트업이 거대 자본에 밀리지 않고 영리하게 연대하여 살아남는 실질적인 방법에 대하여.",
      EN: "An analytical essay on how small businesses can form strategic alliances and leverage AI to survive against heavy capital monopolies."
    },
    body: {
      KR: [
        "2026년은 역사상 인공지능과 업무 자동화가 단순 보조 도구를 넘어 산업의 핵심 의사 결정 영역까지 침투한 결정적인 해입니다. 이제 AI는 선택이 아닌 생존의 생태적 필연성이 되었습니다.",
        "글로벌 빅테크와 대기업들은 이미 수조 단위의 인프라를 바탕으로 자사 비즈니스 전체를 AI 네이티브 구조로 완벽히 리빌딩했습니다. 반면, 대다수 중소기업(SME)과 스타트업은 막대한 클라우드 구동 비용과 라이선스 금액, 그리고 고도로 전문화된 AI 핵심 인력을 유지할 자본적 여유가 없습니다. 기술 장벽이 자본 격차를 가속화하고 있는 냉혹한 현실입니다.",
        "그렇다면 작은 기업들은 이대로 도태될 수밖에 없을까요? 대답은 단호히 '아니오'입니다. 생존의 핵심 키워드는 바로 '연대와 파트너십(Solidarity & Partnership)'입니다.",
        "개별 기업은 미약하지만 업종과 특성에 맞는 중소기업들이 데이터 거버넌스를 결성하여 공동으로 파인튜닝된 경량 언어 모델(sLLM)을 개발하거나 마케팅 인프라를 공유하는 방식을 취해야 합니다. 독자 생존이 불가능한 구조라면, 상호 보완적인 파트너들이 모여 하나의 단단한 얼라이언스를 구축하는 것이 자본적 소외를 정면 돌파할 유일한 탈출구입니다."
      ],
      EN: [
        "The year 2026 marks a decisive turning point in history where artificial intelligence and workflow automation have evolved beyond mere assistant tools, deeply infiltrating core industrial decision-making.",
        "While global conglomerates have re-engineered their entire pipelines using multi-billion dollar infrastructures, small and medium enterprises (SMEs) face a harsh bottleneck. The soaring cloud compute fees, software licensing costs, and scarcity of senior talent make independent R&D highly prohibitive.",
        "Does this imply smaller teams are destined to be left behind? The answer is a resounding no. The singular key to survival in this era is 'Solidarity & Partnership'.",
        "By pooling resources to train vertical-specific small language models (sLLMs) or sharing marketing reach through collaborative alliances, small businesses can bypass the heavy capital bottleneck. When independent scaling fails, strategic alignment succeeds."
      ]
    },
    socialExcerpts: {
      ratio1x1: [
        "2026년 AI 대격변,\n중소기업의 생존 전략은?",
        "대기업이 자본력으로\nAI 독점 구조를 만들 때,\n작은 기업들은 각개전투로\n살아남을 수 없습니다.",
        "답은 '연대'에 있습니다.\n경량화 모델(sLLM) 공동 구축,\n마케팅 파트너십 결성을 통해\n장벽을 허물어야 합니다."
      ],
      ratio9x16: [
        "SME 생존 리포트:\nAI 독점을 깨는 법",
        "자본의 차이가\n기술의 격차가 되는\n냉혹한 2026년 비즈니스.",
        "독자 생존 대신\n단단한 동맹을 통해\n함께 스케일업하세요."
      ]
    }
  },
  {
    slug: "authenticity-marketing-strategy",
    date: "2026-04-18",
    author: "Tyler Rasch",
    category: { KR: "진정성 & 브랜딩", EN: "Authenticity & Branding" },
    title: {
      KR: "광고 피로도 극복의 열쇠: 메시지의 '맥락적 진정성'을 확보하는 법",
      EN: "Overcoming Ad Fatigue: Securing Contextual Authenticity in Modern Media"
    },
    excerpt: {
      KR: "자극적인 클릭 미끼와 스팸성 광고에 지친 소비자들에게 깊은 울림을 남기기 위한 진정성 중심 브랜딩 철학을 논합니다.",
      EN: "Exploring branding strategies that build long-term enterprise value by shifting from transactional ad clicks to deep, purpose-driven narratives."
    },
    body: {
      KR: [
        "오늘날 소비자들은 역사상 그 어느 때보다 교묘하고 영리한 광고와 미끼성 마케팅에 무차별적으로 노출되어 있습니다. 그에 비례해 마케팅 피로도는 사상 최고조에 달했으며, 단순 노출 수치는 더 이상 매출 전환으로 연결되지 않습니다.",
        "이러한 불신의 시대에 소비자의 지갑을 열고 마음을 움직이는 유일한 힘은 '맥락적 진정성(Contextual Authenticity)'입니다. 즉, 브랜드의 철학이 단순히 듣기 좋은 슬로건에 그치지 않고, 고객이 겪는 페인 포인트를 진심으로 공감하고 실현할 수 있는 행동으로 드러나야 함을 뜻합니다.",
        "타일러 미디어가 오리지널 시리즈나 브랜드 파트너십을 진행할 때 가장 우선시하는 가치 역시 진정성입니다. 우리는 타일러 라쉬 본인의 삶의 태도(환경 보호, 학문적 탐구, 글로벌 시각)와 완벽히 교차하는 맥락에 있는 브랜드와만 협업을 진행합니다. 억지스러운 제품 강요가 아니라, 가치의 결이 일치하는 파트너십을 추구할 때 비로소 광고는 콘텐츠가 되고, 신뢰는 브랜드 자산으로 축적됩니다."
      ],
      EN: [
        "Consumers today are bombarded with clickbaits and aggressive algorithms. As a result, ad fatigue has reached an all-time high, and superficial impression metrics no longer guarantee customer loyalty.",
        "In this age of skepticism, the only currency that retains long-term value is 'Contextual Authenticity'. A brand's core mission must not remain a written slogan; it must manifest as aligned, actionable truth that solves tangible problems.",
        "At Tyler Media, authenticity is our absolute baseline. We only form partnerships with brands whose values intersect naturally with Tyler's genuine lifestyle—climate action, intellectual integrity, and analytical curiosity. When values align, sponsorship elevates to storytelling, and skepticism shifts to solid trust."
      ]
    },
    socialExcerpts: {
      ratio1x1: [
        "아무리 돈을 써도\n광고 효율이 떨어지는 이유",
        "소비자들은 더 이상\n단순한 노출에 속지 않습니다.\n피로도를 넘는 핵심은\n'맥락적 진정성'입니다.",
        "강요된 PPL 대신\n브랜드 철학과 결이 맞는\n이야기를 건네세요."
      ],
      ratio9x16: [
        "신뢰의 붕괴 시대,\n진정성을 입히는 방법",
        "억지스러운 연출을 빼고\n대표의 진짜 고집과\n스토리를 오픈하세요.\n그것이 무적의 광고판입니다."
      ]
    }
  }
];
