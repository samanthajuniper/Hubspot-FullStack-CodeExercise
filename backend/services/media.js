import knex from 'knex';
import path from 'path';

const knexConfig = {
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve('database.db'),
    fileMustExist: true,
  },
  useNullAsDefault: true,
  wrapIdentifier: (value, origImpl) => origImpl(value.toLowerCase()),
};

const knexInstance = knex(knexConfig);

// many genres and years + title text search + type + pagination
function getData(years, genres, searchText, type, limit, offset) {
  console.log("years", years);
  console.log("genres", genres);
  console.log("searchText", searchText);
  console.log("type", type);
  console.log("limit", limit);
  console.log("offset", offset);

  return knexInstance('Media')
    .modify((builder) => {
      if (years && years.length > 0) {
        builder.whereIn('year', years);
      }

      if (genres && genres.length > 0) {
        builder.andWhere((innerBuilder) => {
          genres.forEach((genre, index) => {
            if (index > 0) {
              innerBuilder.orWhere('genre', 'like', `%${genre}%`);
            } else {
              innerBuilder.where('genre', 'like', `%${genre}%`);
            }
          });
        });
      }

      if (searchText) {
        builder.andWhere('title', 'like', `%${searchText}%`);
      }

      if (type) {
        builder.andWhere('type', type);
      }

      // if (limit) {
      //   builder.limit(limit);
      // }

      // if (offset) {
      //   builder.offset(offset);
      // }
    })
    .select('*');
}




export default getData;


// sqlite> SELECT (SELECT COUNT(*) FROM Media WHERE year = '1981') as total, m.* from Media m where genre like '%action%' order by title limit 1 offset 1;