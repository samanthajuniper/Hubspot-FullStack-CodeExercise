import express from 'express';
import mediaRouter from './routes/media.js';

const app = express();
const port = process.env.SERVER_PORT || 3001 ;

app.get('/', (_, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/media', mediaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
