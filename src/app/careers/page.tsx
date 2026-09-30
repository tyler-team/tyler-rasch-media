import { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
  description: '타일러 미디어 2026 하반기 기업 협업 & PR 대학생 인턴십 모집 (주 9시간 집중 근무)',
  openGraph: {
    title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
    description: '타일러 미디어 2026 하반기 기업 협업 & PR 대학생 인턴십 모집 (주 9시간 집중 근무)',
    type: 'website',
    url: 'https://tylerrasch.com/careers',
  },
};

export default function CareersPage() {
  return <Home initialView="careers" />;
}
