import { test, expect } from '@playwright/test';
import Interactor from '../src/interactor';
let interactor: Interactor;

test.beforeEach(async () => {
  interactor = new Interactor();
});

test.skip('Insert To DB', async () => {

  await interactor.db.mysql.create({ name: "John Doe", age: 28 });

  const users = await interactor.db.mysql.read({ name: "John Doe" });
  expect(users.length).toBeGreaterThan(0);
  expect(users[0].name).toBe("John Doe");
  expect(users[0].age).toBe(28);

  await interactor.db.mysql.update({ name: "John Doe" }, { age: 29 });
  const updatedUsers = await interactor.db.mysql.read({ name: "John Doe" });
  expect(updatedUsers[0].age).toBe(29);

  await interactor.db.mysql.delete({ name: "John Doe" });


});