/**
 * All page copy, per locale. Components receive slices of this as props,
 * so adding a language means adding one dictionary here.
 */

export type Locale = "en" | "ar";
export const locales: Locale[] = ["en", "ar"];

/** Route for each locale's homepage. */
export const localePath: Record<Locale, string> = { en: "/", ar: "/ar" };

const en = {
  meta: {
    title: "HIGHLink — AI Systems, Automation & AI Agents for Business",
    description:
      "We build AI-powered systems that help businesses operate, automate, and scale — connecting your people, tools, knowledge, and processes into one operating system.",
    ogTitle: "We Build the System. You Scale the Business.",
  },
  common: {
    skip: "Skip to content",
    home: "Home",
    homeAria: "HIGHLink — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLabel: "العربية",
    switchAria: "اقرأ الموقع بالعربية",
  },
  nav: [
    { label: "Systems", href: "#systems" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Contact", href: "#booking" },
  ],
  cta: {
    primary: "Build My AI System",
    secondary: "See How It Works",
    call: "Book a Solutions Call",
  },
  hero: {
    eyebrow: "Build your AI operating system",
    title: ["We Build the System.", "You Scale the Business."],
    body: "Your business already has the people, tools, knowledge, and processes. We connect them into an AI-powered system designed to help your company operate and scale.",
  },
  video: {
    aria: "System demonstration",
    live: "Live system",
    liveSuffix: "· HIGHLink OS",
    step: "Step",
    demo: "Demo",
    caption: "How HIGHLink turns the way your business already works into one connected AI system.",
  },
  flow: {
    steps: [
      "Mapping the business — people, tools, knowledge, processes",
      "AI brain structures company knowledge into usable context",
      "Agents assigned to content, sales, operations and support",
      "Automations triggered across connected workflows",
      "CRM, marketing, sales and operations updated in sync",
      "Growth — more output without more headcount",
    ],
    nodes: {
      business: { label: "Business", sub: "People · Tools · Knowledge" },
      brain: { label: "AI Brain", sub: "Context + reasoning" },
      agents: { label: "AI Agents", sub: "Digital workers" },
      auto: { label: "Automations", sub: "Workflows · Triggers" },
      crm: { label: "CRM", sub: "" },
      mkt: { label: "Marketing", sub: "" },
      sales: { label: "Sales", sub: "" },
      ops: { label: "Operations", sub: "" },
      growth: { label: "Growth", sub: "Scale" },
    },
    sr: "Diagram: Business flows into an AI Brain, which directs AI Agents, which run Automations across CRM, Marketing, Sales and Operations, producing Business Growth.",
  },
  problem: {
    eyebrow: "The problem",
    title: ["AI Doesn’t Fix a", "Broken System."],
    lead: "Most businesses don’t need another AI tool.",
    body: "They need their existing knowledge, processes, people, and technology connected into a system that actually works together.",
    items: [
      { title: "Too many tools", body: "Your business runs across disconnected platforms." },
      { title: "Manual work", body: "Your team spends time repeating work AI could handle." },
      {
        title: "Knowledge is scattered",
        body: "Important information lives across documents, chats, spreadsheets, CRM systems, and people’s heads.",
      },
      { title: "Founder dependency", body: "Too many decisions still require you." },
    ],
  },
  solution: {
    eyebrow: "The solution",
    title: ["Your Business Needs a System.", "Not Another Tool."],
    body: "We design and build the AI infrastructure behind your business.",
    parts: ["Content", "Leads", "Sales", "Customers", "Operations", "Data", "Team"],
    core: "AI System",
    sr: "Diagram: the HIGHLink AI System at the center, connected to Content, Leads, Sales, Customers, Operations, Data, and Team.",
  },
  systems: {
    eyebrow: "What we build",
    title: ["One System.", "Every Part of Your Business."],
    body: "Five connected systems that share one brain — so every part of your business moves with the same context.",
    stepMarks: ["a.", "b.", "c.", "d.", "e."],
    items: [
      { name: "AI Content System", flow: ["Research", "Strategy", "Scripts", "Production", "Publishing"] },
      { name: "AI Lead System", flow: ["Traffic", "Capture", "Qualification", "CRM", "Follow-up"] },
      { name: "AI Sales System", flow: ["Lead", "Qualification", "Follow-up", "Booking", "Pipeline"] },
      { name: "AI Operations System", flow: ["Tasks", "SOPs", "Agents", "Automation", "Reporting"] },
      { name: "AI Customer System", flow: ["Support", "Knowledge", "Communication", "Follow-up", "Retention"] },
    ],
  },
  process: {
    eyebrow: "How it works",
    title: ["From Chaos", "to an AI-Powered", "System."],
    steps: [
      { title: "Understand", body: "We map how your business actually works." },
      { title: "Design", body: "We identify where AI and automation create leverage." },
      { title: "Build", body: "We build the workflows, agents, integrations, and systems." },
      { title: "Deploy", body: "We connect everything to the tools your business already uses." },
      { title: "Optimize", body: "We continuously improve the system as your business evolves." },
    ],
  },
  beforeAfter: {
    eyebrow: "Before / After",
    title: ["Stop Being", "the System."],
    before: "Before",
    after: "After",
    rows: [
      ["Manual follow-ups", "AI-powered follow-up"],
      ["Disconnected tools", "Connected systems"],
      ["Repeated tasks", "Automated workflows"],
      ["Information everywhere", "Centralized business knowledge"],
      ["Founder-dependent decisions", "AI-assisted decisions"],
      ["Slow execution", "Faster execution"],
    ],
  },
  agents: {
    eyebrow: "AI agents",
    title: ["Your Business Doesn’t Need", "More Employees."],
    punch: "It Needs Digital Workers.",
    body: "AI agents are digital workers with a defined role, access to the right knowledge, and clear rules for when to hand off to a human.",
    items: [
      {
        name: "Content Agent",
        body: "Creates and organizes content workflows.",
        tasks: ["Outlining next week’s scripts", "Repurposing a long-form piece", "Scheduling approved posts"],
      },
      {
        name: "Sales Agent",
        body: "Qualifies leads and follows up.",
        tasks: ["Scoring a new inbound lead", "Drafting a follow-up", "Booking a discovery call"],
      },
      {
        name: "Operations Agent",
        body: "Moves work between systems.",
        tasks: ["Syncing CRM to project board", "Routing a new request", "Compiling the weekly report"],
      },
      {
        name: "Customer Agent",
        body: "Handles repetitive customer interactions.",
        tasks: ["Answering a policy question", "Updating an order status", "Escalating to the team"],
      },
      {
        name: "Research Agent",
        body: "Finds, analyzes, and summarizes information.",
        tasks: ["Scanning market signals", "Summarizing call notes", "Comparing competitor offers"],
      },
    ],
  },
  method: {
    eyebrow: "The HIGHLink method",
    title: ["We Don’t Start", "With AI."],
    subtitle: ["We Start With", "Your Business."],
    body: "We’re not here to sell you tools. Technology is the last decision, not the first — every agent and automation we build is designed around how your company actually runs.",
    aiBadge: "AI enters here",
    phases: [
      { label: "Business first", steps: ["Map the business.", "Find the bottlenecks.", "Document the processes."] },
      {
        label: "Then the system",
        steps: ["Design the AI architecture.", "Build the automations.", "Connect the systems.", "Measure the results."],
      },
    ],
  },
  cases: {
    eyebrow: "Case studies",
    title: ["Systems in", "the Real World."],
    body: "Every engagement starts with a business problem and ends with a system the team actually uses.",
    label: "Case study",
    fields: { industry: "Industry", challenge: "Challenge", system: "System", result: "Result" },
    items: [
      {
        title: ["From Manual", "To Automated"],
        industry: "[CLIENT INDUSTRY]",
        challenge: "[CLIENT PROBLEM]",
        system: "[AI SYSTEM BUILT]",
        result: "[RESULT]",
      },
      {
        title: ["From Chaos", "To Clarity"],
        industry: "[CLIENT INDUSTRY]",
        challenge: "[CLIENT PROBLEM]",
        system: "[AI SYSTEM BUILT]",
        result: "[RESULT]",
      },
    ],
  },
  founder: {
    eyebrow: "Why HIGHLink",
    title: "AI Is Not the Business.",
    subtitle: "The System Behind It Is.",
    body: "HIGHLink helps ambitious businesses turn AI from a collection of tools into an operating system designed around the way their business actually works.",
  },
  final: {
    title: ["Ready to Build", "Your AI System?"],
    body: ["Tell us how your business works.", "We’ll identify where AI can create the most leverage."],
  },
  booking: {
    eyebrow: "Book a call",
    title: ["Let’s Build", "Your System."],
    sub: "Pick a time that works for you.",
    expect: [
      "We walk through how your business runs today.",
      "We identify where AI and automation create leverage.",
      "You leave with a clear picture of the system — no obligation.",
    ],
    email: "Prefer email?",
    embedTitle: "Book a solutions call with HIGHLink",
    panelLeft: "Solutions call",
    panelRight: "Select a date",
    days: ["M", "T", "W", "T", "F", "S", "S"],
    placeholder: "[BOOKING CALENDAR]",
    placeholderNote: "Scheduling embed loads here.",
  },
  footer: {
    tagline: ["AI Systems.", "Automation.", "Scale."],
    navigate: "Navigate",
    contact: "Contact",
    rights: "All rights reserved.",
    strap: "AI SYSTEMS · AUTOMATION · AGENTS",
  },
};

export type Dict = typeof en;

const ar: Dict = {
  meta: {
    title: "HIGHLink — أنظمة الذكاء الاصطناعي والأتمتة والوكلاء الأذكياء للشركات",
    description:
      "نبني أنظمة مدعومة بالذكاء الاصطناعي تساعد الشركات على العمل والأتمتة والتوسّع — بربط فريقك وأدواتك ومعرفتك وعملياتك في نظام تشغيل واحد.",
    ogTitle: "نحن نبني النظام. وأنت توسّع أعمالك.",
  },
  common: {
    skip: "تخطَّ إلى المحتوى",
    home: "الرئيسية",
    homeAria: "HIGHLink — الصفحة الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    switchLabel: "English",
    switchAria: "Read the site in English",
  },
  nav: [
    { label: "الأنظمة", href: "#systems" },
    { label: "كيف نعمل", href: "#how-it-works" },
    { label: "دراسات الحالة", href: "#case-studies" },
    { label: "تواصل معنا", href: "#booking" },
  ],
  cta: {
    primary: "ابنِ نظامك الذكي",
    secondary: "شاهد كيف نعمل",
    call: "احجز مكالمة استشارية",
  },
  hero: {
    eyebrow: "ابنِ نظام التشغيل الذكي لشركتك",
    title: ["نحن نبني النظام.", "وأنت توسّع أعمالك."],
    body: "شركتك تملك بالفعل الفريق والأدوات والمعرفة والعمليات. نحن نربطها في نظام مدعوم بالذكاء الاصطناعي، مصمَّم ليساعد شركتك على العمل والنمو.",
  },
  video: {
    aria: "عرض توضيحي للنظام",
    live: "نظام حيّ",
    liveSuffix: "· HIGHLink OS",
    step: "الخطوة",
    demo: "عرض",
    caption: "كيف تحوّل HIGHLink طريقة عمل شركتك الحالية إلى نظام ذكي واحد مترابط.",
  },
  flow: {
    steps: [
      "رسم خريطة العمل — الفريق، الأدوات، المعرفة، العمليات",
      "العقل الذكي يحوّل معرفة الشركة إلى سياق قابل للاستخدام",
      "توزيع الوكلاء على المحتوى والمبيعات والعمليات والدعم",
      "تشغيل الأتمتة عبر مسارات العمل المترابطة",
      "تحديث إدارة العملاء والتسويق والمبيعات والعمليات بشكل متزامن",
      "النمو — إنتاج أكبر دون زيادة عدد الموظفين",
    ],
    nodes: {
      business: { label: "الأعمال", sub: "الفريق · الأدوات · المعرفة" },
      brain: { label: "العقل الذكي", sub: "السياق + التحليل" },
      agents: { label: "الوكلاء الأذكياء", sub: "موظفون رقميون" },
      auto: { label: "الأتمتة", sub: "مسارات · محفّزات" },
      crm: { label: "إدارة العملاء", sub: "" },
      mkt: { label: "التسويق", sub: "" },
      sales: { label: "المبيعات", sub: "" },
      ops: { label: "العمليات", sub: "" },
      growth: { label: "النمو", sub: "التوسّع" },
    },
    sr: "رسم توضيحي: تتدفق الأعمال إلى العقل الذكي، الذي يوجّه الوكلاء الأذكياء، فيشغّلون الأتمتة عبر إدارة العملاء والتسويق والمبيعات والعمليات، لينتج عن ذلك نمو الأعمال.",
  },
  problem: {
    eyebrow: "المشكلة",
    title: ["الذكاء الاصطناعي", "لا يُصلح نظامًا معطّلًا."],
    lead: "معظم الشركات لا تحتاج أداة ذكاء اصطناعي أخرى.",
    body: "بل تحتاج أن تترابط معرفتها وعملياتها وفريقها وتقنياتها الحالية في نظام يعمل كوحدة واحدة.",
    items: [
      { title: "أدوات كثيرة", body: "أعمالك موزّعة على منصات غير مترابطة." },
      { title: "عمل يدوي", body: "فريقك يكرّر مهامًا يستطيع الذكاء الاصطناعي إنجازها." },
      {
        title: "معرفة مبعثرة",
        body: "المعلومات المهمة موزّعة بين المستندات والمحادثات وجداول البيانات وأنظمة العملاء وذاكرة الموظفين.",
      },
      { title: "الاعتماد على المؤسس", body: "قرارات كثيرة ما زالت تنتظرك أنت." },
    ],
  },
  solution: {
    eyebrow: "الحل",
    title: ["أعمالك تحتاج نظامًا.", "لا أداة أخرى."],
    body: "نصمّم ونبني البنية الذكية التي تقف خلف أعمالك.",
    parts: ["المحتوى", "العملاء المحتملون", "المبيعات", "العملاء", "العمليات", "البيانات", "الفريق"],
    core: "نظام ذكي",
    sr: "رسم توضيحي: نظام HIGHLink الذكي في المركز، متصل بالمحتوى والعملاء المحتملين والمبيعات والعملاء والعمليات والبيانات والفريق.",
  },
  systems: {
    eyebrow: "ماذا نبني",
    title: ["نظام واحد.", "لكل جزء من أعمالك."],
    body: "خمسة أنظمة مترابطة تشترك في عقل واحد — لتتحرك كل أجزاء عملك بالسياق نفسه.",
    stepMarks: ["أ.", "ب.", "ج.", "د.", "هـ."],
    items: [
      { name: "نظام المحتوى الذكي", flow: ["البحث", "الاستراتيجية", "النصوص", "الإنتاج", "النشر"] },
      { name: "نظام العملاء المحتملين", flow: ["الزيارات", "الالتقاط", "التأهيل", "إدارة العملاء", "المتابعة"] },
      { name: "نظام المبيعات الذكي", flow: ["العميل المحتمل", "التأهيل", "المتابعة", "الحجز", "مسار المبيعات"] },
      { name: "نظام العمليات الذكي", flow: ["المهام", "الإجراءات", "الوكلاء", "الأتمتة", "التقارير"] },
      { name: "نظام خدمة العملاء الذكي", flow: ["الدعم", "المعرفة", "التواصل", "المتابعة", "الاحتفاظ"] },
    ],
  },
  process: {
    eyebrow: "كيف نعمل",
    title: ["من الفوضى", "إلى نظام يعمل", "بالذكاء الاصطناعي."],
    steps: [
      { title: "نفهم", body: "نرسم خريطة لكيفية عمل شركتك فعليًا." },
      { title: "نصمّم", body: "نحدّد أين يصنع الذكاء الاصطناعي والأتمتة أكبر أثر." },
      { title: "نبني", body: "نبني مسارات العمل والوكلاء والتكاملات والأنظمة." },
      { title: "نُطلق", body: "نربط كل شيء بالأدوات التي تستخدمها شركتك اليوم." },
      { title: "نحسّن", body: "نطوّر النظام باستمرار مع تطوّر أعمالك." },
    ],
  },
  beforeAfter: {
    eyebrow: "قبل / بعد",
    title: ["لا تكن", "أنت النظام."],
    before: "قبل",
    after: "بعد",
    rows: [
      ["متابعات يدوية", "متابعة مدعومة بالذكاء الاصطناعي"],
      ["أدوات غير مترابطة", "أنظمة مترابطة"],
      ["مهام متكررة", "مسارات عمل مؤتمتة"],
      ["معلومات في كل مكان", "معرفة مركزية للأعمال"],
      ["قرارات تعتمد على المؤسس", "قرارات مدعومة بالذكاء الاصطناعي"],
      ["تنفيذ بطيء", "تنفيذ أسرع"],
    ],
  },
  agents: {
    eyebrow: "الوكلاء الأذكياء",
    title: ["أعمالك لا تحتاج", "مزيدًا من الموظفين."],
    punch: "بل تحتاج موظفين رقميين.",
    body: "الوكلاء الأذكياء موظفون رقميون، لكلٍّ منهم دور محدد، ووصول إلى المعرفة الصحيحة، وقواعد واضحة لمتى يسلّم العمل لإنسان.",
    items: [
      {
        name: "وكيل المحتوى",
        body: "ينشئ مسارات المحتوى وينظّمها.",
        tasks: ["يجهّز نصوص الأسبوع القادم", "يعيد توظيف محتوى طويل", "يجدول المنشورات المعتمدة"],
      },
      {
        name: "وكيل المبيعات",
        body: "يؤهّل العملاء المحتملين ويتابعهم.",
        tasks: ["يقيّم عميلًا محتملًا جديدًا", "يصيغ رسالة متابعة", "يحجز مكالمة تعريفية"],
      },
      {
        name: "وكيل العمليات",
        body: "ينقل العمل بين الأنظمة.",
        tasks: ["يزامن بيانات العملاء مع لوحة المشاريع", "يوجّه طلبًا جديدًا", "يجمع التقرير الأسبوعي"],
      },
      {
        name: "وكيل خدمة العملاء",
        body: "يتولّى التفاعلات المتكررة مع العملاء.",
        tasks: ["يجيب عن سؤال حول السياسات", "يحدّث حالة طلب", "يحيل الحالة إلى الفريق"],
      },
      {
        name: "وكيل البحث",
        body: "يبحث عن المعلومات ويحلّلها ويلخّصها.",
        tasks: ["يرصد مؤشرات السوق", "يلخّص ملاحظات مكالمة", "يقارن عروض المنافسين"],
      },
    ],
  },
  method: {
    eyebrow: "منهجية HIGHLink",
    title: ["لا نبدأ", "بالذكاء الاصطناعي."],
    subtitle: ["نبدأ", "بأعمالك."],
    body: "لسنا هنا لنبيعك أدوات. التقنية هي القرار الأخير لا الأول — كل وكيل وكل أتمتة نبنيها مصمَّمة حول طريقة عمل شركتك الفعلية.",
    aiBadge: "هنا يبدأ دور الذكاء الاصطناعي",
    phases: [
      { label: "الأعمال أولًا", steps: ["نرسم خريطة الأعمال.", "نكتشف نقاط الاختناق.", "نوثّق العمليات."] },
      {
        label: "ثم النظام",
        steps: ["نصمّم البنية الذكية.", "نبني الأتمتة.", "نربط الأنظمة.", "نقيس النتائج."],
      },
    ],
  },
  cases: {
    eyebrow: "دراسات الحالة",
    title: ["أنظمة تعمل", "على أرض الواقع."],
    body: "كل مشروع يبدأ بمشكلة حقيقية في العمل، وينتهي بنظام يستخدمه الفريق فعلًا.",
    label: "دراسة حالة",
    fields: { industry: "القطاع", challenge: "التحدي", system: "النظام", result: "النتيجة" },
    items: [
      {
        title: ["من العمل اليدوي", "إلى الأتمتة"],
        industry: "[قطاع العميل]",
        challenge: "[مشكلة العميل]",
        system: "[النظام الذكي المنفَّذ]",
        result: "[النتيجة]",
      },
      {
        title: ["من الفوضى", "إلى الوضوح"],
        industry: "[قطاع العميل]",
        challenge: "[مشكلة العميل]",
        system: "[النظام الذكي المنفَّذ]",
        result: "[النتيجة]",
      },
    ],
  },
  founder: {
    eyebrow: "لماذا HIGHLink",
    title: "الذكاء الاصطناعي ليس هو العمل.",
    subtitle: "بل النظام الذي يقف خلفه.",
    body: "تساعد HIGHLink الشركات الطموحة على تحويل الذكاء الاصطناعي من مجموعة أدوات متفرقة إلى نظام تشغيل مصمَّم حول طريقة عملها الفعلية.",
  },
  final: {
    title: ["هل أنت مستعد لبناء", "نظامك الذكي؟"],
    body: ["أخبرنا كيف تعمل شركتك.", "وسنحدّد أين يصنع الذكاء الاصطناعي أكبر أثر."],
  },
  booking: {
    eyebrow: "احجز مكالمة",
    title: ["لنبنِ", "نظامك معًا."],
    sub: "اختر الوقت المناسب لك.",
    expect: [
      "نستعرض معك كيف تعمل شركتك اليوم.",
      "نحدّد أين يصنع الذكاء الاصطناعي والأتمتة أكبر أثر.",
      "تخرج بصورة واضحة للنظام — دون أي التزام.",
    ],
    email: "تفضّل البريد الإلكتروني؟",
    embedTitle: "احجز مكالمة استشارية مع HIGHLink",
    panelLeft: "مكالمة استشارية",
    panelRight: "اختر التاريخ",
    days: ["ح", "ن", "ث", "ر", "خ", "ج", "س"],
    placeholder: "[تقويم الحجز]",
    placeholderNote: "سيظهر نظام الحجز هنا.",
  },
  footer: {
    tagline: ["أنظمة ذكية.", "أتمتة.", "توسّع."],
    navigate: "تصفّح",
    contact: "تواصل",
    rights: "جميع الحقوق محفوظة.",
    strap: "أنظمة ذكية · أتمتة · وكلاء أذكياء",
  },
};

export const dictionaries: Record<Locale, Dict> = { en, ar };
export const getDict = (locale: Locale) => dictionaries[locale];
