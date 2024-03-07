import { Router } from 'express';
import getData from '../services/media.js';

const router = Router();

router.get('/', async function(req, res) {
  try {
    const years = req.query.year ? req.query.year.split(',') : [];
    const genres = req.query.genre ? req.query.genre.split(',') : [];
    const searchText = req.query.searchText || '';
    const type = req.query.type || '';
    const limit = req.query.limit || 10; // Default limit to 10 if not provided
    const offset = req.query.offset || 0; // Default offset to 0 if not provided

    const data = await getData(years, genres, searchText, type, limit, offset);
    res.status(200).json(data);
  } catch(error) {
    console.error(`Error fetching media `, error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
