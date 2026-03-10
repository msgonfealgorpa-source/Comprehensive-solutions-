/**
 * Sitemap.xml - للـ SEO
 */

import { MetadataRoute } from 'next';
import { KEYWORDS_DATABASE } from '@/lib/articles-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  // صفحات المقالات
  const articlePages = Object.keys(KEYWORDS_DATABASE).map(slug => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articlePages,
  ];
}
