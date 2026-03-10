/**
 * ========================================
 * Programmatic SEO API Routes
 * ========================================
 * نقاط نهاية API للحصول على المقالات
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesList,
  getCategories,
  getArticlesByCategory,
  generateFAQSchema,
  generateArticleSchema
} from '@/lib/articles-data';

// GET /api/articles - الحصول على جميع المقالات
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');
  const action = searchParams.get('action');

  // الحصول على مقال محدد
  if (slug) {
    const article = getArticleBySlug(slug);
    if (!article) {
      return NextResponse.json(
        { error: 'المقال غير موجود' },
        { status: 404 }
      );
    }

    // إضافة Schemas
    const faqSchema = generateFAQSchema(article.faq);
    const articleSchema = generateArticleSchema(article);

    return NextResponse.json({
      article,
      schemas: {
        faq: faqSchema,
        article: articleSchema
      }
    });
  }

  // الحصول على الفئات
  if (action === 'categories') {
    return NextResponse.json({ categories: getCategories() });
  }

  // الحصول على مقالات حسب الفئة
  if (category) {
    return NextResponse.json({
      articles: getArticlesByCategory(category)
    });
  }

  // الحصول على قائمة المقالات
  if (action === 'list') {
    return NextResponse.json({ articles: getArticlesList() });
  }

  // الحصول على جميع المقالات الكاملة
  return NextResponse.json({
    articles: getAllArticles(),
    total: getAllArticles().length
  });
}
