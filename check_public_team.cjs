const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/team', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const accept = page.getByText('ALLE AKZEPTIEREN');
  if (await accept.isVisible().catch(() => false)) { await accept.click(); await page.waitForTimeout(300); }
  await page.screenshot({ path: 'C:/Users/xdd/AppData/Local/Temp/claude/d--repos-gemini-happy/fb2ef5fa-aa0a-48f5-b032-aff90501b9eb/scratchpad/public-team-check.png', fullPage: true });
  await browser.close();
})();
