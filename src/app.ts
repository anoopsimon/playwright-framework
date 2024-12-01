import Ally from './ally';
import Commands from './commands';
import { Page } from 'playwright';
import { MySQLDatabase } from "./mysql-database";
import { MongoDBDatabase } from "./mongo-databse";

class App {
  ally: Ally;
  ui?: Commands; // make ui optional
  db: {
    mysql: MySQLDatabase<any>;
    mongo: MongoDBDatabase<any>;
  };

  constructor(page?: Page) {
    this.ally = new Ally();
    // Only initialize ui if page is provided
    if (page) {
      this.ui = new Commands(page);
    } else {
      console.warn("Page not provided, you won't be able to use UI commands.");
    }
    this.db = {
      mysql: new MySQLDatabase(
        {
          host: "localhost",
          user: "sampleuser",
          password: "samplepass",
          database: "sampledb",
        },
        "users"
      ),
      mongo: new MongoDBDatabase("mongodb://localhost:27017", "testdb", "users"),
    };
  }
}

export default App;
