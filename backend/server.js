import express from 'express';
import mediaRouter from './routes/media/index.js';

const app = express();
const port = process.env.SERVER_PORT || 3001 ;

app.use('/', mediaRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
