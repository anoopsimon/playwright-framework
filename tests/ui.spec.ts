import { test, expect } from '@playwright/test';
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import App from '../src/app';

const path = require('path');
let app: App;

test.beforeEach(async ({ page }) => {
  app = new App(page);

  await allure.description(
    "This test attempts to log into the website using a login and a password. Fails if any error happens.\n\nNote that this test does not test 2-Factor Authentication.",
  );
  await allure.owner("John Doe");
  await allure.tags("NewUI", "Essentials", "Authentication");
  await allure.severity(Severity.CRITICAL);
  await allure.link("https://example.com/docs", "Related Documentation");
  await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
  await allure.tms("TMS-456", "https://example.com/tms/TMS-456");
  //import { allure } from "allure-playwright";

  await allure.logStep("Sample step");
  //global.app = new Commands(page);
  const filePath = path.resolve(__dirname, 'apps/index.html');

  await app.ui.go(`file://${filePath}`); 
});

test('should load registration page', async () => {
  await app.ui.waitForSelector('#register-container');
  expect(await app.ui.isVisible('#register-container')).toBeTruthy();
});

test('should register successfully', async () => {
  await app.ui.fill('#firstname', 'John');
  await app.ui.fill('#lastname', 'Doe');
  await app.ui.fill('#email', 'john.doe@example.com');
  await app.ui.fill('#password', 'password123');
  await app.ui.fill('#question1', '1990-01-01');
  await app.ui.fill('#question2', '1234567890');
  await app.ui.fill('#question3', '123 Main St');
  await app.ui.fill('#question4', 'Anytown');
  await app.ui.fill('#question5', 'Anystate');
  await app.ui.fill('#question6', '12345');
  await app.ui.fill('#question7', 'USA');
  await app.ui.fill('#question8', 'Email');
  await app.ui.fill('#question9', 'First pet name');
  await app.ui.fill('#question10', 'Fluffy');
  await app.ui.click('button[type="submit"]');
  await app.ui.waitForSelector('#success-container');
  expect(await app.ui.isVisible('#success-container')).toBeTruthy();
});

test('should validate first name field', async () => {
  await app.ui.fill('#firstname', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#firstname:invalid')).toBeTruthy();
});

test('should validate last name field', async () => {
  await app.ui.fill('#lastname', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#lastname:invalid')).toBeTruthy();
});

test('should validate email field', async () => {
  await app.ui.fill('#email', 'invalid-email');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#email:invalid')).toBeTruthy();
});

test('should validate password field', async () => {
  await app.ui.fill('#password', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#password:invalid')).toBeTruthy();
});

test('should validate date of birth field', async () => {
  await app.ui.fill('#question1', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#question1:invalid')).toBeTruthy();
});

test('should validate phone number field', async () => {
  await app.ui.fill('#question2', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#question2:invalid')).toBeTruthy();
});

test('should validate address field', async () => {
  await app.ui.fill('#question3', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#question3:invalid')).toBeTruthy();
});

test('should validate city field', async () => {
  await app.ui.fill('#question4', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#question4:invalid')).toBeTruthy();
});

test('should validate postal code field', async () => {
  await app.ui.fill('#question6', '');
  await app.ui.click('button[type="submit"]');
  expect(await app.ui.isVisible('#question6:invalid')).toBeTruthy();
});
