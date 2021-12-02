require('dotenv').config();

const express = require('express');
const router = require('./app/router');

const app = express();

const port = process.env.PORT;

app.use('/v1', router);

app.listen(port, () => console.log(`API running on port ${port}`))
