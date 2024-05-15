// src/commands.ts
import { Page } from '@playwright/test';
import logger from './logger';

class Commands {
  private page: Page;

  constructor(page: Page) {
    this.page = new Proxy(page, {
      get: (target, prop, receiver) => {
        const origMethod = target[prop as keyof Page];
        if (typeof origMethod === 'function') {
          return async (...args: any[]) => {
            logger.info(`Calling method ${String(prop)} with arguments: ${JSON.stringify(args)}`);
            try {
              const result = await origMethod.apply(target, args);
              logger.info(`Method ${String(prop)} succeeded`);
              return result;
            } catch (error) {
              logger.error(`Method ${String(prop)} failed with error: ${error}`);
              throw error;
            }
          };
        }
        return Reflect.get(target, prop, receiver);
      }
    });
  }

  async go(url: string): Promise<void> {
    logger.info(`Navigating to URL: ${url}`);
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    logger.info(`Clicking on selector: ${selector}`);
    await this.page.click(selector);
  }

  async fill(selector: string, text: string): Promise<void> {
    logger.info(`Filling selector: ${selector} with text: ${text}`);
    await this.page.fill(selector, text);
  }

  async evaluate<T>(selector: string, evalFn: (elements: Element[]) => T): Promise<T> {
    logger.info(`Evaluating selector: ${selector}`);
    return this.page.$$eval(selector, evalFn);
  }

  async isVisible(selector: string): Promise<boolean> {
    logger.info(`Checking visibility of selector: ${selector}`);
    return this.page.isVisible(selector);
  }

  async waitForSelector(selector: string): Promise<void> {
    logger.info(`Waiting for selector: ${selector}`);
    await this.page.waitForSelector(selector);
  }

  async getText(selector: string): Promise<string> {
    logger.info(`Getting text from selector: ${selector}`);
    const text = await this.page.textContent(selector);
    if (text === null) {
        logger.error(`No text found for selector: ${selector}`);
        throw new Error(`No text found for selector: ${selector}`);
    }
    return text;
}

}

export default Commands;
