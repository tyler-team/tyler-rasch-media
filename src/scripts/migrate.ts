import { createClient } from '@sanity/client';
import { pressReleases } from '../data/pressData';
import { blogPosts } from '../data/blogData';

// Get write token from environment variable
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("Error: Please set the SANITY_WRITE_TOKEN environment variable.");
  console.error("You can generate a Write Token at: https://manage.sanity.io -> API -> Add API Token");
  process.exit(1);
}

const client = createClient({
  projectId: 'ix8f0bbf',
  dataset: 'production',
  apiVersion: '2026-06-07',
  token: token,
  useCdn: false,
});

async function migrate() {
  console.log("Starting migration to Sanity...");

  // 1. Migrate Press Releases
  for (const pr of pressReleases) {
    const doc = {
      _type: 'pressRelease',
      _id: `press-${pr.slug}-${pr.lang}`,
      title: pr.title,
      slug: { _type: 'slug', current: pr.slug },
      lang: pr.lang,
      date: pr.date,
      subtitle: pr.subtitle,
      byline: pr.byline,
      intro5W1H: pr.intro5W1H,
      body: pr.body,
      boilerplate: pr.boilerplate,
    };
    
    console.log(`Uploading Press Release: "${pr.title}" (${pr.lang.toUpperCase()})...`);
    await client.createOrReplace(doc);
  }

  // 2. Migrate Blog Posts
  for (const post of blogPosts) {
    const doc = {
      _type: 'blogPost',
      _id: `blog-${post.slug}`,
      title: post.title.EN, // Internal reference title in Sanity Studio
      slug: { _type: 'slug', current: post.slug },
      date: post.date,
      author: post.author,
      category: post.category,
      blogTitle: post.title,
      excerpt: post.excerpt,
      body: post.body,
    };

    console.log(`Uploading Blog Post: "${post.title.KR}"...`);
    await client.createOrReplace(doc);
  }

  console.log("Migration completed successfully! Check your Sanity Studio at /admin.");
}

migrate().catch(err => {
  console.error("Migration failed:", err);
});
