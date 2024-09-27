const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const Product = new Schema({
    name: { type: String },
    category: { type: String },
    price: { type: Number },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique:true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

  });
  
module.exports = mongoose.model('Product',Product);
