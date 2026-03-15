"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PolicyPage() {
  const [lang, setLang] = useState<'KR' | 'EN'>('KR');

  return (
    <div className="min-h-screen bg-[#02060C] text-zinc-300 font-sans selection:bg-accent selection:text-black word-keep-all">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#02060C]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6 md:px-12">
        <a href="/" className="font-black text-xl tracking-tighter leading-none text-white hover:opacity-80 transition-opacity">
          TYLER <span className="text-accent">MEDIA</span>
        </a>
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-full relative w-24">
          <motion.div
            animate={{ x: lang === 'EN' ? '100%' : '0%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-accent rounded-full"
          />
          <button
            onClick={() => setLang('KR')}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === 'KR' ? 'text-black' : 'text-zinc-500'}`}
          >
            KR
          </button>
          <button
            onClick={() => setLang('EN')}
            className={`relative z-10 flex-1 py-1 text-xs font-black transition-colors ${lang === 'EN' ? 'text-black' : 'text-zinc-500'}`}
          >
            EN
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {lang === 'KR' && (
            <motion.div
              key="KR"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="mb-16">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep tracking-tight leading-tight">개인정보 및 AI 데이터 처리방침</h1>
                <p className="text-accent font-mono text-sm uppercase tracking-widest mb-8">Personal Data & AI Use Policy</p>
                <div className="text-zinc-400 space-y-4 leading-relaxed bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                  <p className="font-bold text-white">주식회사 큰미르 (KNMIR INC.)</p>
                  <p>주식회사 큰미르(이하 “회사”라 함)는 정보주체의 자유와 권리를 보호하기 위해 「개인정보 보호법」 제30조 및 관련 법령에 따라 개인정보 처리 및 인공지능(AI) 데이터 활용에 관한 방침을 다음과 같이 수립하여 공개합니다.</p>
                  <p>회사는 정보주체의 개인정보를 안전하게 처리하고, 신기술(AI 등) 적용 시 투명성을 보장하며, 관련 고충을 신속하고 원활하게 처리할 수 있도록 최선을 다하고 있습니다.</p>
                </div>
              </div>

              {/* Articles go here securely designed */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제1조 (개인정보의 처리 목적)</h2>
                <p className="leading-relaxed">회사는 다음의 목적을 위하여 최소한의 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 법적 조치를 이행할 것입니다.</p>
                
                <div className="space-y-6 pl-4 border-l-2 border-accent/30">
                  <div>
                    <h3 className="text-white font-bold mb-2">1. 고객 문의 접수 및 서비스 제공 (B2B/B2C)</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li>강연, 토크, 행사, 방송(TV/유튜브 등), 출판, 인터뷰, 광고 등 각종 대중문화예술 또는 콘텐츠 관련 섭외, 출연, 제휴 등에 대한 문의 또는 요청의 접수</li>
                      <li>문의 또는 요청 내용의 타당성 검토, 계약 체결·유지·이행·관리 및 정산</li>
                      <li>서비스 제공에 따른 본인 확인, 연락 유지, 업무 관련 고지사항 전달 및 결과 회신</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">2. 인공지능(AI) 시스템 운영 및 고도화를 위한 데이터 활용 (제7조 참조)</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li>고객의 문의 및 요청 데이터를 활용한 내부 업무 자동화(요청 자동 분류 및 라우팅)</li>
                      <li>시장 트렌드 분석, 적정 단가 모델링 및 협상 전략 수립을 위한 데이터 분석</li>
                      <li>자연어 처리(NLP)를 통한 고객 수요 파악 및 맞춤형 신규 콘텐츠·상품 기획</li>
                      <li>대화형 AI 에이전트를 통한 고객 초기 응대 및 표준 답변 초안 작성</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">3. 마케팅 및 광고에의 활용 (선택적 동의를 한 정보주체에 한함)</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li>회사의 신규 서비스와 상품 안내, 이벤트 정보 제공 및 홍보 메일 발송</li>
                      <li>인구통계학적 특성에 따른 맞춤형 콘텐츠 제공 및 유사 타겟 오디언스 분석</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">4. 서비스 개선 및 웹사이트 통계 분석</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li>웹사이트 방문 빈도와 경로 파악, 웹사이트와 폼 사용 편리성 분석, 폼 상호작용 분석 등 서비스 이용에 대한 통계 추출 및 품질 향상</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제2조 (처리하는 개인정보의 항목 및 수집 방법)</h2>
                <p className="leading-relaxed">회사는 폼(API와 설계 플랫폼 관련 제5조 참조) 제출, 이메일, 웹사이트 상호작용 등을 통해 아래와 같은 개인정보를 수집합니다.</p>
                <div className="space-y-6 pl-4 border-l-2 border-accent/30">
                  <div>
                    <h3 className="text-white font-bold mb-2">1. 필수 수집 항목 (문의자 및 담당자 식별용)</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li>폼 작성자 또는 협업 담당자의 성명(성/이름), 소속(기관/기업/에이전시명 등 소속한 조직명), 직함, 이메일 주소, 전화번호(휴대폰 번호), 조직 주소, 협업이 이뤄질 주소/위치</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">2. 선택 수집 항목 (접수하는 문의 및 폼의 성격에 따라 상이함)</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li><strong className="text-white">행사/강연 관련:</strong> 행사명(가제 포함), 취지, 주최/공동주최 기관, 행사 지역 및 상세 주소, 희망 일정 및 소요 시간, 강연/토크 주제 및 키워드, 대상 인원수 및 집단 특성, 예상된 단가 또는 집행예산</li>
                      <li><strong className="text-white">방송/유튜브 관련:</strong> 매체명, 채널명, 프로그램명, 구독자 수, 채널 링크, MCN 또는 엔터테인먼트 소속 여부와 세부적인 소속 회사 명칭, 촬영 방식(라이브/녹화), 협업이 이뤄질 장소 또는 위치</li>
                      <li><strong className="text-white">출판/인터뷰/광고 관련:</strong> 도서명, 작가명, 인터뷰 매체명 및 링크, 제품/서비스 카테고리, 회사 분류, 광고 매체 및 기간</li>
                      <li><strong className="text-white">기타:</strong> 기획안, 제안서 등 문의 관련 첨부파일, 제공 주신 링크 등 내에 포함된 정보</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">3. 민감정보 및 고유식별정보 처리 제한</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">회사는 원칙적으로 정보주체의 사생활을 현저히 침해할 우려가 있는 민감정보(사상, 신념, 건강 등) 및 고유식별정보(주민등록번호, 여권번호 등)을 수집하지 않습니다. 다만 중소기업 및 스타트업을 대상으로 제공하는 상호경제활성화특가를 제공하기 위해 사업자의 사업자등록증번호, 중소기업확인서, 등기부등본 사본을 수집하는 경우가 있습니다.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">4. 만 14세 미만 아동의 개인정보 처리</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">회사는 만 14세 미만 아동의 개인정보를 고의로 수집하지 않으며, 서비스 대상자로 특정하지 않습니다. 만 14세 미만 아동의 정보가 수집된 사실을 인지할 경우 즉시 해당 정보를 파기합니다.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제3조 (개인정보의 처리 및 보유 기간)</h2>
                <div className="space-y-4 leading-relaxed text-zinc-300">
                  <p>① 회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 수집 시에 동의받은 기간 내에서 개인정보를 처리 및 보유합니다.</p>
                  <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>
                  <ul className="list-disc pl-9 space-y-2 text-sm text-zinc-400">
                    <li>고객 문의, 요청 접수 및 서비스 제공 정보: 수집일로부터 5년</li>
                    <li>계약, 대금 결제 및 재화 등의 공급에 관한 기록: 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 5년</li>
                    <li>소비자의 불만 또는 분쟁 처리에 관한 기록: 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 3년</li>
                  </ul>
                  <p>③ 전항의 5년 보유 기간이 경과한 데이터는 원칙적으로 즉시 파기됩니다. 다만, 회사의 시장 분석, 서비스와 상품 개발, AI 모델 사용과 훈련을 위해 ‘완전한 익명처리’를 거친 데이터는 영구 자산으로 보관될 수 있습니다 (제4조 참조).</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제4조 (개인정보의 파기 절차 및 익명처리 방법)</h2>
                <div className="space-y-4 leading-relaxed text-zinc-300">
                  <div>
                    <h3 className="font-bold text-white mb-2">① 파기 절차</h3>
                    <p className="text-sm text-zinc-400">회사는 보유기간(5년)이 경과하거나 처리 목적이 달성된 개인정보를 지체 없이 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 영구 삭제하며, 종이 문서는 파쇄기로 분쇄합니다.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-2">② 익명처리 (PIPA 제58조의2 적용 제외 관련)</h3>
                    <p className="text-sm text-zinc-400 mb-2">회사는 시장 트렌드 파악, 수요 예측, 인공지능(AI) 모델의 지속적인 학습을 위하여 5년의 보유기간이 경과하는 시점에 데이터의 ‘익명처리(Anonymization)’를 수행합니다.</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li>이름, 전화번호, 이메일 등 개인을 특정할 수 있는 모든 직·간접적 식별정보와 매칭 키(Key)를 영구적으로 삭제 또는 범주화하여, 시간·비용·기술 등을 합리적으로 고려할 때 다른 정보를 사용하여도 더 이상 특정 개인을 알아볼 수 없도록 조치합니다.</li>
                      <li>이렇게 완전히 익명화된 데이터는 「개인정보 보호법」의 적용을 받지 않으며, 회사의 지적 재산으로서 데이터 웨어하우스에 영구 보존되어 시장 분석, 서비스와 상품 개발, AI 고도화에 활용됩니다.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제5조 (개인정보 처리의 위탁)</h2>
                <p className="leading-relaxed text-zinc-300 overflow-x-auto">회사는 원활한 업무 처리 및 시스템 연동을 위하여 다음과 같이 개인정보 처리 업무를 위탁하고 있으며, 수탁자가 개인정보를 안전하게 처리하도록 관리·감독하고 있습니다.</p>
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm text-left align-top min-w-[700px]">
                    <thead className="text-xs text-white uppercase bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4">수탁자 (서비스명)</th>
                        <th className="px-6 py-4">위탁하는 업무의 내용</th>
                        <th className="px-6 py-4">보유 및 이용 기간</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-zinc-400">
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Google Workspace</td>
                        <td className="px-6 py-4">이메일 송수신, 클라우드 문서 및 데이터 스프레드시트 저장</td>
                        <td className="px-6 py-4">제3조의 보유기간과 동일</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Typeform</td>
                        <td className="px-6 py-4">고객 폼(Form) 접수 및 데이터 호스팅</td>
                        <td className="px-6 py-4">제3조의 보유기간과 동일</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">HubSpot</td>
                        <td className="px-6 py-4">고객 관계 관리(CRM), 영업 파이프라인 관리, 마케팅 이메일 발송</td>
                        <td className="px-6 py-4">제3조의 보유기간과 동일</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Notion</td>
                        <td className="px-6 py-4">내부 데이터베이스 구축, 업무 협업 및 기록</td>
                        <td className="px-6 py-4">제3조의 보유기간과 동일</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Slack</td>
                        <td className="px-6 py-4">내부 임직원 간 알림 수신, 업무 커뮤니케이션</td>
                        <td className="px-6 py-4">제3조의 보유기간과 동일</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Zapier</td>
                        <td className="px-6 py-4">시스템 및 앱 간 API 데이터 자동 연동, 라우팅</td>
                        <td className="px-6 py-4">자동화 처리 완료 후 즉시 파기 또는 제3조의 보유기간</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">N8N</td>
                        <td className="px-6 py-4">시스템 및 앱 간 API 데이터 자동 연동, 라우팅</td>
                        <td className="px-6 py-4">자동화 처리 완료 후 즉시 파기 또는 제3조의 보유기간</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Mattermost</td>
                        <td className="px-6 py-4">보안 통신 및 자체 호스팅 환경에서의 커뮤니케이션 관리</td>
                        <td className="px-6 py-4">제3조의 보유기간과 동일</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제6조 (개인정보의 국외 이전)</h2>
                <p className="leading-relaxed text-zinc-300">회사가 위탁하는 클라우드 및 SaaS 서비스의 대부분은 글로벌 사업자로, 시스템 운영상 불가피하게 고객의 개인정보가 국외의 데이터센터(서버)로 이전 및 보관됩니다. 회사는 해당 기업들이 적절한 보안 조치를 취하도록 요구하고 있습니다.</p>
                <div className="overflow-x-auto rounded-xl border border-white/10 mb-6">
                  <table className="w-full text-sm text-left align-top min-w-[900px]">
                    <thead className="text-xs text-white uppercase bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4">이전받는 자(플랫폼)</th>
                        <th className="px-6 py-4">이전되는 국가</th>
                        <th className="px-6 py-4">이전 일시 및 방법</th>
                        <th className="px-6 py-4 w-[15%]">이전되는 항목</th>
                        <th className="px-6 py-4">이전 목적 및 보유기간</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-zinc-400">
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Google Workspace</td>
                        <td className="px-6 py-4">미국, 유럽 등</td>
                        <td className="px-6 py-4">제출/업무 시 네트워크 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">데이터 저장(제3조 기준)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Typeform</td>
                        <td className="px-6 py-4">미국 (Virginia) 등</td>
                        <td className="px-6 py-4">폼 제출 시 자동 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">데이터 수집/호스팅(제3조 기준)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">HubSpot</td>
                        <td className="px-6 py-4">미국, 유럽 등</td>
                        <td className="px-6 py-4">CRM 등록 시 자동 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">CRM 관리(제3조 기준)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Notion</td>
                        <td className="px-6 py-4">미국 (Oregon) 등</td>
                        <td className="px-6 py-4">내부 DB 기입 시 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">DB 관리(제3조 기준)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Slack</td>
                        <td className="px-6 py-4">미국 등</td>
                        <td className="px-6 py-4">사내 알림 수신 시 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">내부 커뮤니케이션(제3조 기준)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Zapier / N8N</td>
                        <td className="px-6 py-4">미국, 유럽 등</td>
                        <td className="px-6 py-4">워크플로우 실행 시 즉시 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">시스템 연동(제3조 기준)</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4 font-bold text-white">Mattermost</td>
                        <td className="px-6 py-4">한국, 미국 등</td>
                        <td className="px-6 py-4">사내 알림 수신 시 전송</td>
                        <td className="px-6 py-4">개인정보 전 항목</td>
                        <td className="px-6 py-4">보안 커뮤니케이션(제3조 기준)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white/5 border border-accent/20 p-4 rounded-xl">
                  <p className="text-sm text-zinc-300">💡 정보주체는 “데이터 및 개인정보 보호책임자(CDPO)”(<a href="mailto:data@knmir.com" className="text-accent hover:underline">data@knmir.com</a>)에게 이메일을 통해 개인정보의 국외 이전을 거부할 수 있습니다. 단, 거부하실 경우 글로벌 클라우드망을 사용하는 회사의 시스템 특성상 문의 접수 및 서비스 제공이 불가할 수 있습니다.</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제7조 (인공지능(AI) 기반 데이터 처리 및 투명성 안내)</h2>
                <p className="leading-relaxed">회사는 업무 효율성 극대화와 서비스 품질 향상을 위해 「인공지능 발전과 신뢰 기반 조성 등에 관한 기본법」 에 의거하여 아래와 같이 인공지능 기술을 활용하고 있습니다.</p>
                <div className="space-y-6 pl-4 border-l-2 border-accent/30">
                  <div>
                    <h3 className="text-white font-bold mb-2">1. AI 모델의 활용 목적 및 방식</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
                      <li><strong className="text-white">업무 자동화 및 적합성 평가:</strong> 접수된 문의, 요청 내용을 대형 언어 모델(LLM)을 통해 1~100점 척도로 사전 스코어링하여 담당자에게 라우팅합니다.</li>
                      <li><strong className="text-white">동적 가격 책정 및 제안서 작성:</strong> 누적된 거래 데이터와 시장 트렌드 데이터를 분석하여 최적화된 단가 산정 보조 및 맞춤형 텍스트를 자동 생성합니다.</li>
                      <li><strong className="text-white">수요 분석:</strong> 텍스트 데이터에 자연어 처리(NLP)를 적용하여 핵심 키워드 및 수요를 추출합니다.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">2. 자동화된 결정에 대한 정보주체의 권리 보장 (PIPA 제37조의2)</h3>
                    <p className="text-sm text-zinc-400 mb-2">회사의 AI 시스템은 섭외 요청의 적합성 평가 및 업무 분류를 "보조"하는 역할을 수행합니다. 모든 주요 결정(계약 체결 및 거절 등)은 반드시 실존 인간인 담당자(Human-in-the-loop)의 최종 검토와 판단을 거칩니다.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">3. 생성형 AI 에이전트 도입에 따른 사전 고지 (투명성 의무)</h3>
                    <p className="text-sm text-zinc-400">향후 회사의 웹사이트나 자동 응답 등에서 AI 에이전트가 도입될 수 있으며, 이 경우 정보주체가 AI와 상호작용하고 있음을 사전에 명확히 고지할 것입니다.</p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제8조 (개인정보의 제3자 제공)</h2>
                <p className="leading-relaxed text-zinc-300">회사는 원칙적으로 정보주체의 개인정보를 제1조에서 명시한 목적 범위 내에서만 처리하며, 정보주체의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공(판매, 공유 포함)하지 않습니다.</p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">제9조 ~ 제14조 (권리, 안전확보, 책임자 등 종합)</h2>
                <div className="space-y-6 pl-4 border-l-2 border-accent/30 text-sm text-zinc-400">
                  <div>
                    <h3 className="text-white font-bold mb-2">정보주체의 권리 및 행사 (제9조)</h3>
                    <p>정보주체는 언제든지 열람, 정정, 삭제, 처리정지 및 전송 요구권(Data Portability)을 행사할 수 있으며, 이메일 요청 시 지체 없이 조치합니다.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">쿠키 위치 및 거부 (제10조)</h3>
                    <p>서비스 이용 통계 수집을 위해 Google Analytics, Meta Pixel 등을 운용하나, 타겟팅 광고 목적으로는 사용하지 않습니다. 브라우저 설정으로 거부 가능합니다.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">안전성 확보 조치 (제11조)</h3>
                    <p>내부 관리계획 수립, 개인정보처리시스템 접근 제한, 데이터 암호화 및 물리적 접근 통제를 실시하고 있습니다.</p>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">데이터 및 개인정보 보호책임자 (CDPO) (제12조)</h3>
                    <ul className="list-disc pl-5 mt-2">
                      <li>직책: Chief Data & Privacy Officer (CDPO)</li>
                      <li>이메일: data@knmir.com</li>
                      <li>전화: 070-4571-5675</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-2">시행 일자 (제14조)</h3>
                    <p className="font-bold text-accent">2026년 03월 14일</p>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {lang === 'EN' && (
            <motion.div
              key="EN"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div className="mb-16">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 break-keep tracking-tight leading-tight">Personal Data & AI Use Policy</h1>
                <p className="text-accent font-mono text-sm uppercase tracking-widest mb-8">개인정보 및 업무 데이터 처리방침</p>
                <div className="text-zinc-400 space-y-4 leading-relaxed bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                  <p className="font-bold text-white">KNMIR INC.</p>
                  <p>KNMIR INC. (hereinafter referred to as the “Company”) establishes and discloses the following policy regarding the processing of personal information and the utilization of artificial intelligence (AI) data in accordance with Article 30 of the Personal Information Protection Act to protect the freedom and rights of data subjects.</p>
                </div>
              </div>

              {/* EN Articles (Summarized appropriately for presentation) */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Article 1 (Purpose of Processing)</h2>
                <div className="space-y-4 pl-4 border-l-2 border-accent/30 text-sm text-zinc-400">
                  <p>1. Receiving B2B/B2C inquiries regarding casting, appearances, and partnerships, as well as contract management.</p>
                  <p>2. Utilization of data for the operation and advancement of AI systems (refer to Article 7) including business automation and NLP analysis.</p>
                  <p>3. Use for marketing (limited to optional consent) and service/website statistics improvement.</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Article 2 (Items Collected)</h2>
                <div className="space-y-4 pl-4 border-l-2 border-accent/30 text-sm text-zinc-400">
                  <p>1. Required: Name, affiliation, title, email, phone number, and address.</p>
                  <p>2. Optional: Specific event/broadcast details, budget, links, etc. depending on form submitted.</p>
                  <p>3. We do not collect sensitive or unique identification information, except where required for SME validation benefits.</p>
                  <p>4. We do not intentionally collect data of children under 14.</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Article 3 & 4 (Retention & Destruction)</h2>
                <p className="leading-relaxed text-zinc-300">Data is retained for 5 years or per relevant laws. Following retention periods, data is permanently destroyed. However, data that undergoes "Complete Anonymization" (all direct/indirect identifiers permanently removed) becomes intellectual property stored in our data warehouse to train AI and predict market trends safely, excluded from PIPA restrictions.</p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Article 5 & 6 (Outsourcing & Overseas Transfer)</h2>
                <p className="leading-relaxed text-zinc-300">To ensure efficient workflow and automation, personal information may be transferred over global networks to trusted SaaS operators such as Google Workspace, Typeform, HubSpot, Slack, Zapier, and Mattermost. These services process data for CRM, communication, and automation routing purposes within standard retention limits.</p>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Article 7 (Guidelines on AI-based Data Processing)</h2>
                <div className="space-y-4 pl-4 border-l-2 border-accent/30 text-sm text-zinc-400">
                  <p>1. AI models are used for request conformity assessment (LLM scoring) and dynamic pricing trend analysis.</p>
                  <p>2. The AI system purely "assists" routing. All final material decisions (e.g., contract refusal) are reviewed and judged by a human-in-the-loop, bypassing automated decision risks.</p>
                  <p>3. Should generative AI agents for customer service be deployed, data subjects will be notified preemptively of AI interactions.</p>
                </div>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">Further Rights & Contact (Art 8 ~ 14)</h2>
                <ul className="list-disc pl-9 space-y-2 text-sm text-zinc-400">
                  <li>We do not provide data to unapproved third parties (No selling or sharing out of scope).</li>
                  <li>Users maintain rights to access, correction, deletion, and data portability anytime via email.</li>
                  <li>Tracking pixels (Google Analytics, Meta) are used strictly for service metrics, not custom targeting.</li>
                  <li><strong className="text-white">Chief Data & Privacy Officer (CDPO):</strong> data@knmir.com / +82-70-4571-5675</li>
                  <li><strong className="text-white">Effective Date:</strong> March 14, 2026</li>
                </ul>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
