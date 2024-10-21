const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const Product = new Schema({
  productId: { type: Number, default: 1 },
  name: { type: String, index: 'text' },
  category: { type: String, default:'Điện thoại' },
  price: { type: Number },
  description: { type: String },
  image: { type: String, default:'https://res.cloudinary.com/dfv0n3vas/image/upload/v1729475449/uiktrpifwmpgvk3wm3bm.png' },
  outstanding: { type: Number, default: 0 },
  slug: { type: String, slug: "name", unique: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },

});

Product.pre('save', async function (next) {
  const product = this;
  try {
    const count = await mongoose.models.Product.countDocuments();
    if (count % 5 === 0) {
      product.productId = count / 5 + 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});

Product.post('remove', async function (doc) {
  const Productt = mongoose.model('Product');
  const products = await Productt.find({}, 'productId').sort({ productId: 1 });

  let newProductId = 1;
  for (const product of products) {
    product.productId = newProductId++;
    await product.save();
  }
});

module.exports = mongoose.model('Product', Product);
