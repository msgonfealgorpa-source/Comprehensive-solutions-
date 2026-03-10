import { MetadataRoute } from 'next';
import { getAllSlugs, getCategories } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const slugs = getAllSlugs();
  const categories = getCategories();
  const today = new Date().toISOString();
  
  // صفحات المقالات
  const articlePages = slugs.map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // صفحة رئيسية
  const homePage = {
    url: baseUrl,
    lastModified: today,
    changeFrequency: 'daily' as const,
    priority: 1.0,
  };

  return [homePage, ...articlePages];
}
