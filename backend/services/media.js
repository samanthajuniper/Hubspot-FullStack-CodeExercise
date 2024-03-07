import { query } from './db.js';

// todo use query builder such as Knex
function getData(year, genre) {
  let q = '';

  if (year !== undefined || genre !== undefined) {
    q += ' WHERE ';

    if (year !== undefined) {
      q += ` year = ${year}`;
    }

    if (genre !== undefined) {
      if (year !== undefined) {
        q += ' AND ';
      }
      q += ` genre LIKE '%${genre}%'`; // Using LIKE for pattern matching
    }
  }

  const rows = db.query(`SELECT * FROM Media${q}`);
  return rows;
}

export default {
  getData
}
