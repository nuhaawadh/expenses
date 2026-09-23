/**
 * Builds a self-contained preview of the static export: each page becomes one
 * HTML file with its CSS, fonts (as data URIs) and JS chunks inlined, so it can
 * be hosted anywhere that serves a single file (e.g. a Claude artifact).
 *
 *   PREVIEW_EXPORT=1 npx next build && node scripts/build-preview.mjs [outDir]
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const SRC = ".next-preview";
const OUT = process.argv[2] ?? "preview";
// The entry page is written as a fragment: the host wraps it in its own document.
// Secondary pages are served as-is, so they are written as complete documents.
const PAGES = [
  { file: "ar.html", out: "index.html", route: "/ar", title: "HIGHLink", fragment: true },
  { file: "en.html", out: "en.html", route: "/en" },
  { file: "ar/privacy.html", out: "ar-privacy.html", route: "/ar/privacy" },
  { file: "ar/terms.html", out: "ar-terms.html", route: "/ar/terms" },
  { file: "en/privacy.html", out: "en-privacy.html", route: "/en/privacy" },
  { file: "en/terms.html", out: "en-terms.html", route: "/en/terms" },
];
// Site routes → preview files, in HTML attributes and inside the serialized React payload.
const ROUTES = PAGES.map((p) => [p.route, p.out]);
const rewriteLinks = (html) => {
  for (const [route, file] of ROUTES) {
    html = html.split(`href="${route}"`).join(`href="${file}"`);
    html = html.split(`\\"href\\":\\"${route}\\"`).join(`\\"href\\":\\"${file}\\"`);
  }
  return html;
};

const read = (p) => readFileSync(join(SRC, p.replace(/^\//, "")));

function inlineCss(href) {
  let css = read(href).toString();
  css = css.replace(/url\((\/_next\/static\/media\/[^)]+)\)/g, (_, p) => {
    const type = p.endsWith(".woff2") ? "font/woff2" : "application/octet-stream";
    return `url(data:${type};base64,${read(p).toString("base64")})`;
  });
  return css;
}

// The host page wraps this file in its own <html>/<body> with a light reset;
// these unlayered rules keep the site's dark ground and type on top of it.
const HOST_OVERRIDES = `:root{color-scheme:dark;background:#07090a}html,body{background:#07090a!important;color:#eceeed;font-family:var(--font-sans)!important;font-size:16px!important;margin:0}`;

mkdirSync(OUT, { recursive: true });

for (const page of PAGES) {
  const html = read(page.file).toString();
  const htmlTag = html.match(/<html([^>]*)>/)[1];
  const attr = (n) => (htmlTag.match(new RegExp(`${n}="([^"]*)"`)) || [])[1] ?? "";
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
  // Inline <head> scripts (e.g. the no-flash theme script) must still run first.
  const headScripts = (head.match(/<script>[\s\S]*?<\/script>/g) || []).join("");
  const title = page.title ?? (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "HIGHLink";

  const styles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*\/>/g)].map((m) => inlineCss(m[1]));

  // Every chunk the page or its React payload references, so nothing is fetched at runtime.
  const scripts = [...new Set(html.match(/\/_next\/static\/chunks\/[^"\\ ]+\.js/g))].filter(
    (src) => !src.includes("/polyfills-"),
  );
  // Webpack runtime first, the app entry last: hydration starts when main-app runs,
  // and by then every module it needs must already be registered.
  const rank = (src) => (src.includes("/webpack-") ? 0 : src.includes("/main-app-") ? 2 : 1);
  scripts.sort((a, b) => rank(a) - rank(b));
  const inlineScripts = scripts
    .map((src) => `<script>${read(src).toString().replace(/<\/script/gi, "<\\/script")}</script>`)
    .join("\n");

  let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)[1];
  body = body.replace(/<script src="[^"]+"[^>]*><\/script>/g, "");
  // Drop font/CSS preload hints from the payload: those files are inlined above.
  body = body.replace(/\d*:HL\[\\"\/_next\/static\/[^\]]*\]\\n/g, "");
  // React re-creates the stylesheet <link>s from the payload; point them at empty CSS.
  body = body.replace(/\/_next\/static\/css\/[\w-]+\.css/g, "data:text/css,");
  body = rewriteLinks(body);

  const style = `<style>${styles.join("\n")}\n${HOST_OVERRIDES}</style>`;
  const out = page.fragment
    ? [
        `<title>${title}</title>`,
        headScripts,
        `<script>(function(d){d.lang=${JSON.stringify(attr("lang"))};d.dir=${JSON.stringify(attr("dir"))};d.className=${JSON.stringify(attr("class"))};})(document.documentElement)</script>`,
        style,
        body,
        inlineScripts,
      ].join("\n")
    : [
        `<!DOCTYPE html><html${htmlTag}><head><meta charset="utf-8"/>`,
        `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>`,
        `<title>${title}</title>`,
        headScripts,
        style,
        `</head><body>`,
        body,
        inlineScripts,
        `</body></html>`,
      ].join("\n");

  writeFileSync(join(OUT, page.out), out);
  console.log(`${page.out}: ${(out.length / 1024).toFixed(0)} KB, ${scripts.length} scripts, ${styles.length} stylesheets`);
}
