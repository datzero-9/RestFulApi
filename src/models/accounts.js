const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    name: { type: String },
    username: { type: String },
    password: { type: String },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
  });
  
module.exports = mongoose.model('Account',Account);