
const Product = require('../../models/crud')

const register = async (req, res) => {
res.render('register',{layout:false})
}

module.exports = register;