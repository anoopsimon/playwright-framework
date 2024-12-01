import { test, expect } from '@playwright/test';
import App from '../src/app';
const path = require('path');
let app: App;

test.beforeEach(async () => {
  app = new App();
});

test('Insert To DB', async () => {

  await app.db.mysql.create({ name: "John Doe", age: 28 });

  const users = await app.db.mysql.read({ name: "John Doe" });
  expect(users.length).toBeGreaterThan(0);
  expect(users[0].name).toBe("John Doe");
  expect(users[0].age).toBe(28);

  await app.db.mysql.update({ name: "John Doe" }, { age: 29 });
  const updatedUsers = await app.db.mysql.read({ name: "John Doe" });
  expect(updatedUsers[0].age).toBe(29);

  await app.db.mysql.delete({ name: "John Doe" });


});