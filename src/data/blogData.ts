export interface BlogPost {
  slug: string;
  date: string;
  author: string;
  category: { KR: string; EN: string };
  title: { KR: string; EN: string };
  excerpt: { KR: string; EN: string };
  body: { KR: string[]; EN: string[] };
  socialExcerpts?: {
    ratio1x1: string[];
    ratio9x16: string[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "tyler-media-sme-program-guide",
    date: "2026-06-01",
    author: "Tyler Media Team",
    category: { KR: "상생 & 마케팅", EN: "Support & Marketing" },
    title: {
      KR: "마케팅 예산 0원으로 타일러볼까요 PPL 주인공이 되는 법: SME·스타트업 지원 프로그램 가이드",
      EN: "Redefining Market Access: The Tyler Media SME & Startup Support Program"
    },
    excerpt: {
      KR: "타일러 미디어가 국내 우수 중소기업, 소상공인, 스타트업의 자립을 응원하며 광고 장벽을 제거하는 무료 PPL 상생 비전 가이드.",
      EN: "An operational guide on how early-stage startups and small businesses in South Korea can secure zero-cost product placement on Tylerbolkkayo."
    },
    body: {
      KR: [
        "안녕하세요, 타일러 미디어 팀입니다.",
        "대한민국 경제를 지탱하는 기업의 99%는 중소기업과 소상공인, 그리고 이제 막 걸음마를 뗀 스타트업입니다. 하지만 냉정하게도 현재의 디지털 마케팅 및 광고 시장은 자본력을 갖춘 대기업과 대형 대행사 중심으로 움직이고 있습니다. 좋은 제품과 혁신적인 서비스를 개발하고도 마케팅 예산 장벽에 부딪혀 빛을 보지 못하는 대표님들의 고군분투는 지금 이 순간에도 계속되고 있습니다.",
        "이러한 문제를 해결하기 위해, 사업가 및 방송인 타일러 라쉬가 이끄는 타일러 미디어가 실질적인 해법을 제시합니다. 지난 6월 1일부터 공식 시작된 [타일러 미디어 SME & STARTUP SUPPORT PROGRAM]을 소개합니다.",
        "왜 우리는 이 프로그램을 시작했을까요?\n타일러 미디어의 크루들 역시 대한민국에서 맨땅에 헤딩하며 비즈니스를 일궈온 경험이 있습니다. 한국의 창업 생태계는 때로 한 번의 실수가 치명적인 결과로 이어지는 냉혹한 현실과 마주합니다. 특히 2026년, AI와 자동화 기술이 산업 전반을 재편하는 매크로적 변화 속에서 작은 기업들이 생존할 수 있는 유일한 열쇠는 바로 '연대'와 '상생'입니다.",
        "우리는 마케팅 비용이 없어 본질적인 성장에 집중하지 못하는 대표님들의 답답함을 덜어드리고자 합니다. 타일러 미디어가 제공하는 무료 PPL은 단순한 광고 송출을 넘어, \"당신의 혁신은 응원받을 가치가 있다\"는 연대의 메시지입니다.",
        "선정 기업 및 참여 기업을 위한 압도적 혜택\n본 프로그램은 참여하는 모든 기업에게 리스크 없는 성장 파트너십을 제안합니다.",
        "최종 선정 기업 혜택: 미디어 플랫폼 '타일러볼까요'의 오리지널 시리즈 콘텐츠 내에 귀사의 제품이나 서비스를 자연스럽게 녹여내는 무료 PPL 제작 및 노출을 지원합니다.",
        "모든 지원 기업 혜택: 최종 선정이 되지 않더라도 실망하실 필요 없습니다. 지원 자격을 갖춘 모든 적격 사업체에게는 향후 타일러 미디어와 유료 광고 협업 시 적용되는 광고 단가 전용 할인 혜택을 제공합니다.",
        "네트워킹 기회: 분기별로 개최되는 타일러 미디어 파트너사 오프라인 네트워킹 모임에 초대되어, 이종 산업 간의 협업 및 비즈니스 확장의 기회를 잡을 수 있습니다.",
        "지원 대상 및 심사 일정 안내\n지원 대상: 중소기업, 스타트업, 소상공인, 개인 자영업자 등 고유 브랜드를 개발하는 모든 독립 사업체 (업종 제한 없음).",
        "지원 불가 대상: 프랜차이즈 가맹 본부 및 소유 매장, 대기업 자회사 및 대규모 지분 보유사는 공평성을 위해 제외됩니다.",
        "필수 조건: 광고가 온에어되는 시점에 소비자가 실제로 구매하거나 이용할 수 있는 제품·서비스 상태여야 합니다.",
        "본 프로그램은 365일 상시 접수로 운영되며, 매 분기 첫 달(4월, 7월, 10월, 1월) 1일부터 15일 사이에 집중 심사를 거쳐 다음 분기에 콘텐츠가 본격 기획 및 송출됩니다. 단 5분이면 온라인으로 간편하게 접수가 가능하므로 타일러 미디어 공식 홈페이지 내 [SME/스타트업 지원] 탭을 통해 지금 바로 혁신의 기회를 잡으세요.",
        "또한, 오는 6월 9일부터 12일까지 진행되는 서울푸드 박람회 현장에서도 본 SME 스타트업 프로그램의 상세 비전과 파트너십 안내를 직접 대면으로 소개해 드릴 예정이오니 현장 방문객분들의 많은 관심 부탁드립니다."
      ],
      EN: [
        "The digital marketing landscape requires capital. For independent businesses and early-stage startups in South Korea, securing visibility often means competing against the vast advertising budgets of multinational corporations and established conglomerates. To address this imbalance, Tyler Media launched the SME & Startup Support Program on June 1.",
        "Our objective is straightforward: to leverage the production capacity and audience reach of Tylerbolkkayo to provide tangible market access for independent businesses.",
        "Core Mechanics of the Support Program\nThe program is structured to provide high-leverage media assets without the associated financial risk.",
        "Zero-Cost PPL Integration: Selected businesses will receive free product placement seamlessly integrated into Tylerbolkkayo’s original video series. This provides immediate exposure to our core demographic of professionals and decision-makers.",
        "Universal Ad Rate Reductions: We recognize that not every applicant can be selected for immediate PPL. Therefore, all eligible companies that apply receive specialized, discounted rates for future advertising services with Tyler Media.",
        "Quarterly B2B Networking: Beyond media exposure, Tyler Media hosts offline quarterly networking events, connecting founders and facilitating cross-industry partnerships.",
        "Eligibility and Next Steps\nTo maintain the integrity of the program and ensure resources reach those who need them most, eligibility is strictly defined. We welcome applications from independent startups, SMEs, and local business owners across all sectors. However, franchise headquarters, subsidiary branches, and large corporate affiliates are excluded.",
        "Applications are processed on a continuous, 365-day basis, with focused evaluations occurring at the start of each quarter.",
        "For industry professionals attending Seoul Food 2026 (June 9-12), our team will be on-site to discuss program mechanics and potential partnerships in person.",
        "To submit an application and access the official checklist, visit the [SME/Startup Support] section at tylerrasch.com."
      ]
    },
    socialExcerpts: {
      ratio1x1: [
        "마케팅 예산 0원 PPL?\n타일러 미디어가 쏩니다!",
        "대기업 광고 독점 시대,\nSME와 스타트업이 살아남는\n유일한 방법은 '상생'입니다.",
        "6월 서울푸드 박람회에서\n상생 파트너십을\n대면으로 만나보세요."
      ],
      ratio9x16: [
        "마케팅 비용 Zero!\n타일러볼까요 무료 PPL 기회",
        "소상공인·스타트업을 위해\n타일러 미디어가 기획한\n상생 마케팅 프로그램.",
        "지금 tylerrasch.com 에서\n5분 만에 신청하세요."
      ]
    }
  }
];
