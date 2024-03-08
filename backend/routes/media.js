import { Router } from 'express';
import getData from '../services/media.js';

const router = Router();

// TODO:
// security: sanitization & validation of query params
router.get('/', async function(req, res) {
  try {
    console.log(req.query.limit)
    const years = req.query.years ? req.query.years.split(',') : [];
    const genres = req.query.genres ? req.query.genres.split(',') : [];
    const searchText = req.query.searchText || '';
    const type = req.query.type || '';
    const limit = req.query.limit || 10; // Default limit to 10 if not provided
    const offset = req.query.offset || 0; // Default offset to 0 if not provided

    const data = await getData(years, genres, searchText, type, limit, offset);

    // TODO: fix pagination
    // const totalPages = Math.ceil(totalRecords / limit);

    // const paginationInfo = {
    //   totalRecords,
    //   totalPages,
    //   currentPage: Math.floor(offset / limit) + 1,
    //   pageSize: limit,
    // };
    res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
    // excluding unused methods
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // TODO: Send the response with status 200, JSON data, and pagination information
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching media `, error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
