const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 3001 ;
const mediaRouter = require('./routes/media');

app.get('/', (_, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/media', mediaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
