import type { MetadataRoute } from "next";

/**
 * يجعل الدفتر يفتح كتطبيق مستقل عند إضافته لشاشة الجوال الرئيسية،
 * بلا شريط متصفح — وهي الطريقة التي سيستخدمه بها أغلب الناس.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "الدفتر",
    short_name: "الدفتر",
    description: "سجّل مصروفاتك بجملة عربية واحدة، واعرف وين راحت فلوسك.",
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f8f6",
    theme_color: "#006c35",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
