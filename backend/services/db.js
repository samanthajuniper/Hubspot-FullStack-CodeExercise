import Database from 'better-sqlite3';
import path from "path";

const db = new Database(path.resolve('database.db'), {
  fileMustExist: true
});

function query(sql) {
  return db.prepare(sql).all();
}

export {
  db,
  query
}
