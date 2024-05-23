const express = require('express');

const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello Yanuar');
});

app.get('/ashiap', (req, res) => {
  res.send('Ashiap');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});