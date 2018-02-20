const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchTerm = new Schema({ 
  query: String,
  searchDate: Date,
});