/**
 * تصغير صورة الفاتورة في المتصفح قبل إرسالها.
 *
 * صورة الجوال الخام تتراوح بين 3 و 12 ميجابايت، وVercel يرفض أي طلب
 * أكبر من 4.5 ميجابايت — والـ base64 يزيد الحجم الثلث. فالتصغير هنا ليس
 * تحسيناً بل شرط عمل. 1600 بكسل تكفي لقراءة أرقام الفاتورة بوضوح.
 */

const MAX_EDGE = 1600;
const QUALITY = 0.85;
/** حد الأمان بعد الترميز، أقل بكثير من حد Vercel */
const MAX_BYTES = 3_000_000;

export interface PreparedImage {
  /** base64 بلا بادئة data: */
  base64: string;
  mimeType: string;
  bytes: number;
}

export async function prepareReceipt(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/")) {
    throw new Error("اختر صورة، لا ملفاً من نوع آخر.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // صور HEIC من الآيفون قد لا يفكّها المتصفح
    throw new Error("تعذّر فتح هذه الصورة. جرّب تصويرها من داخل التطبيق.");
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("تعذّر تجهيز الصورة على هذا المتصفح.");

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
  const comma = dataUrl.indexOf(",");
  if (comma < 0) throw new Error("تعذّر ضغط الصورة.");

  const base64 = dataUrl.slice(comma + 1);
  const bytes = Math.floor((base64.length * 3) / 4);

  if (bytes > MAX_BYTES) {
    throw new Error("الصورة كبيرة جداً حتى بعد الضغط. صوّرها من مسافة أقرب.");
  }
  if (bytes < 1024) {
    throw new Error("الصورة فارغة أو تالفة.");
  }

  return { base64, mimeType: "image/jpeg", bytes };
}
