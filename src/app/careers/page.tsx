import { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
  description:
    '타일러 미디어(Knmir Inc.) 상시 채용 포지션(Content, Community, Data & Trends, Production) 및 원빅월드쇼(1BWS) 국제시사 리서치 인턴십 안내.',
  alternates: {
    canonical: 'https://www.tylerrasch.com/careers',
  },
  openGraph: {
    title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
    description:
      '타일러 미디어(Knmir Inc.) 상시 채용 포지션 및 원빅월드쇼(1BWS) 국제시사 리서치 인턴십 안내.',
    type: 'website',
    url: 'https://www.tylerrasch.com/careers',
  },
};

export default function CareersPage() {
  return <Home initialView="careers" />;
}
