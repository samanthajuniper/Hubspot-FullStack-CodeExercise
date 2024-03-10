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

/// Shared builder function
function applyFilters(builder, years, genres, searchText, type) {
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
}

// Function to get total records count
export function getTotalRecordsCount(years, genres, searchText, type) {
  const totalRecords = knexInstance('Media')
    .modify((builder) => {
      applyFilters(builder, years, genres, searchText, type);
    })
    .count();

  return totalRecords;
}

// Function to get data with pagination
export function getData(years, genres, searchText, type, limit, currentPage) {
  const data = knexInstance('Media')
    .modify((builder) => {
      applyFilters(builder, years, genres, searchText, type);

      if (limit) {
        builder.limit(limit);
      }

      if (currentPage) {
        const offset = (currentPage - 1) * limit
        builder.offset(offset);
      }
    })
    .select('*');

  return data;
}

// sqlite> SELECT (SELECT COUNT(*) FROM Media WHERE year = '1981') as total, m.* from Media m where genre like '%action%' order by title limit 1 offset 1;