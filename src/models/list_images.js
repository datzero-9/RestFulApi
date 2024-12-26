const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ListImages = new Schema({
    idProduct: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('ListImages',ListImages);