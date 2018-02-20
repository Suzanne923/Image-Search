const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bing = require('node-bing-api')({ accKey: 'd1abd3c3f4454352909ccd226bfa59ae'});
const app = express();
const searchTerm = require('./models/searchTerm');
mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/views'));

// Routes
app.get('/api/imagesearch/:search*', (req, res, next) => {
  const query = req.params.search;
  const offset = req.query.offset;
  const data = new searchTerm({
    query: query,
    searchDate: new Date()
  });
  data.save(err => {
    if (err) {
      res.send('Error saving to database');
    }
    res.json(data);
  });
  
  res.json({
    search_value: query,
    offset: offset
  });
});

app.listen(process.env.PORT, () => {
  console.log('Node.js listening ...');
});