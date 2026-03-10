/**
 * ========================================
 * Programmatic SEO Articles Generator
 * ========================================
 * 
 * هذا الملف هو "السيرفر" - مسؤول عن:
 * - تخزين الكلمات المفتاحية
 * - توليد بيانات المقالات ديناميكياً
 * - إدارة المحتوى والـ Schema
 */

// ============================================
// أنواع البيانات
// ============================================

export interface Article {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  content: string;
  solutions: Solution[];
  faq: FAQItem[];
  relatedKeywords: string[];
  createdAt: string;
}

export interface Solution {
  title: string;
  description: string;
  steps: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

// ============================================
// قاعدة بيانات الكلمات المفتاحية
// أضف كلماتك هنا لتوليد آلاف الصفحات
// ============================================

export const KEYWORDS_DATABASE: Record<string, {
  category: string;
  variations: string[];
  problem: string;
  context: string;
}> = {
  // مشاكل الحاسوب
  'computer-wont-start': {
    category: 'مشاكل الحاسوب',
    variations: [
      'الحاسوب لا يعمل',
      'الكمبيوتر لا يقلع',
      'مشكلة تشغيل الحاسوب',
      'الجهاز لا يستجيب'
    ],
    problem: 'الحاسوب لا يعمل عند الضغط على زر التشغيل',
    context: 'مشاكل الطاقة والتمهيد'
  },
  'slow-computer': {
    category: 'مشاكل الحاسوب',
    variations: [
      'الحاسوب بطيء',
      'الكمبيوتر بطيء جداً',
      'تحسين سرعة الجهاز',
      'تسريع الحاسوب'
    ],
    problem: 'الحاسوب يعمل ببطء شديد',
    context: 'الأداء والذاكرة'
  },
  'blue-screen': {
    category: 'مشاكل الحاسوب',
    variations: [
      'شاشة زرقاء',
      'خطأ الشاشة الزرقاء',
      'BSoD',
      'إعادة التشغيل التلقائي'
    ],
    problem: 'ظهور الشاشة الزرقاء وإعادة التشغيل',
    context: 'أخطاء النظام'
  },
  'wifi-not-working': {
    category: 'الشبكات',
    variations: [
      'الواي فاي لا يعمل',
      'مشكلة الاتصال بالإنترنت',
      'لا يوجد اتصال لاسلكي',
      'إصلاح الشبكة'
    ],
    problem: 'عدم القدرة على الاتصال بالشبكة اللاسلكية',
    context: 'الاتصال والشبكات'
  },
  'printer-problems': {
    category: 'الأجهزة الطرفية',
    variations: [
      'الطابعة لا تطبع',
      'مشكلة في الطابعة',
      'الطابعة غير متصلة',
      'إصلاح الطابعة'
    ],
    problem: 'الطابعة لا تستجيب للأوامر',
    context: 'الأجهزة الطرفية'
  },
  'data-recovery': {
    category: 'البيانات',
    variations: [
      'استعادة الملفات المحذوفة',
      'استرجاع البيانات',
      'فقدان الملفات',
      'إصلاح القرص الصلب'
    ],
    problem: 'فقدان ملفات مهمة من الجهاز',
    context: 'استعادة البيانات'
  },
  'virus-removal': {
    category: 'الأمان',
    variations: [
      'إزالة الفيروسات',
      'حماية من البرمجيات الخبيثة',
      'تنظيف الجهاز',
      'مكافحة الفيروسات'
    ],
    problem: 'إصابة الجهاز بفيروسات أو برمجيات خبيثة',
    context: 'الأمان والحماية'
  },
  'windows-update': {
    category: 'النظام',
    variations: [
      'مشكلة تحديث ويندوز',
      'التحديثات لا تكتمل',
      'خطأ في التحديث',
      'تثبيت التحديثات'
    ],
    problem: 'فشل تحديثات نظام ويندوز',
    context: 'صيانة النظام'
  },
  'password-recovery': {
    category: 'الحسابات',
    variations: [
      'استعادة كلمة المرور',
      'نسيت الباسورد',
      'فك الحماية',
      'تغيير كلمة السر'
    ],
    problem: 'نسيان كلمة المرور وعدم القدرة على الدخول',
    context: 'إدارة الحسابات'
  },
  'email-problems': {
    category: 'التطبيقات',
    variations: [
      'مشكلة في البريد الإلكتروني',
      'الإيميل لا يعمل',
      'إصلاح Outlook',
      'مشاكل Gmail'
    ],
    problem: 'مشاكل في إرسال أو استقبال البريد الإلكتروني',
    context: 'التطبيقات والبريد'
  },
  // مشاكل الهواتف
  'phone-wont-charge': {
    category: 'الهواتف',
    variations: [
      'الهاتف لا يشحن',
      'مشكلة الشحن',
      'البطارية لا تشحن',
      'إصلاح منفذ الشحن'
    ],
    problem: 'الهاتف لا يستجيب للشحن',
    context: 'مشاكل البطارية والشحن'
  },
  'phone-overheating': {
    category: 'الهواتف',
    variations: [
      'الهاتف يسخن',
      'ارتفاع حرارة الجوال',
      'سخونة الهاتف',
      'حل مشكلة السخونة'
    ],
    problem: 'ارتفاع درجة حرارة الهاتف بشكل ملحوظ',
    context: 'درجة الحرارة والأداء'
  },
  'phone-slow': {
    category: 'الهواتف',
    variations: [
      'الهاتف بطيء',
      'تسريع الجوال',
      'تحسين أداء الهاتف',
      'الهاتف يعلق'
    ],
    problem: 'بطء استجابة الهاتف وتأخر التطبيقات',
    context: 'أداء الهاتف'
  },
  'phone-storage-full': {
    category: 'الهواتف',
    variations: [
      'ذاكرة الهاتف ممتلئة',
      'تفريغ مساحة الهاتف',
      'حذف الملفات الزائدة',
      'مشكلة التخزين'
    ],
    problem: 'امتلاء ذاكرة الهاتف وعدم القدرة على التثبيت',
    context: 'التخزين والذاكرة'
  },
  'screen-cracked': {
    category: 'الهواتف',
    variations: [
      'شاشة الهاتف مكسورة',
      'إصلاح الشاشة',
      'استبدال شاشة الجوال',
      'كسر الشاشة'
    ],
    problem: 'تضرر شاشة الهاتف من السقوط أو الصدمات',
    context: 'إصلاحات العتاد'
  },
  'water-damage': {
    category: 'الهواتف',
    variations: [
      'الهاتف وقع في الماء',
      'ضرر المياه',
      'إصلاح الهاتف المبلل',
      'نزول الماء في الجوال'
    ],
    problem: 'تعرض الهاتف للماء أو السوائل',
    context: 'إصلاحات الطوارئ'
  },
  'app-crashing': {
    category: 'التطبيقات',
    variations: [
      'التطبيق يغلق تلقائياً',
      'مشكلة في التطبيق',
      'التطبيق يتوقف',
      'إصلاح التطبيقات'
    ],
    problem: 'إغلاق التطبيقات بشكل مفاجئ ومتكرر',
    context: 'مشاكل التطبيقات'
  },
  'bluetooth-issues': {
    category: 'الاتصال',
    variations: [
      'البلوتوث لا يعمل',
      'مشكلة الاتصال اللاسلكي',
      'إقران الأجهزة',
      'إصلاح البلوتوث'
    ],
    problem: 'عدم القدرة على الاتصال عبر البلوتوث',
    context: 'الاتصالات اللاسلكية'
  },
  'no-sound': {
    category: 'الصوت',
    variations: [
      'لا يوجد صوت',
      'مشكلة السماعة',
      'الصوت لا يعمل',
      'إصلاح الصوت'
    ],
    problem: 'انعدام الصوت أو ضعفه الشديد',
    context: 'مشاكل الصوت'
  },
  'camera-not-working': {
    category: 'الهواتف',
    variations: [
      'الكاميرا لا تعمل',
      'مشكلة في الكاميرا',
      'إصلاح كاميرا الهاتف',
      'خطأ الكاميرا'
    ],
    problem: 'عدم عمل كاميرا الهاتف بشكل صحيح',
    context: 'مشاكل الكاميرا'
  }
};

// ============================================
// قوالب المحتوى
// ============================================

const SOLUTION_TEMPLATES: Record<string, Solution[]> = {
  'computer-wont-start': [
    {
      title: 'التحقق من مصدر الطاقة',
      description: 'تأكد من توصيل الكابلات بشكل صحيح',
      steps: [
        'افصل كابل الطاقة تماماً من الجهاز ومن المقابل',
        'اضغط باستمرار على زر التشغيل لمدة 30 ثانية لتفريغ الشحن المتبقي',
        'أعد توصيل الكابل بشكل محكم في كلا الطرفين',
        'تحقق من عمل المقابل الكهربائي بتوصيل جهاز آخر',
        'حاول تشغيل الجهاز مرة أخرى'
      ]
    },
    {
      title: 'فحص كابلات داخلية',
      description: 'قد تكون هناك كابلات مفكوكة داخل الجهاز',
      steps: [
        'افتح غطاء الجهاز بحذر',
        'تحقق من توصيل كابلات الطاقة للوحة الأم',
        'تأكد من توصيل كابل اللوحة الأم 24-pin',
        'تحقق من توصيل كابل المعالج 4/8-pin',
        'أعد توصيل أي كابل مفكوكن'
      ]
    },
    {
      title: 'إعادة تعيين BIOS',
      description: 'قد تكون إعدادات BIOS تمنع التشغيل',
      steps: [
        'افتح الجهاز وابحث عن بطارية CMOS الدائرية',
        'أزل البطارية بحذر لمدة 5 دقائق',
        'أعد البطارية في مكانها',
        'شغل الجهاز وادخل إلى BIOS',
        'اختر "Load Optimized Defaults" واحفظ التغييرات'
      ]
    }
  ],
  'slow-computer': [
    {
      title: 'تنظيف القرص الصلب',
      description: 'حذف الملفات المؤقتة وغير الضرورية',
      steps: [
        'افتح "This PC" وانقر بزر الأيمن على القرص C:',
        'اختر Properties ثم Disk Cleanup',
        'حدد جميع أنواع الملفات المؤقتة',
        'انقر Clean up system files للحصول على خيارات إضافية',
        'أكد الحذف وأعد تشغيل الجهاز'
      ]
    },
    {
      title: 'تعطيل برامج بدء التشغيل',
      description: 'تقليل البرامج التي تعمل تلقائياً',
      steps: [
        'اضغط Ctrl+Shift+Esc لفتح Task Manager',
        'انتقل إلى تبويب Startup',
        'راجع قائمة البرامج وتأثيرها',
        'عطّل البرامج غير الضرورية بالنقر بزر الأيمن واختيار Disable',
        'أعد تشغيل الجهاز لملاحظة الفرق'
      ]
    },
    {
      title: 'ترقية الذاكرة RAM',
      description: 'إضافة ذاكرة عشوائية لتحسين الأداء',
      steps: [
        'تحقق من نوع الذاكرة الحالي باستخدام Task Manager',
        'اشرح RAM متوافق مع لوحتك الأم',
        'أغلب الجهاز وافصل الطاقة',
        'ركّب الذاكرة الجديدة في فتحة فارغة',
        'شغل الجهاز وتأكد من قراءة الذاكرة الجديدة'
      ]
    }
  ],
  'blue-screen': [
    {
      title: 'التحقق من تعريفات الأجهزة',
      description: 'التعريفات القديمة قد تسبب تضاربات',
      steps: [
        'اضغط Win+X واختر Device Manager',
        'ابحث عن أي جهاز عليه علامة تعجب صفراء',
        'نقر بزر الأيمن واختر Update Driver',
        'أعد تشغيل الجهاز بعد التحديث',
        'كرر للتحقق من جميع الأجهزة'
      ]
    },
    {
      title: 'فحص الذاكرة RAM',
      description: 'قد تكون الذاكرة تالفة',
      steps: [
        'اضغط Win+R واكتب mdsched.exe',
        'اختر "Restart now and check for problems"',
        'انتظر انتهاء الفحص (قد يستغرق 20-30 دقيقة)',
        'راجع النتائج بعد إعادة التشغيل',
        'استبدل الذاكرة التالفة إذا وجدت'
      ]
    },
    {
      title: 'استعادة النظام',
      description: 'العودة إلى نقطة استعادة سابقة',
      steps: [
        'ابحث عن "System Restore" في قائمة البداية',
        'اختر نقطة استعادة سابقة للمشكلة',
        'اتبع الخطوات لبدء الاستعادة',
        'انتظر انتهاء العملية (قد تستغرق ساعة)',
        'تحقق من حل المشكلة بعد الاستعادة'
      ]
    }
  ],
  'default': [
    {
      title: 'إعادة تشغيل الجهاز',
      description: 'حل بسيط يعالج الكثير من المشاكل',
      steps: [
        'احفظ جميع أعمالك الحالية',
        'أغلب جميع التطبيقات المفتوحة',
        'أعد تشغيل الجهاز بشكل كامل',
        'انتظر تحميل النظام بالكامل',
        'تحقق من حل المشكلة'
      ]
    },
    {
      title: 'التحقق من التحديثات',
      description: 'التحديثات قد تحتوي على إصلاحات',
      steps: [
        'افتح إعدادات النظام',
        'انتقل إلى قسم التحديثات',
        'تحقق من وجود تحديثات متوفرة',
        'حمّل وثبّت أي تحديثات معلقة',
        'أعد تشغيل الجهاز إذا طُلب'
      ]
    },
    {
      title: 'الاتصال بالدعم الفني',
      description: 'الحصول على مساعدة متخصصة',
      steps: [
        'جمّع معلومات عن المشكلة ورسائل الخطأ',
        'توثيق الخطوات التي جربتها',
        'الاتصال بخدمة العملاء أو الدعم الفني',
        'شرح المشكلة بالتفصيل',
        'اتباع التعليمات المقدمة'
      ]
    }
  ]
};

const FAQ_TEMPLATES: Record<string, FAQItem[]> = {
  'computer-wont-start': [
    { question: 'ما هي أسباب عدم تشغيل الحاسوب؟', answer: 'تشمل الأسباب الشائعة: مشاكل الطاقة، كابلات مفكوكة، تلف مزود الطاقة، مشاكل اللوحة الأم، أو تلف مكونات أخرى. ابدأ دائماً بفحص مصدر الطاقة أولاً.' },
    { question: 'كيف أعرف أن مزود الطاقة تالف؟', answer: 'علامات تلف مزود الطاقة: عدم إضاءة أي LED على الجهاز، صوت طقطقة عند المحاولة، رائحة محروقة، أو إعادة تشغيل عشوائية. يمكنك اختباره بمزود طاقة آخر.' },
    { question: 'هل يمكنني إصلاح المشكلة بنفسي؟', answer: 'نعم، العديد من مشاكل التشغيل يمكن حلها ذاتياً بالتحقق من الكابلات وإعادة التوصيل. لكن مشاكل العتاد الداخلي قد تحتاج متخصص.' }
  ],
  'slow-computer': [
    { question: 'لماذا أصبح حاسوبي بطيئاً فجأة؟', answer: 'الأسباب الشائعة: امتلاء القرص الصلب، برامج تعمل في الخلفية، فيروسات، تعريفات قديمة، أو ارتفاع درجة الحرارة. ابدأ بتنظيف القرص والتشغيل.' },
    { question: 'ما هو الحد الأدنى للذاكرة RAM المطلوب؟', answer: 'لويندوز 10/11 يُنصح بـ 8GB كحد أدنى، و16GB للأداء الجيد. للألعاب والتصميم، قد تحتاج 32GB أو أكثر.' },
    { question: 'هل ترقية SSD تحسن سرعة الحاسوب؟', answer: 'نعم! الانتقال من HDD إلى SSD هو أفضل ترقية لتحسين السرعة. ستحصل على سرعة تشغيل أسرع بـ 5-10 مرات وتحسن عام في الأداء.' }
  ],
  'default': [
    { question: 'ما هي خطوات استكشاف الأخطاء الأساسية؟', answer: 'ابدأ دائماً بإعادة التشغيل، ثم تحقق من التحديثات، راجع الإعدادات، ونفذ فحص النظام. هذه الخطوات تحل معظم المشاكل الشائعة.' },
    { question: 'متى يجب عليّ التواصل مع الدعم الفني؟', answer: 'عند فشل الحلول الأساسية، وجود رسائل خطأ متكررة، تلف العتاد، أو الحاجة لإصلاحات فيزيائية. احتفظ بضمان جهازك للإصلاحات المجانية.' },
    { question: 'كيف أحافظ على صحة جهازي؟', answer: 'حافظ على تحديثات النظام منتظمة، لا تملأ القرص الصلب بالكامل، استخدم برنامج حماية، نظف الجهاز من الغبار دورياً، وتجنب البرامج المشبوهة.' }
  ]
};

// ============================================
// دوال توليد المحتوى
// ============================================

function generateSlug(keyword: string): string {
  return keyword.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-أ-ي]/g, '');
}

