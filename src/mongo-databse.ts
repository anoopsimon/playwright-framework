// mongo-database.ts
import { Database } from "./database";
import { MongoClient, Db, Collection } from "mongodb";

export class MongoDBDatabase<T> implements Database<T> {
  private client: MongoClient;
  private db: Db;
  private collection: Collection<T>;

  constructor(uri: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(uri);
    this.db = this.client.db(dbName);
    this.collection = this.db.collection(collectionName);
  }

  async create(data: T): Promise<void> {
    await this.collection.insertOne(data);
  }

  async read(filter: Partial<T>): Promise<T[]> {
    const result = await this.collection.find(filter).toArray();
    return result;
  }

  async update(filter: Partial<T>, data: Partial<T>): Promise<void> {
    await this.collection.updateMany(filter, { $set: data });
  }

  async delete(filter: Partial<T>): Promise<void> {
    await this.collection.deleteMany(filter);
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
