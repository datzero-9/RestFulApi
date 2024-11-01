const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({
    idUser: { type: String },
    address: { type: String },
    phone: { type: Number },
    note: { type: String },

    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

  });
  
module.exports = mongoose.model('Order',Order);