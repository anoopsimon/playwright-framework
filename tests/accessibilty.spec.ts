import { test, expect } from '@playwright/test';
import Ally from '../src/ally';
const path = require('path');

test('should have no accessibility violations', async ({ page }) => {
  const filePath = path.resolve(__dirname, 'apps/newspaper.html');

  // Open the local HTML file
  await page.goto(`file://${filePath}`);

  // Create an instance of Ally using the default configuration
  const ally = new Ally();

  // Run accessibility verification
  await ally.verify(page);

  // Other test assertions...
});

test('should have no accessibility violations with custom configuration', async ({ page }) => {
  const filePath = path.resolve(__dirname, 'apps/newspaper.html');

  // Open the local HTML file
  await page.goto(`file://${filePath}`);

  // Create an instance of Ally with custom configuration
  const ally = new Ally({
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
    detailedReport: true,
    detailedReportOptions: {
      html: true,
    },
    outputDirPath: 'results',
    outputDir: 'accessibility',
    reportFileName: 'custom-accessibility-audit.html',
  });

  // Run accessibility verification
  await ally.verify(page);

  // Other test assertions...
});
