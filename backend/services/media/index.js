import knex from 'knex';
import path from 'path';

const database_path = process.env.DATABASE_FILE || 'database.db'


const knexConfig = {
  client: 'better-sqlite3',
  connection: {
    filename: path.resolve(database_path),
    fileMustExist: true,
  },
  useNullAsDefault: true,
  wrapIdentifier: (value, origImpl) => origImpl(value.toLowerCase()),
};

const knexInstance = knex(knexConfig);

/// Shared builder function
export function applyFilters(builder, years, genres, searchText, type) {
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
export function getMediaData(years, genres, searchText, type, limit, currentPage) {
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

     builder.orderBy('title', 'asc');

    })
    .select('*');

  return data;
}

// Function to get all genres and years
export async function getMediaMetaData() {
  try {
    const genres = await knexInstance('Media').select('genre')
    const distinctYears = await knexInstance('Media').distinct('year').orderBy('year', 'asc');;

    return {
      genres: genres,
      years: distinctYears.map((row) => row.year),
    };
  } catch (error) {
    throw new Error(`Error fetching media metadata: ${error.message}`);
  }
}
