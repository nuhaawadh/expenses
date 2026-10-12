// shot.js — screenshot + console-error harness for the self-critique loop
// Usage: node tools/shot.js <url> <out.png> [WxH=1440x900] [waitMs=3000] [scrollY=0]
// Example: node tools/shot.js http://localhost:4179/site-a/ shots/a-desktop-top.png 1440x900 3000 0
const puppeteer = require('puppeteer');

(async () => {
  const [url, out, size = '1440x900', wait = '3000', scrollY = '0'] = process.argv.slice(2);
  if (!url || !out) {
    console.error('Usage: node tools/shot.js <url> <out.png> [WxH] [waitMs] [scrollY]');
    process.exit(1);
  }
  const [width, height] = size.split('x').map(Number);
  const errors = [];
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: process.getuid && process.getuid() === 0 ? ['--no-sandbox'] : [],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 600, hasTouch: width < 600 });
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.evaluate(y => window.scrollTo(0, Number(y)), scrollY);
    await new Promise(r => setTimeout(r, Number(wait)));
    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: out });
    console.log(JSON.stringify({ out, docHeight, errors }));
  } finally {
    await browser.close();
  }
})();
