import { test, expect } from '@playwright/test';
import path from 'path';
import Interactor from '../src/interactor';
import Log from '../src/log';


const url = `file://${path.resolve(__dirname, 'apps/newspaper.html')}`;

let interator: Interactor;

test.beforeEach(async ({ page }) => {
  interator = new Interactor(page);
});

test('should have no accessibility violations', async ({ page }) => {
  await page.goto(url);
  await interator.ally.verify(page);
});
