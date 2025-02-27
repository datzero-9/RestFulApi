const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Order = new Schema({
  idUser: { type: String },
  email: { type: String, default: 'datht.22ite@vku.udn.vn' },
  address: { type: String },
  total: { type: Number },
  phone: { type: Number },
  note: { type: String },
  payment: { type: String },
  state: { type: Boolean },
  sendMail: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', Order);