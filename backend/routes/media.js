import { Router } from 'express';
import getData from '../services/media.js';

const router = Router();

// TODO:
// security: sanitization & validation of query params
router.get('/', async function(req, res) {
  try {
    console.log("query params",req.query.years)
    const years = req.query.years ? req.query.years.split(',') : [];
    const genres = req.query.genres ? req.query.genres.split(',') : [];
    const searchText = req.query.searchText || '';
    const type = req.query.type || '';
    const limit = req.query.limit || 10; // Default limit to 10 if not provided
    const offset = req.query.offset || 0; // Default offset to 0 if not provided

    const data = await getData(years, genres, searchText, type, limit, offset);
    // console.log("data", data)
    res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
    // excluding unused methods
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Send the response with status 200 and JSON data
    res.status(200).json(data);
  } catch(error) {
    console.error(`Error fetching media `, error.message);
    res.status(500).json({ message: error.message });
  }
});


export default router;
