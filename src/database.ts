// database.ts
export interface Database<T> {
    create(data: T): Promise<void>;
    read(filter: Partial<T>): Promise<T[]>;
    update(filter: Partial<T>, data: Partial<T>): Promise<void>;
    delete(filter: Partial<T>): Promise<void>;
  }
  