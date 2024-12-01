import { test, expect } from '@playwright/test';
import App from '../src/app';
import { MySQLDatabase } from "../src/mysql-database";
import { appConfig } from '../config.js'; 

const path = require('path');
let app: App;

skip('Insert To DB', async () => {
  const mysqlDB = new MySQLDatabase<{ id?: number; name: string; age: number }>(
    {
      host: appConfig.database.mysql.host,
      user: appConfig.database.mysql.user,
      password: appConfig.database.mysql.password,
      database: appConfig.database.mysql.database
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