import type { NextConfig } from "next";

/**
 * ترويسات حماية تُرسَل مع كل صفحة.
 * الأهم فيها منع تضمين التطبيق داخل إطار في موقع آخر — بدونه يقدر موقع
 * خبيث يضع الدفتر في إطار شفاف ويخدع المستخدم ليضغط «حذف» وهو يظن أنه
 * يضغط شيئاً آخر.
 */
const securityHeaders = [
  // لا يُضمَّن التطبيق في أي إطار، ولو من نفس النطاق
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Frame-Options", value: "DENY" },

  // المتصفح لا يخمّن نوع المحتوى — يمنع تنفيذ ملف مرفوع كأنه سكربت
  { key: "X-Content-Type-Options", value: "nosniff" },

  // لا يُسرَّب مسار الصفحة إلى مواقع خارجية عبر Referer
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // لا نستخدم أياً من هذه الصلاحيات، فنغلقها صراحةً
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=(), payment=()" },

  // HTTPS فقط لسنة، شاملاً النطاقات الفرعية
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // يخفي إصدار Next.js عن المهاجمين
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
