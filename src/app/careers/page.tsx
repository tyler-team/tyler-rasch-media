import { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
  description: '타일러 미디어 세일즈 & PR 인턴십 서류 접수 마감 안내 및 10월 19일 신규 채용 공고 오픈 예정',
  openGraph: {
    title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
    description: '타일러 미디어 세일즈 & PR 인턴십 서류 접수 마감 안내 및 10월 19일 신규 채용 공고 오픈 예정',
    type: 'website',
    url: 'https://tylerrasch.com/careers',
  },
};

export default function CareersPage() {
  return <Home initialView="careers" />;
}
