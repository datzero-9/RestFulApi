const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderDetail = new Schema({
    idOrder: { type: String },
    idProduct: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

  });
  
module.exports = mongoose.model('OrderDetail',OrderDetail);