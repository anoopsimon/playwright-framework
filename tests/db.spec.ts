import { test, expect } from '@playwright/test';
import App from '../src/app';
import { MySQLDatabase } from "../src/mysql-database";

const path = require('path');
let app: App;

test('Insert To DB', async () => {
  const mysqlDB = new MySQLDatabase<{ id?: number; name: string; age: number }>(
    {
      host: "localhost",
      user: "sampleuser",
      password: "samplepass",
      database: "sampledb"
    },
    "users"
  );

    await mysqlDB.delete({ name: "John Doe" });
    await mysqlDB.create({ name: "John Doe", age: 28 });

    const users = await mysqlDB.read({ name: "John Doe" });
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].name).toBe("John Doe");
    expect(users[0].age).toBe(28);

    await mysqlDB.update({ name: "John Doe" }, { age: 29 });
    const updatedUsers = await mysqlDB.read({ name: "John Doe" });
    expect(updatedUsers[0].age).toBe(29);

});

