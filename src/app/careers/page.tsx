import { Metadata } from 'next';
import Home from '../page';

export const metadata: Metadata = {
  title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
  description:
    '타일러 미디어(Knmir Inc.) 채용 안내 페이지입니다. 현재 진행 중인 채용 여부 및 향후 모집 일정을 확인하실 수 있습니다.',
  alternates: {
    canonical: 'https://www.tylerrasch.com/careers',
  },
  openGraph: {
    title: '채용 | 타일러 미디어 (Careers | Tyler Media)',
    description:
      '타일러 미디어(Knmir Inc.) 채용 안내 페이지입니다. 현재 진행 중인 채용 여부 및 향후 모집 일정을 확인하실 수 있습니다.',
    type: 'website',
    url: 'https://www.tylerrasch.com/careers',
  },
};

export default function CareersPage() {
  return <Home initialView="careers" />;
}
