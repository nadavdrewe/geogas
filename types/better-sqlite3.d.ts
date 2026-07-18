declare module "better-sqlite3" {
  export type DatabaseOptions = {
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
  };

  export type RunResult = {
    changes: number;
    lastInsertRowid: number | bigint;
  };

  export type Statement = {
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
    run(...params: unknown[]): RunResult;
  };

  export type Database = {
    exec(sql: string): Database;
    prepare(sql: string): Statement;
    pragma(source: string): unknown;
    close(): void;
  };

  export default class DatabaseConstructor {
    constructor(filename: string, options?: DatabaseOptions);
    exec(sql: string): Database;
    prepare(sql: string): Statement;
    pragma(source: string): unknown;
    close(): void;
  }
}
