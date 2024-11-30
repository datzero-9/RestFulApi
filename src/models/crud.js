const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const Product = new Schema({
  productId: { type: Number, default: 1 },
  name: { type: String, index: 'text' },
  category: { type: String, default:'Điện thoại' },
  warehouse: { type: Number, default:100 },
  price: { type: Number },
  realPrice: { type: Number },
  discount: { type: Number, default:0 },
  description: { type: String },
  image: { type: String, default:'https://res.cloudinary.com/dfv0n3vas/image/upload/v1729475449/uiktrpifwmpgvk3wm3bm.png' },
  slug: { type: String, slug: "name", unique: true },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Product', Product);
