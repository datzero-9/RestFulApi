const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    text: { type: String },
    name: { type: String },
    image: { type: String },
    idUser: { type: String },
    idProduct: { type: String },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Comment',Comment);