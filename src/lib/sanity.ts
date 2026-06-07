import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: 'ix8f0bbf',
  dataset: 'production',
  apiVersion: '2026-06-07',
  useCdn: false,
});

export interface PressRelease {
  slug: string;
  date: string;
  lang: 'ko' | 'en';
  title: string;
  subtitle?: string;
  byline?: string;
  intro5W1H?: string;
  body: string[];
  boilerplate?: string;
}

export interface BlogPost {
  slug: string;
  date: string;
  author: string;
  category: {
    KR: string;
    EN: string;
  };
  title: {
    KR: string;
    EN: string;
  };
  excerpt: {
    KR: string;
    EN: string;
  };
  body: {
    KR: string[];
    EN: string[];
  };
}

// Fetch all press releases
export async function getPressReleases(): Promise<PressRelease[]> {
  const query = `*[_type == "pressRelease"] | order(date desc) {
    "slug": slug.current,
    date,
    lang,
    title,
    subtitle,
    byline,
    intro5W1H,
    body,
    boilerplate
  }`;
  return await sanityClient.fetch(query);
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blogPost"] | order(date desc) {
    "slug": slug.current,
    date,
    author,
    category,
    "title": blogTitle,
    excerpt,
    body
  }`;
  return await sanityClient.fetch(query);
}
