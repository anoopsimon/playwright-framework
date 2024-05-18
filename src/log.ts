// Import allure from allure-playwright
import { allure } from "allure-playwright";

class Log {
  // Method for logging a passed step
  async pass(message) {
    await allure.step(message, async () => {
      allure.label("status", "passed");
      return Promise.resolve();
    });
  }

  // Method for logging a failed step
  async fail(message) {
    await allure.step(message, async () => {
      allure.label("status", "failed");
      return Promise.resolve();
    });
  }

  // Method for logging an info step
  async info(message) {
    await allure.step(message, async () => {
      allure.label("status", "info");
      return Promise.resolve();
    });
  }

  // Method for logging a warning step
  async warn(message) {
    await allure.step(message, async () => {
      allure.label("status", "warn");
      return Promise.resolve();
    });
  }

  // Method for adding an attachment
  async addAttachment(name, content, type = 'text/plain') {
    allure.attachment(name, content, type);
    return Promise.resolve();
  }

  // Method for adding a screenshot attachment
  async addScreenshot(name, path) {
    allure.attachment(name, path, 'image/png');
    return Promise.resolve();
  }

  // Method for adding a JSON attachment
  async addJsonAttachment(name, jsonObject) {
    allure.attachment(name, JSON.stringify(jsonObject, null, 2), 'application/json');
    return Promise.resolve();
  }


  // Method for adding a label
  async addLabel(name, value) {
    allure.label(name, value);
    return Promise.resolve();
  }

  // Method for adding a parameter
  async addParameter(name, value) {
    allure.parameter(name, value);
    return Promise.resolve();
  }

  // Method for adding a link
  async addLink(url, name, type) {
    allure.link(url, name, type);
    return Promise.resolve();
  }
}

// Usage example
(async () => {
  const log = new Log();
  await log.pass("Sample pass step");
  await log.fail("Sample fail step");
  await log.info("Sample info step");
  await log.warn("Sample warn step");
  await log.addAttachment("Sample Text Attachment", "This is the content of the attachment.");
  await log.addScreenshot("Sample Screenshot", "/path/to/screenshot.png");
  await log.addJsonAttachment("Sample JSON Attachment", { key: "value" });

  await log.addLabel("Feature", "Logging");
  await log.addParameter("Environment", "Production");
  await log.addLink("http://example.com", "Example", "custom");
})();

// src/commands.ts
import { Page } from '@playwright/test';
import logger from './logger';



export default Log;
