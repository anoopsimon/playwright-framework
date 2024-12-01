import { Database } from "./database";
import mysql from "mysql2/promise";

export class MySQLDatabase<T> implements Database<T> {
  private connection: mysql.Connection | null = null;
  private tableName: string;

  constructor(private config: mysql.ConnectionOptions, tableName: string) {
    this.tableName = tableName;
  }

  private async initConnection(): Promise<void> {
    if (!this.connection) {
      this.connection = await mysql.createConnection(this.config);
    }
  }

  async create(data: T): Promise<void> {
    await this.initConnection();
    const keys = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map(() => "?").join(", ");
    const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`;
    await this.connection!.execute(query, values);
  }
  
  async read(filter: Partial<T>): Promise<T[]> {
    await this.initConnection();
    const keys = Object.keys(filter).map((key) => `${key} = ?`).join(" AND ");
    const values = Object.values(filter);
    const query = `SELECT * FROM ${this.tableName} WHERE ${keys}`;
    const [rows] = await this.connection!.execute<mysql.RowDataPacket[]>(query, values);
    return rows as T[];
  }
  
  async update(filter: Partial<T>, data: Partial<T>): Promise<void> {
    await this.initConnection();
    const dataKeys = Object.keys(data).map((key) => `${key} = ?`).join(", ");
    const filterKeys = Object.keys(filter).map((key) => `${key} = ?`).join(" AND ");
    const query = `UPDATE ${this.tableName} SET ${dataKeys} WHERE ${filterKeys}`;
    await this.connection!.execute(query, [...Object.values(data), ...Object.values(filter)]);
  }
  
  async delete(filter: Partial<T>): Promise<void> {
    await this.initConnection();
    const keys = Object.keys(filter).map((key) => `${key} = ?`).join(" AND ");
    const values = Object.values(filter);
    const query = `DELETE FROM ${this.tableName} WHERE ${keys}`;
    const [x, result] = await this.connection!.execute(query, values);
  
  }
  
}
