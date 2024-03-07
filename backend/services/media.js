import { query } from './db.js';

function getData() {
  const rows = query('SELECT * FROM Media');
  return rows;
}

export default {
  getData
}
