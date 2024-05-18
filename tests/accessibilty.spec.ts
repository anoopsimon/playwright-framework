import { test, expect } from '@playwright/test';
import { checkA11y, configureAxe, injectAxe } from 'axe-playwright';
const path = require('path');

test('should have no accessibility violations', async ({ page }) => {
  const filePath = path.resolve(__dirname, 'index.html');

  await page.goto(`file://${filePath}`);
  await injectAxe(page)

  await checkA11y(
    page,
    null,
    {
      axeOptions: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a'],
        },
      },
    },
    true,
    'html',
    {
      outputDirPath: 'results',
      outputDir: 'accessibility',
      reportFileName: 'accessibility-audit.html'
    }
  )
  // Verify accessibility

  // Other test assertions...
});
