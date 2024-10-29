const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Cart = new Schema({
    idUser: { type: String },
    idProduct: { type: String },
    name: { type: String },
    image: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    salePrice: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

});

module.exports = mongoose.model('Cart', Cart);