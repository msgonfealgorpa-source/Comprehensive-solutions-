import { MetadataRoute } from 'next';
import { getAllSlugs, getCategories } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  // استخدام رابطك على Railway كبديل افتراضي لتجنب أخطاء localhost في الإنتاج
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://universal-ai-life-os.up.railway.app';
  
  // جلب البيانات مع تأمينها بمصفوفة فارغة لتجنب تعطل البناء إذا لم توجد مقالات بعد
  const slugs = getAllSlugs() || [];
  const categories = getCategories() || [];
  const today = new Date(); // Next.js يفضل كائن Date المباشر

  // 1. الصفحة الرئيسية
  const homePage: MetadataRoute.Sitemap[number] = {
    url: baseUrl,
    lastModified: today,
    changeFrequency: 'daily',
    priority: 1.0,
  };

  // 2. صفحات المقالات
  const articlePages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. صفحات الأقسام (قمت بإضافتها لأنك استدعيتها ولم تستخدمها)
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`, // عدل كلمة /category/ إذا كان مسار الأقسام مختلفاً لديك
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // دمج كل الروابط وإرجاعها
  return [homePage, ...categoryPages, ...articlePages];
}
