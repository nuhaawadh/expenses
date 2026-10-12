/** سطر "صُمّم بواسطة هاي لينك" أسفل الصفحات، يوصل لموقع هاي لينك. */
export function Credit({ className = "" }: { className?: string }) {
  return (
    <p className={`text-center text-[12.5px] text-faint ${className}`}>
      صُمّم بواسطة{" "}
      <a
        href="https://highlink.tech"
        target="_blank"
        rel="noopener"
        className="font-medium text-muted underline-offset-4 hover:underline"
      >
        هاي لينك
      </a>
    </p>
  );
}
