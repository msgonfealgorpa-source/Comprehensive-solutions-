# مدونة Programmatic SEO - حلول تقنية

موقع مدونة عربي لتوليد آلاف المقالات تلقائياً باستخدام Programmatic SEO.

## المميزات

- ✅ **15 مقال مفصل وشامل** - كل مقال يحتوي مقدمة طويلة، 3-5 حلول مفصلة، 4-6 أسئلة شائعة
- ✅ **SEO محسّن بالكامل** - Meta tags, Open Graph, FAQ Schema, Breadcrumb Schema
- ✅ **محتوى عربي RTL** - دعم كامل للغة العربية
- ✅ **URL نظيفة** صديقة لمحركات البحث
- ✅ **Sitemap تلقائي** - يتولد تلقائياً مع كل مقال
- ✅ **تصميم حديث** - Tailwind CSS مع واجهة جميلة

## متطلبات التشغيل

- Node.js 18+ أو Bun
- npm أو bun أو yarn

## التثبيت والتشغيل

```bash
# تثبيت التبعيات
npm install
# أو
bun install

# تشغيل بيئة التطوير
npm run dev
# أو
bun run dev
```

## البناء للإنتاج

```bash
npm run build
npm run start
```

## النشر على Railway

1. ارفع المشروع على GitHub
2. أنشئ مشروع جديد على Railway
3. اربط مستودع GitHub
4. أضف متغير البيئة `NEXT_PUBLIC_SITE_URL` برابط موقعك
5. سيتم النشر تلقائياً

## هيكل المشروع

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # الصفحة الرئيسية
│   │   ├── layout.tsx        # التخطيط الرئيسي
│   │   ├── globals.css       # الأنماط العامة
│   │   ├── sitemap.ts        # توليد sitemap
│   │   ├── robots.ts         # ملف robots
│   │   └── [slug]/
│   │       └── page.tsx      # صفحة المقال
│   └── lib/
│       ├── articles.ts       # قاعدة بيانات المقالات
│       └── utils.ts          # أدوات مساعدة
├── public/
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## إضافة مقالات جديدة

أضف مقالاً جديداً في ملف `src/lib/articles.ts`:

```typescript
'slug-article': {
  slug: 'slug-article',
  title: 'عنوان المقال',
  description: 'وصف المقال',
  keyword: 'الكلمة المفتاحية',
  category: 'system',
  categoryName: 'مشاكل النظام',
  content: `المحتوى المفصل...`,
  solutions: [
    {
      title: 'عنوان الحل',
      description: 'وصف الحل',
      steps: ['خطوة 1', 'خطوة 2'],
      tips: ['نصيحة 1']
    }
  ],
  faq: [
    { question: 'سؤال؟', answer: 'إجابة.' }
  ],
  causes: ['سبب 1', 'سبب 2'],
  preventionTips: ['نصيحة 1', 'نصيحة 2'],
  relatedKeywords: ['كلمة 1', 'كلمة 2'],
  publishedAt: '2024-01-20'
}
```

## الرخصة

MIT License
