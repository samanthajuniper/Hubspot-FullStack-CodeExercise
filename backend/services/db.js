import Database from 'better-sqlite3';
import path from "path";

const database_path = process.env.DATABASE_FILE || 'database.db'

const db = new Database(path.resolve(database_path), {
  fileMustExist: true
});

export {
  db
}
