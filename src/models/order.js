const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({
    idUser: { type: String },
    address: { type: String },
    total: { type: Number },
    phone: { type: Number },
    note: { type: String },
    payment: { type: String },
    state: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Order',Order);