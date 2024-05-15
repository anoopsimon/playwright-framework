// tests/registration.test.ts
import { test, expect } from '@playwright/test';
import Commands from '../src/commands';

test.beforeEach(async ({ page }) => {
  global.pw = new Commands(page);
  await pw.go('http://127.0.0.1:5500/tests/index.html'); // Update with the correct path
});

test('should load registration page', async () => {
  await pw.waitForSelector('#register-container');
  expect(await pw.isVisible('#register-container')).toBeTruthy();
});

test('should register successfully', async () => {
  await pw.fill('#firstname', 'John');
  await pw.fill('#lastname', 'Doe');
  await pw.fill('#email', 'john.doe@example.com');
  await pw.fill('#password', 'password123');
  await pw.fill('#question1', '1990-01-01');
  await pw.fill('#question2', '1234567890');
  await pw.fill('#question3', '123 Main St');
  await pw.fill('#question4', 'Anytown');
  await pw.fill('#question5', 'Anystate');
  await pw.fill('#question6', '12345');
  await pw.fill('#question7', 'USA');
  await pw.fill('#question8', 'Email');
  await pw.fill('#question9', 'First pet name');
  await pw.fill('#question10', 'Fluffy');
  await pw.click('button[type="submit"]');
  await pw.waitForSelector('#success-container');
  expect(await pw.isVisible('#success-container')).toBeTruthy();
});

test('should validate first name field', async () => {
  await pw.fill('#firstname', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#firstname:invalid')).toBeTruthy();
});

test('should validate last name field', async () => {
  await pw.fill('#lastname', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#lastname:invalid')).toBeTruthy();
});

test('should validate email field', async () => {
  await pw.fill('#email', 'invalid-email');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#email:invalid')).toBeTruthy();
});

test('should validate password field', async () => {
  await pw.fill('#password', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#password:invalid')).toBeTruthy();
});

test('should validate date of birth field', async () => {
  await pw.fill('#question1', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#question1:invalid')).toBeTruthy();
});

test('should validate phone number field', async () => {
  await pw.fill('#question2', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#question2:invalid')).toBeTruthy();
});

test('should validate address field', async () => {
  await pw.fill('#question3', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#question3:invalid')).toBeTruthy();
});

test('should validate city field', async () => {
  await pw.fill('#question4', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#question4:invalid')).toBeTruthy();
});

test('should validate postal code field', async () => {
  await pw.fill('#question6', '');
  await pw.click('button[type="submit"]');
  expect(await pw.isVisible('#question6:invalid')).toBeTruthy();
});
