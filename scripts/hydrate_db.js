import jsonData from '../data.json' assert { type: "json" };
import { db } from '../backend/services/db.js';

// convert genre array to string
function formatData(data){
    return data.media.map((item) => {
        const stringGenres = item.genre.join(', ');
        return {
            ...item,
            genre: stringGenres
        }
    })
}

// insert json data into Media table
const insert = db.prepare('INSERT INTO MEDIA (title, year, poster, genre, type) VALUES (@title, @year, @poster, @genre, @type)');

const insertMany = db.transaction((media) => {
  for (const mediaItem of media) insert.run(mediaItem);
});

const formattedData = formatData(jsonData)

insertMany(formattedData);