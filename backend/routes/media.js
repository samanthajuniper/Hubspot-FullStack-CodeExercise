import { Router } from 'express';
import  getData  from '../services/media.js';

const router = Router();

router.get('/', function(req, res) {
  try {
    const data = getData();
    res.status(200).json(data);
  } catch(error) {
    console.error(`Error fetching media `, error.message);
    res.status(500).json({message: error.message});
  }
});

export default router;
