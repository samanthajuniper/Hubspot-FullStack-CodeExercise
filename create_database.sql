ATTACH DATABASE 'database.db' AS db;

CREATE TABLE IF NOT EXISTS Media (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    year TEXT,
    poster TEXT,
    genre TEXT,
    type TEXT
);

Media (title, year, poster, genre, type)
VALUES (
    'Predator',
    '1987',
    'https://ia.media-imdb.com/images/M/MV5BMTI2ODMzODA0Ml5BMl5BanBnXkFtZTYwNTM3NzY5._V1._CR17,27,308,447_.jpg',
    'action, adventure, sci-fi',
    'movie'
);