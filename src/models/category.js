const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Category = new Schema({
    name: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Category',Category);