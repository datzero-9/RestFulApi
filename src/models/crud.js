const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-updater')
mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique:true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },

  });
  
module.exports = mongoose.model('Course',Course);
