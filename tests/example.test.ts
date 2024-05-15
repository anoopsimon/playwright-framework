import { test, expect } from '@playwright/test';
import Commands from '../src/commands';
const path = require('path');

test.beforeEach(async ({ page }) => {
  global.app = new Commands(page);
  const filePath = path.resolve(__dirname, 'index.html');

  await app.go(`file://${filePath}`); 
});

test('should load registration page', async () => {
  await app.waitForSelector('#register-container');
  expect(await app.isVisible('#register-container')).toBeTruthy();
});

test('should register successfully', async () => {
  await app.fill('#firstname', 'John');
  await app.fill('#lastname', 'Doe');
  await app.fill('#email', 'john.doe@example.com');
  await app.fill('#password', 'password123');
  await app.fill('#question1', '1990-01-01');
  await app.fill('#question2', '1234567890');
  await app.fill('#question3', '123 Main St');
  await app.fill('#question4', 'Anytown');
  await app.fill('#question5', 'Anystate');
  await app.fill('#question6', '12345');
  await app.fill('#question7', 'USA');
  await app.fill('#question8', 'Email');
  await app.fill('#question9', 'First pet name');
  await app.fill('#question10', 'Fluffy');
  await app.click('button[type="submit"]');
  await app.waitForSelector('#success-container');
  expect(await app.isVisible('#success-container')).toBeTruthy();
});

test('should validate first name field', async () => {
  await app.fill('#firstname', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#firstname:invalid')).toBeTruthy();
});

test('should validate last name field', async () => {
  await app.fill('#lastname', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#lastname:invalid')).toBeTruthy();
});

test('should validate email field', async () => {
  await app.fill('#email', 'invalid-email');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#email:invalid')).toBeTruthy();
});

test('should validate password field', async () => {
  await app.fill('#password', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#password:invalid')).toBeTruthy();
});

test('should validate date of birth field', async () => {
  await app.fill('#question1', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#question1:invalid')).toBeTruthy();
});

test('should validate phone number field', async () => {
  await app.fill('#question2', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#question2:invalid')).toBeTruthy();
});

test('should validate address field', async () => {
  await app.fill('#question3', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#question3:invalid')).toBeTruthy();
});

test('should validate city field', async () => {
  await app.fill('#question4', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#question4:invalid')).toBeTruthy();
});

test('should validate postal code field', async () => {
  await app.fill('#question6', '');
  await app.click('button[type="submit"]');
  expect(await app.isVisible('#question6:invalid')).toBeTruthy();
});
