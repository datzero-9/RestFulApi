
const Account = require('../../models/accounts')
const session = require('express-session');
const register = (req, res) => {
  console.log('Request: GET')
  res.render('register', { layout: false })
}

const createRegister = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    // Tìm tài khoản đã tồn tại
    console.log('Request: POST : Tạo tài khoản')
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(409).json({ message: 'Tài khoản đã tồn tại' });
    }
    // Tạo tài khoản mới
    const newAccount = new Account({
      name,
      username,
      password,
    });
    await newAccount.save();

    res.render('login', { layout: false, title: true })
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tài khoản' });
  }
};


const login = (req, res) => {
  console.log('Request : GET')
  res.render('login', { layout: false })
}

const dangnhap = async (req, res) => {
  try {
    console.log('Request : POST : Đăng nhập')
    const username = req.body.username;
    const password = req.body.password;
    // Tìm tài khoản đã tồn tại
    const existingAccount = await Account.findOne({ username: username, password: password });

    if (existingAccount) {
      req.sesxuất')
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    }
  });

}
module.exports = { register, login, createRegister, dangnhap,logout };
