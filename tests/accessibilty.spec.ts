import { test, expect } from '@playwright/test';
import path from 'path';
import App from '../src/app';
import Log from '../src/log';


const url = `file://${path.resolve(__dirname, 'apps/newspaper.html')}`;

let app: App;

test.beforeEach(async ({ page }) => {
  app = new App(page);
});

test('should have no accessibility violations', async ({ page }) => {
  await page.goto(url);
  await app.ally.verify(page);
  // const log = new Log();
  // await log.pass("Sample pass step - Anoop");
});
