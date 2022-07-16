const express = require('express');
const router = require('./routes');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`));