const { chromium } = require('playwright-core');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Onboarding: logo -> get quotation screen -> click button to reveal studio
  await page.waitForSelector('.splash-enter, #stepper', { timeout: 8000 }).catch(() => {});
  const enterBtn = await page.$('.splash-enter');
  if (enterBtn) {
    await enterBtn.click();
  }
  await page.waitForSelector('#stepper', { timeout: 8000 });

  // Go to accessories step
  await page.click('[data-action="continue"]');
  await page.waitForSelector('.accessory-card', { timeout: 8000 });
  await page.screenshot({ path: 'accessories_initial.png' });

  // Grab a handle to the FIRST accessory card's icon svg node to check if it survives selection (no full re-render)
  const firstCardIconHandle = await page.evaluateHandle(() => {
    const card = document.querySelectorAll('.accessory-card')[0];
    window.__markedNode = card.querySelector('.accessory-art');
    window.__markedNode.setAttribute('data-test-marker', 'original');
    return window.__markedNode;
  });

  // Click accessory 1
  await page.click('.accessory-card:nth-of-type(1)');
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'accessories_one_selected.png' });

  const survivedAfterFirstClick = await page.evaluate(() => {
    const card = document.querySelectorAll('.accessory-card')[0];
    return card.querySelector('.accessory-art')?.getAttribute('data-test-marker') === 'original';
  });

  // Click accessory 2 (this used to cause the "blink" because renderMain() wiped the whole grid)
  await page.click('.accessory-card:nth-of-type(2)');
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'accessories_two_selected.png' });

  const survivedAfterSecondClick = await page.evaluate(() => {
    const card = document.querySelectorAll('.accessory-card')[0];
    return card.querySelector('.accessory-art')?.getAttribute('data-test-marker') === 'original';
  });

  // Check sidebar accessory lines rendered with icons
  const sidebarLines = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.price-line.accessory-line')).map(el => ({
      hasIcon: !!el.querySelector('.line-icon'),
      text: el.textContent.trim(),
    }));
  });

  await page.screenshot({ path: 'sidebar_detail.png', clip: await page.$eval('.summary', el => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: Math.min(r.height, 900) };
  }) });

  console.log('survivedAfterFirstClick (should be true — targeted DOM update, no full re-render):', survivedAfterFirstClick);
  console.log('survivedAfterSecondClick (should be true — proves no blink/full re-render on 2nd select):', survivedAfterSecondClick);
  console.log('sidebarLines:', JSON.stringify(sidebarLines, null, 2));
  console.log('console/page errors:', errors);

  await browser.close();
})();
