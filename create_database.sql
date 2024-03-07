ATTACH DATABASE 'database.db' AS db;

CREATE TABLE IF NOT EXISTS db.Media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    year TEXT,
    poster TEXT,
    genre TEXT,
    type TEXT
);