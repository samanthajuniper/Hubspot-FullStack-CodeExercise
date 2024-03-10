import { Router } from 'express';
import {getData, getTotalRecordsCount} from '../services/media.js';

const router = Router();

// TODO:
// security: sanitization & validation of query params
router.get('/', async function(req, res) {
  try {
    const years = req.query.years ? req.query.years.split(',') : [];
    const genres = req.query.genres ? req.query.genres.split(',') : [];
    const searchText = req.query.searchText || '';
    const type = req.query.type || '';
    const limit = req.query.limit || 9;
    console.log("🚀 ~ router.get ~ limit:", limit)
    const currentPage = req.query.currentPage || 1;
    // Call function to get total records count
   const totalRecordsResult = await getTotalRecordsCount(years, genres, searchText, type);

    // Extract count value from the result
    const totalRecords = totalRecordsResult[0]['count(*)'];
  
    const data = await getData(years, genres, searchText, type, limit, currentPage);

    // Calculate pagination information
    const totalPages = Math.ceil(totalRecords / limit);
    const paginationInfo = {
      totalRecords,
      totalPages,
      currentPage,
      pageSize: limit,
    };

    // Set CORS headers
    res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Send response with status 200, JSON data, and pagination information
    res.status(200).json({ media: data, paginationInfo });
  } catch (error) {
    console.error(`Error fetching media `, error.message);
    res.status(500).json({ message: error.message });
  }
});


export default router;
