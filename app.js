const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello Yanuar');
});

app.get('/test', (req, res) => {
  res.send('test saja 1');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
