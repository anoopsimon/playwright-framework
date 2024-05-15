// tests/example.test.ts
import { test, expect } from '@playwright/test';
import Commands from '../src/commands';

test.beforeEach(async ({ page }) => {
  global.pw = new Commands(page);
});

test('example test using pw instance', async () => {
  await pw.go('https://www.google.com');
  //await pw.fill('input[name="search"]', 'laptop');
  await pw.click(".gLFyf");

//   const results = await page.$$eval('.product', products => products.length); // Direct page access if needed
//   expect(results).toBeGreaterThan(0);
});
