import { Router } from 'express';
import { check } from 'express-validator';
import getData from '../services/media.js';

const router = Router();

// TODO
// break out into separate functions: sanitization/validation, formatting, request
router.get('/', check().trim().escape(), async function(req, res) {
  try {
    const years = req.query.year ? req.query.year.split(',') : [];
    const genres = req.query.genre ? req.query.genre.split(',') : [];
    const searchText = req.query.searchText || '';
    const type = req.query.type || '';
    const limit = req.query.limit || 10; // Default limit to 10 if not provided
    const offset = req.query.offset || 0; // Default offset to 0 if not provided

    const data = await getData(years, genres, searchText, type, limit, offset);
    console.log("data", data)
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
