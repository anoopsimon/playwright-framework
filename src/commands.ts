// src/commands.ts
import { Page } from '@playwright/test';

class Commands {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async go(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  // Add other methods as needed
}

export default Commands;
