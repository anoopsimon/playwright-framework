import { test, expect } from '@playwright/test';
import { Severity } from "allure-js-commons";
import { allure } from "allure-playwright";
import Interactor from '../src/interactor';

const path = require('path');
let interactor: Interactor;

test.beforeEach(async ({ page }) => {
  interactor = new Interactor(page);

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

  await interactor.ui.go(`file://${filePath}`); 
});

test('should load registration page', async () => {
  await interactor.ui.waitForSelector('#register-container');
  expect(await interactor.ui.isVisible('#register-container')).toBeTruthy();
});

test('should register successfully', async () => {
  await interactor.ui.fill('#firstname', 'John');
  await interactor.ui.fill('#lastname', 'Doe');
  await interactor.ui.fill('#email', 'john.doe@example.com');
  await interactor.ui.fill('#password', 'password123');
  await interactor.ui.fill('#question1', '1990-01-01');
  await interactor.ui.fill('#question2', '1234567890');
  await interactor.ui.fill('#question3', '123 Main St');
  await interactor.ui.fill('#question4', 'Anytown');
  await interactor.ui.fill('#question5', 'Anystate');
  await interactor.ui.fill('#question6', '12345');
  await interactor.ui.fill('#question7', 'USA');
  await interactor.ui.fill('#question8', 'Email');
  await interactor.ui.fill('#question9', 'First pet name');
  await interactor.ui.fill('#question10', 'Fluffy');
  await interactor.ui.click('button[type="submit"]');
  await interactor.ui.waitForSelector('#success-container');
  expect(await interactor.ui.isVisible('#success-container')).toBeTruthy();
});

test('should validate first name field', async () => {
  await interactor.ui.fill('#firstname', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#firstname:invalid')).toBeTruthy();
});

test('should validate last name field', async () => {
  await interactor.ui.fill('#lastname', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#lastname:invalid')).toBeTruthy();
});

test('should validate email field', async () => {
  await interactor.ui.fill('#email', 'invalid-email');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#email:invalid')).toBeTruthy();
});

test('should validate password field', async () => {
  await interactor.ui.fill('#password', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#password:invalid')).toBeTruthy();
});

test('should validate date of birth field', async () => {
  await interactor.ui.fill('#question1', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#question1:invalid')).toBeTruthy();
});

test('should validate phone number field', async () => {
  await interactor.ui.fill('#question2', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#question2:invalid')).toBeTruthy();
});

test('should validate address field', async () => {
  await interactor.ui.fill('#question3', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#question3:invalid')).toBeTruthy();
});

test('should validate city field', async () => {
  await interactor.ui.fill('#question4', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#question4:invalid')).toBeTruthy();
});

test('should validate postal code field', async () => {
  await interactor.ui.fill('#question6', '');
  await interactor.ui.click('button[type="submit"]');
  expect(await interactor.ui.isVisible('#question6:invalid')).toBeTruthy();
});