function generateTitle(keyword: string, variation: string): string {
  const templates = [
    `${variation} - حل شامل ومفصل خطوة بخطوة`,
    `كيفية حل مشكلة ${variation} بسهولة`,
    `${variation}: الأسباب والحلول الفعالة`,
    `دليلك الكامل لإصلاح ${variation}`,
    `حل مشكلة ${variation} - طرق مجربة وناجحة`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

function generateDescription(keyword: string, problem: string): string {
  return `حل شامل لمشكلة ${problem}. تعرف على الأسباب والحلول الفعالة مع خطوات مفصلة ونصائح الخبراء. اكتشف كيفية إصلاح المشكلة بنفسك بسهولة.`;
}

function generateContent(keyword: string, problem: string, context: string, solutions: Solution[]): string {
  return `
## مقدمة

إذا كنت تواجه مشكلة "${problem}"، فأنت في المكان الصحيح. في هذا الدليل الشامل، سنتناول الأسباب المحتملة والحلول الفعالة لهذه المشكلة في مجال ${context}.

## أسباب المشكلة

قبل البدء بالحلول، من المهم فهم الأسباب المحتملة للمشكلة:

1. **أسباب تقنية**: مشاكل في البرمجيات أو الإعدادات
2. **أسباب عتادية**: تلف أو خلل في المكونات المادية
3. **أسباب خارجية**: عوامل بيئية أو شبكية

## الحلول المقترحة

لقد قمنا بتجميع أفضل الحلول المجربة لهذه المشكلة. اتبع الخطوات بالترتيب للحصول على أفضل النتائج.

${solutions.map((s, i) => `### الحل ${i + 1}: ${s.title}\n\n${s.description}\n\n**الخطوات:**\n${s.steps.map((step, j) => `${j + 1}. ${step}`).join('\n')}`).join('\n\n')}

## نصائح الوقاية

لتفادي تكرار المشكلة مستقبلاً، ننصح بـ:

- الحفاظ على تحديثات النظام والبرامج
- التنظيف الدوري للجهاز
- استخدام برامج الحماية المناسبة
- تجنب المصادر غير الموثوقة

## الخلاصة

نتمنى أن يكون هذا الدليل قد ساعدك في حل المشكلة. إذا استمرت المشكلة، ننصح بالتواصل مع فني متخصص.
`.trim();
}

// ============================================
// الدوال الرئيسية للتصدير
// ============================================

/**
 * توليد مقال كامل من كلمة مفتاحية
 */
export function generateArticle(keywordKey: string): Article | null {
  const keywordData = KEYWORDS_DATABASE[keywordKey];
  if (!keywordData) return null;

  const { category, variations, problem, context } = keywordData;
  const mainVariation = variations[0];
  const slug = keywordKey;
  
  const solutions = SOLUTION_TEMPLATES[keywordKey] || SOLUTION_TEMPLATES['default'];
  const faq = FAQ_TEMPLATES[keywordKey] || FAQ_TEMPLATES['default'];

  return {
    slug,
    title: generateTitle(keywordKey, mainVariation),
    description: generateDescription(keywordKey, problem),
    keyword: mainVariation,
    content: generateContent(keywordKey, problem, context, solutions),
    solutions,
    faq,
    relatedKeywords: variations.slice(1),
    createdAt: new Date().toISOString()
  };
}

/**
 * الحصول على جميع المقالات
 */
export function getAllArticles(): Article[] {
  return Object.keys(KEYWORDS_DATABASE)
    .map(key => generateArticle(key))
    .filter((article): article is Article => article !== null);
}

/**
 * الحصول على مقال بالـ slug
 */
export function getArticleBySlug(slug: string): Article | null {
  return generateArticle(slug);
}

/**
 * الحصول على قائمة المقالات (للصفحة الرئيسية)
 */
export function getArticlesList(): Array<{ slug: string; title: string; description: string; category: string }> {
  return Object.entries(KEYWORDS_DATABASE).map(([key, data]) => ({
    slug: key,
    title: generateTitle(key, data.variations[0]),
    description: generateDescription(key, data.problem),
    category: data.category
  }));
}

/**
 * الحصول على الفئات
 */
export function getCategories(): string[] {
  const categories = new Set(Object.values(KEYWORDS_DATABASE).map(k => k.category));
  return Array.from(categories);
}

/**
 * الحصول على مقالات حسب الفئة
 */
export function getArticlesByCategory(category: string): Array<{ slug: string; title: string; description: string }> {
  return Object.entries(KEYWORDS_DATABASE)
    .filter(([, data]) => data.category === category)
    .map(([key, data]) => ({
      slug: key,
      title: generateTitle(key, data.variations[0]),
      description: generateDescription(key, data.problem)
    }));
}

/**
 * توليد FAQ Schema
 */
export function generateFAQSchema(faq: FAQItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * توليد Article Schema
 */
export function generateArticleSchema(article: Article): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Organization',
      name: 'حلول تقنية'
    },
    publisher: {
      '@type': 'Organization',
      name: 'حلول تقنية'
    },
    datePublished: article.createdAt,
    dateModified: article.createdAt
  };
}
