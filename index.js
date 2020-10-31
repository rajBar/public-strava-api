const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use('/', require('./strava/router'));

module.exports = app;