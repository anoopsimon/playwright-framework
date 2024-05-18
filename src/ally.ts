import { Page } from 'playwright';
import { injectAxe, checkA11y, configureAxe } from 'axe-playwright';
import logger from './logger';

interface AllyConfig {
  runOnly?: {
    type: string;
    values: string[];
  };
  detailedReport?: boolean;
  detailedReportOptions?: {
    html: boolean;
  };
  outputDirPath?: string;
  outputDir?: string;
  reportFileName?: string;
}

class Ally {
  config: AllyConfig;

  constructor(config: AllyConfig = {}) {
    this.config = {
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
      reportFileName: 'accessibility-audit.html',
      ...config, // Merge default config with custom config
    };
    logger.info('Ally instance created with configuration:', this.config);
  }

  async verify(page: Page, rules: any = null): Promise<void> {
    logger.info('Starting accessibility verification...');
    try {
      // Inject axe-core library into the page
      await injectAxe(page);
      logger.info('Injected axe-core library into the page');

      // Configure axe if needed, e.g., setting custom rules or options
      if (rules) {
        await configureAxe(page, { rules });
        logger.info('Configured axe with custom rules:', rules);
      }

      // Run accessibility checks
      await checkA11y(
        page,
        null,
        {
          axeOptions: {
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
            },
          },
          detailedReport: this.config.detailedReport,
          detailedReportOptions: this.config.detailedReportOptions,
        },
        true,
        'html',
        {
          outputDirPath: this.config.outputDirPath,
          outputDir: this.config.outputDir,
          reportFileName: this.config.reportFileName,
        }
      );
      logger.info('Accessibility check completed successfully');
    } catch (error) {
      logger.error('Error during accessibility verification:', error);
      throw error;
    }
  }
}

export default Ally;
