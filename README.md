# 🚀 Programmatic SEO Blog

موقع مدونة يعتمد على فكرة Programmatic SEO لتوليد آلاف المقالات تلقائياً.

## 📁 هيكل الملفات البسيط

```
├── src/
│   ├── lib/
│   │   └── articles-data.ts      # ⭐ Backend - قاعدة البيانات والتوليد
│   └── app/
│       ├── page.tsx              # ⭐ Frontend - الصفحة الرئيسية
│       ├── [slug]/page.tsx       # ⭐ Frontend - صفحات المقالات
│       ├── layout.tsx            # التخطيط الأساسي
│       ├── sitemap.ts            # خريطة الموقع
│       ├── robots.ts             # إعدادات محركات البحث
│       └── not-found.tsx         # صفحة 404
├── package.json
├── next.config.ts
└── tailwind.config.ts
```

## ⚡ التثبيت والتشغيل

```bash
# تثبيت المتطلبات
bun install

# تشغيل الموقع
bun run dev
```

## 🎯 إضافة مقالات جديدة

افتح ملف `src/lib/articles-data.ts` وأضف إلى `KEYWORDS_DATABASE`:

```typescript
'your-new-keyword': {
  category: 'الفئة',
  variations: ['العنوان الرئيسي', 'متغير آخر'],
  problem: 'وصف المشكلة',
  context: 'سياق المشكلة'
}
```

سيتم توليد صفحة جديدة تلقائياً على المسار: `/your-new-keyword`

## ✨ الميزات

- ✅ **توليد صفحات ديناميكي** - صفحات HTML ثابتة لكل مقال
- ✅ **SEO محسّن** - Meta Tags, Open Graph, Twitter Cards
- ✅ **Schema Markup** - FAQ Schema + Article Schema
- ✅ **URL نظيفة** - `/computer-wont-start`, `/slow-computer`
- ✅ **Sitemap.xml** - توليد تلقائي
- ✅ **تصميم عربي RTL** - واجهة باللغة العربية
- ✅ **سرعة عالية** - Static Site Generation

## 📊 المقالات المتوفرة (20 مقال)

| الفئة | عدد المقالات |
|-------|-------------|
| مشاكل الحاسوب | 3 |
| الشبكات | 1 |
| الأجهزة الطرفية | 1 |
| البيانات | 1 |
| الأمان | 1 |
| النظام | 1 |
| الحسابات | 1 |
| التطبيقات | 2 |
| الهواتف | 6 |
| الاتصال | 1 |
| الصوت | 1 |

## 🛠️ التقنيات المستخدمة

- **Next.js 15** - App Router
- **TypeScript**
- **Tailwind CSS**
- **Server Components** - Static Generation

## 📝 License

MIT License
