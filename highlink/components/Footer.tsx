import { content, other, paths, type Locale } from "@/lib/content";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Footer({ locale }: { locale: Locale }) {
  const t = content[locale].footer;
  const p = paths[locale];
  const alt = other(locale);
  const link = "text-fg underline underline-offset-2 transition-colors hover:text-white/70";

  return (
    // A soft navy scrim keeps the white copy readable wherever the fixed wave field is.
    <footer className="on-deep relative z-10 bg-gradient-to-b from-[#031c26]/35 via-[#031c26]/65 to-[#031c26]/90">
      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-5 md:mb-7">
          <a href={p.home} className="inline-block text-[28px] md:text-[34px]" aria-label={t.logoAlt}>
            <Logo />
          </a>
        </div>

        <div className="space-y-5 text-xs leading-relaxed text-muted md:text-sm">
          <div>
            <p className="label mb-1.5 text-[10px] tracking-wider text-fg uppercase">{t.disclaimerLabel}</p>
            <p>{t.disclaimer}</p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-fg">{t.fitTitle}</p>
            {t.fit.map((para, i) => (
              <p key={i} className={i ? "mt-2" : ""}>
                {para}
              </p>
            ))}
          </div>
          <div className="pt-3 md:pt-4">
            <p className="label mb-1.5 text-[10px] tracking-wider text-fg uppercase">{t.questions}</p>
            <p>
              {site.email === "[EMAIL]" ? (
                <span dir="ltr" className="text-fg select-all">
                  {site.email}
                </span>
              ) : (
                <a dir="ltr" href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between md:mt-10 md:pt-6">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <ThemeToggle label={t.theme} />
            <a href={p.privacy} className={link}>
              {t.privacy}
            </a>
            <a href={p.terms} className={link}>
              {t.terms}
            </a>
            <a href={paths[alt].home} hrefLang={alt} lang={alt} aria-label={t.languageAria} className={link}>
              {t.language}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
