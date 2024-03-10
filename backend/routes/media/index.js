import { Router } from 'express';
import cors from 'cors';
import { getMediaData, getTotalRecordsCount, getMediaMetaData } from '../../services/media/index.js';

const router = Router();

router.use(cors({ origin: 'http://localhost:1234' }));

// TODO:
// security: sanitization & validation of query params
router.get('/', async function(req, res) {
  try {
    const {
      years: rawYears = '',
      genres: rawGenres = '',
      searchText = '',
      type = '',
      limit = 8,
      currentPage = 1,
    } = req.query;

    const years = rawYears ? rawYears.split(',') : [];
    const genres = rawGenres ? rawGenres.split(',') : [];

    const totalRecordsResult = await getTotalRecordsCount(years, genres, searchText, type);
    const totalRecords = totalRecordsResult[0]['count(*)'];
  
    const data = await getMediaData(years, genres, searchText, type, limit, currentPage);

    // Calculate pagination information
    const totalPages = Math.ceil(totalRecords / limit);
    const paginationInfo = {
      totalRecords,
      totalPages,
      currentPage: parseInt(currentPage),
      pageSize: parseInt(limit),
    };

    // Send response with status 200, JSON data, and pagination information
    res.status(200).json({ media: data, paginationInfo });
  } catch (error) {
    console.error(`Error fetching media `, error.message);
    res.status(500).json({ message: error.message });
  }
});

// used to retrieve genres and routes for filters on FE
router.get('/metadata', async function (req, res) {
  try {
    const {genres, years} = await getMediaMetaData();

    const genresSet = new Set();

    genres.forEach((row) => {
      const genresList = row.genre.split(',').map((genre) => genre.trim())
      genresList.forEach((genre) => genresSet.add(genre));
    })

    const distinctGenres = Array.from(genresSet).sort();

    // Send response with status 200 and JSON metadata
    res.status(200).json({genres: distinctGenres, years});
  } catch (error) {
    console.error(`Error fetching media metadata: `, error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
