/**
 * Page copy for each language. Both languages share one page structure;
 * only the words change. Arabic is the primary language.
 */

export type Locale = "ar" | "en";

const ar = {
  meta: {
    title: "HIGHLink | هل يفهم الذكاء الاصطناعي كيف يعمل نشاطك؟",
    description:
      "نتعرّف على طريقة عمل شركتك من الداخل، ثم نبني وكلاء وأنظمة ذكاء اصطناعي مخصّصة حول معرفة فريقك وعملياته وأدواته.",
  },
  hero: {
    eyebrow: "HIGHLink",
    title: "هل يفهم الذكاء الاصطناعي كيف يعمل نشاطك؟",
    body: "نتعرّف على طريقة عمل شركتك من الداخل، ثم نبني وكلاء وأنظمة ذكاء اصطناعي مخصّصة حول معرفة فريقك وعملياته وأدواته.",
    caption: "شاهد كيف نحوّل المعرفة الموجودة داخل شركتك إلى سياق يستطيع وكلاؤك الأذكياء العمل به.",
    cta: "احجز مكالمة",
    locked: "تابع المشاهدة لفتح الحجز.",
    unlocked: "التقويم جاهز. اختر الوقت المناسب بالأسفل.",
  },
  video: {
    label: "فيديو HIGHLink",
    playing: "الفيديو يعمل الآن",
    unmute: "اضغط لتشغيل الصوت",
    error: "تعذّر تحميل الفيديو. حاول مرة أخرى.",
    retry: "إعادة المحاولة",
    placeholder: "[فيديو المبيعات]",
    placeholderNote: "سيظهر الفيديو هنا",
    play: "تشغيل",
    pause: "إيقاف مؤقت",
    restart: "إعادة من البداية",
    mute: "كتم الصوت",
    sound: "تشغيل الصوت",
  },
  booking: {
    title: "احجز مكالمتك الاستشارية",
    body: "أخبرنا أين يقصّر الذكاء الاصطناعي في شركتك. سنناقش معك ما ينقصه، وما إذا كان التقييم الشامل مناسبًا لفريقك.",
    frameTitle: "احجز مكالمة لتطبيق الذكاء الاصطناعي",
    placeholder: "[تقويم الحجز]",
  },
  footer: {
    logoAlt: "HIGHLink",
    disclaimerLabel: "إخلاء مسؤولية",
    disclaimer:
      "هذا الموقع ليس جزءًا من موقع فيسبوك أو شركة ⁦Meta Platforms, Inc.⁩، ولا تؤيده فيسبوك بأي شكل من الأشكال. ⁦FACEBOOK⁩ علامة تجارية مملوكة لشركة ⁦Meta Platforms, Inc.⁩",
    fitTitle: "مصمَّم لشركات قائمة وتعمل بالفعل.",
    fit: [
      "تعمل HIGHLink مع شركات قائمة لديها عملاء وفريق وعمليات يومية. ما نقدّمه تنفيذ عملي مباشر، وليس دورة تدريبية، ولا مشروعًا جاهزًا، ولا طريقة للبدء من الصفر.",
      "جرّبت الذكاء الاصطناعي من قبل ولم يحقق ما توقعته؟ كثير من عملائنا يأتون إلينا بعد محاولة أو اثنتين لم تنجحا. غالبًا تكمن المشكلة في محاولة إدخال نشاطك في حلّ صُمّم لغيرك. كل ما نقدّمه يُبنى خصيصًا حول فريقك وأدواتك وطريقة عمل شركتك الفعلية؛ لا نسلّمك قالبًا جاهزًا ونطلب منك تغيير عملياتك لتناسبه.",
      "لا يلزم أن تكون عملياتك مثالية. إن كانت الإجراءات مبعثرة، أو المسؤوليات غير واضحة، أو المعرفة المهمة محفوظة في ذهن شخص واحد، نساعدك على ترتيب ذلك أولًا. فإضافة الذكاء الاصطناعي وحدها لن تُصلح عملية معطّلة.",
      "نبدأ بفهم طريقة عمل شركتك فعليًا، ثم نحدد ما يحتاج إلى تنظيم وتحسين وبناء. ويبقى فريقك مشاركًا طوال الوقت. الهدف حلّ يعمل فعلًا داخل شركتك، لا أداة جديدة تُترك لتكتشفها وحدك.",
    ],
    questions: "لديك سؤال؟",
    rights: "جميع الحقوق محفوظة.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    theme: "تبديل المظهر",
    language: "English",
    languageAria: "View this page in English",
  },
  legal: {
    privacy: { title: "سياسة الخصوصية", body: "[نص سياسة الخصوصية]" },
    terms: { title: "شروط الخدمة", body: "[نص شروط الخدمة]" },
    back: "العودة إلى الصفحة الرئيسية",
  },
};

