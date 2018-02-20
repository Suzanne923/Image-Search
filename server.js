const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const GoogleImageSearch = require('free-google-image-search');
const app = express();
const searchTerm = require('./models/searchTerm');
mongoose.connect(process.env.MONGOLAB_URI);

// AIzaSyBil5Y0mMTsPipexN_mCVupYcrzXg04Fi8 
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/views'));

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
  get('https://api.qwant.com/api/search/images?count=10&offset=1&q=cars', (res) => {
    
});

app.listen(process.env.PORT, () => {
  console.log('Node.js listening ...');
});