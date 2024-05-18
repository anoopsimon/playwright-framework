import { test, expect } from '@playwright/test';
import Ally from '../src/ally';
import path from 'path';
const url = `file://${path.resolve(__dirname, 'apps/newspaper.html')}`;

test('should have no accessibility violations', async ({ page }) => {
  const ally = new Ally();

  await page.goto(url);
  await ally.verify(page);

});
