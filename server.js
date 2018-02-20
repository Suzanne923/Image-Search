const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const searchTerm = require('./models/searchTerm');
mongoose.connect(process.env.MONGOLAB_URI);

// AIzaSyBil5Y0mMTsPipexN_mCVupYcrzXg04Fi8 
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/views'));

function getSearchResult

// Routes
app.get('/api/latest/imagesearch', (req, res, next) => {
  searchTerm.find({}, (err, data) => {
    res.json(data);
  });
});

app.get('/api/imagesearch/:search*', (req, res, next) => {
  const searchValue = req.params.search;
  const offset = req.query.offset;
  const data = new searchTerm({
    searchValue: searchValue,
    searchDate: new Date()
  });
  data.save(err => {
    if (err) {
      res.send('Error saving to database');
    }
  });
  
  http.get('http://api.qwant.com/api/search/images?count=10&offset=1&q=cars', (response) => {
    console.log(response);
  });
});

app.listen(process.env.PORT, () => {
  console.log('Node.js listening ...');
});