const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bing = require('node-bing-api')({ accKey: ''});
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/views'));

app.listen(process.env.PORT, () => {
  console.log('Node.js listening ...');
});

// Routes
