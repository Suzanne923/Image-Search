const express = require('express');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const searchTerm = require('./models/searchTerm');
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());
app.use(bodyParser.json());

function get(url, callback) {
  https.get(url, (res) => {
  
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      callback(res.statusCode, data);
    });
  });
};

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
  
  get('https://api.qwant.com/api/search/images?count=10&offset=1&q=cats', (statusCode, data) => {
    console.log(statusCode, data);
    res.end();
  });
  
});

app.listen(process.env.PORT, () => {
  console.log('Node.js listening ...');
});