export type Content = typeof ar;

const en: Content = {
  meta: {
    title: "HIGHLink | Does Your AI Understand How Your Business Runs?",
    description:
      "We learn how your company really operates, then build custom AI agents and systems around your team's knowledge, processes, and tools.",
  },
  hero: {
    eyebrow: "HIGHLink",
    title: "Does Your AI Understand How Your Business Runs?",
    body: "We learn how your company really operates, then build custom AI agents and systems around your team's knowledge, processes, and tools.",
    caption: "See how we turn what your business already knows into context your AI agents can work with.",
    cta: "Book a Call",
    locked: "Keep watching to unlock booking.",
    unlocked: "Your calendar is ready. Pick a time below.",
  },
  video: {
    label: "HIGHLink video",
    playing: "Your video is playing",
    unmute: "Click to unmute",
    error: "The video couldn't load. Please try again.",
    retry: "Retry video",
    placeholder: "[VSL VIDEO]",
    placeholderNote: "Your video goes here",
    play: "Play",
    pause: "Pause",
    restart: "Restart",
    mute: "Mute",
    sound: "Unmute",
  },
  booking: {
    title: "Book Your Solutions Call",
    body: "Tell us where AI is falling short in your business. We'll talk through what's missing and whether an audit makes sense for your team.",
    frameTitle: "Book an AI implementation call",
    placeholder: "[BOOKING CALENDAR]",
  },
  footer: {
    logoAlt: "HIGHLink",
    disclaimerLabel: "Disclaimer",
    disclaimer:
      "This site is not part of the Facebook website or Meta Platforms, Inc., and is not endorsed by Facebook in any way. FACEBOOK is a trademark of Meta Platforms, Inc.",
    fitTitle: "Built for businesses already doing the work.",
    fit: [
      "HIGHLink works with established businesses that already have customers, a team, and day-to-day operations. This is hands-on implementation, not a course, a business-in-a-box, or a way to start from zero.",
      "Tried AI before and it didn't deliver? Many clients come to us after one or two attempts that fell short. Often the problem is forcing your business into a solution built for someone else. Everything we deliver is custom-built around your team, your tools, and the way your business actually works. We don't hand you a template and expect you to reshape your operations around it.",
      "Your operations don't need to be perfect. If processes are scattered, responsibilities are unclear, or key knowledge lives in one person's head, we can help untangle that first. Adding AI on its own won't fix a broken process.",
      "We start by understanding how your business really runs, then scope what needs to be organized, improved, and built. Your team stays involved throughout. The goal is a working solution for your business, not another tool you're left to figure out on your own.",
    ],
    questions: "Questions?",
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    theme: "Toggle theme",
    language: "العربية",
    languageAria: "اعرض هذه الصفحة بالعربية",
  },
  legal: {
    privacy: { title: "Privacy Policy", body: "[PRIVACY POLICY CONTENT]" },
    terms: { title: "Terms of Service", body: "[TERMS OF SERVICE CONTENT]" },
    back: "Back to the home page",
  },
};

export const content: Record<Locale, Content> = { ar, en };

export const paths = {
  ar: { home: "/ar", privacy: "/ar/privacy", terms: "/ar/terms" },
  en: { home: "/en", privacy: "/en/privacy", terms: "/en/terms" },
} as const;

export const other = (l: Locale): Locale => (l === "ar" ? "en" : "ar");
