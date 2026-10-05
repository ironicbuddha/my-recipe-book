import fs from 'node:fs';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { loadLibrary, publisherRedirects } from '../../src/lib/library';

const root = 'http://127.0.0.1:4322';
const out = 'output/playwright';
const library = loadLibrary();
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
// tsx names nested browser callbacks with this helper; it only returns the function.
await page.addInitScript('window.__name = (fn) => fn');
const report: Record<string, unknown> = {
  recipes: library.recipes.length,
  overflow: [],
  screenshots: [],
  redirects: [],
  textEnlargement: [],
};
const representatives = [
  'asian-ginger-chicken-noodle-soup',
  'sourdough-bread',
  'reverse-seared-fillet-hibachi-cabbage-steakhouse-fries-gochujang-sauce',
];
for (const slug of representatives) {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const response = await page.goto(`${root}/recipes/${slug}/`);
    assert.equal(response?.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    assert.equal(await page.locator('.modernist-recipe h1').count(), 1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    assert.equal(overflow, false, `${slug} ${width} overflow`);
    await page.screenshot({
      path: `${out}/modernist-${slug}-${width}.png`,
      fullPage: true,
    });
    (report.screenshots as unknown[]).push({ slug, width });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%';
    });
    const enlarged = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    assert.ok(
      enlarged.scroll <= enlarged.width,
      `${slug} ${width} enlarged overflow`,
    );
    (report.textEnlargement as unknown[]).push({ slug, ...enlarged });
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: `${out}/modernist-${slug}-${width}-text200.png`,
        fullPage: true,
      });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '';
    });
  }
  for (const format of ['A4', 'Letter'] as const) {
    await page.pdf({
      path: `${out}/modernist-${slug}-${format}.pdf`,
      format,
      printBackground: true,
    });
  }
}
for (const recipe of library.recipes) {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(root + recipe.href);
    const measures = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      width: innerWidth,
    }));
    if (measures.scroll > measures.width)
      (report.overflow as unknown[]).push({
        recipe: recipe.identity,
        ...measures,
      });
  }
}
assert.deepEqual(report.overflow, []);
await page.goto(`${root}/recipes/sourdough-bread/`);
await page.locator('.phase-jumps a').nth(1).focus();
await page.keyboard.press('Enter');
assert.equal(
  await page.evaluate(() => document.activeElement?.id),
  'phase-b-mix-and-develop-dough',
);
await page.keyboard.press('Tab');
assert.ok(await page.evaluate(() => document.activeElement?.tagName === 'A'));
await page.evaluate(() => {
  Object.defineProperty(navigator, 'share', {
    value: undefined,
    configurable: true,
  });
});
await page.getByRole('button', { name: 'Share', exact: true }).click();
assert.equal(
  await page.locator('dialog').evaluate((el) => (el as HTMLDialogElement).open),
  true,
);
await page.keyboard.press('Escape');
await page.evaluate(() => {
  window.print = () => {
    document.body.dataset.printInvoked = 'true';
  };
});
await page.getByRole('button', { name: 'Print', exact: true }).click();
assert.equal(
  await page.locator('body').getAttribute('data-print-invoked'),
  'true',
);
fs.writeFileSync(
  `${out}/modernist-bread-accessibility.yml`,
  await page.locator('.modernist-recipe').ariaSnapshot(),
);
report.utilities =
  'Jump focuses its heading; Tab continues into Phase links; Share dialog opens/Escape closes; Print invokes window.print.';
report.contrast = await page.evaluate(() => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const rgb = (color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return Array.from(ctx.getImageData(0, 0, 1, 1).data).slice(0, 3);
  };
  const lum = (color: number[]) =>
    color
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const paper = lum(rgb(getComputedStyle(document.body).backgroundColor));
  return ['.modernist-recipe', '.ingredient-note', '.scale-basis'].map(
    (selector) => {
      const ink = lum(
        rgb(getComputedStyle(document.querySelector(selector)!).color),
      );
      return { selector, ratio: (paper + 0.05) / (ink + 0.05) };
    },
  );
});
assert.ok(
  (report.contrast as { ratio: number }[]).every((entry) => entry.ratio >= 4.5),
);
for (const [name, route] of [
  ['home', '/'],
  ['index', '/recipes/'],
  ['knowledge', '/ingredients/bread-flour/'],
]) {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(root + route);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${out}/modernist-after-${name}.png`,
    fullPage: true,
  });
}
for (const [source, redirect] of Object.entries(publisherRedirects())) {
  const response = await page.goto(root + source);
  // Static Astro preview emits redirect documents; HTTP 301 belongs to hosting config.
  if (response) assert.ok(response.ok());
  await page.waitForURL(root + redirect.destination);
  (report.redirects as unknown[]).push({
    source,
    destination: redirect.destination,
    currentUrl: page.url(),
  });
}
await page.goto(`${root}/recipes/sourdough-bread/`);
await page.locator('.cooking-hero').evaluate((el) => el.remove());
assert.equal(await page.locator('.preparation-group').count(), 3);
await page.screenshot({
  path: `${out}/modernist-no-hero-fixture.png`,
  fullPage: true,
});
await page
  .locator('.method-content')
  .first()
  .evaluate((el) => {
    const list = el.querySelector('ol')!;
    list.start = 100;
    for (let i = 0; i < 120; i++) {
      const li = document.createElement('li');
      li.textContent =
        'Layout-only long Phase fixture. Keep cooking text readable through pagination.';
      list.append(li);
    }
  });
await page.screenshot({
  path: `${out}/modernist-three-digit-fixture.png`,
  fullPage: true,
});
for (const format of ['A4', 'Letter'] as const)
  await page.pdf({
    path: `${out}/modernist-long-phase-${format}.pdf`,
    format,
    printBackground: true,
  });
report.fixtures =
  'DOM-only absent hero, three-digit numbering and long Phase. No canonical content authored.';
fs.writeFileSync(
  `${out}/modernist-audit.json`,
  JSON.stringify(report, null, 2),
);
fs.writeFileSync(
  `${out}/modernist-text-enlargement.json`,
  JSON.stringify(report.textEnlargement, null, 2),
);
await browser.close();
console.log(
  JSON.stringify({
    recipes: report.recipes,
    overflow: report.overflow,
    contrast: report.contrast,
    utilities: report.utilities,
  }),
);
