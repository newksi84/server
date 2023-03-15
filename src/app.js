const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use('/', routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
