
const Account = require('../../models/accounts')
const session = require('express-session');
const register = (req, res) => {
  let userIp = req.ip || req.connection.remoteAddress;

    // Kiểm tra nếu server chạy đằng sau proxy
    if (req.headers['x-forwarded-for']) {
        userIp = req.headers['x-forwarded-for'].split(',')[0];
    }
  console.log('IP Người truy cập: '+ userIp );
  console.log('Request : GET : Đăng kÝ')
  console.log('--------------------');
  res.render('register', { layout: false })
}

const createRegister = async (req, res) => {
  try {
    console.log('Request : POST : Tạo tài khoản');
    console.log('--------------------');
    const { name, username, password } = req.body;
    // Tìm tài khoản đã tồn tại
    console.log('Request: POST : Tạo tài khoản')
    console.log('--------------------');
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
  console.log('Request : GET : Đăng nhập')
  console.log('--------------------');
  res.render('login', { layout: false })
}

const dangnhap = async (req, res) => {
  try {
    console.log('Request : POST : Đăng nhập')
    console.log('--------------------');
    const username = req.body.username;
    const password = req.body.password;
    // Tìm tài khoản đã tồn tại
    const existingAccount = await Account.findOne({ username: username, password: password });
    if (existingAccount) {
      req.session.user = {
        id: existingAccount._id,
        name: existingAccount.name,
        role: existingAccount.role,
      };
      console.log(`Người dùng: ${existingAccount.name} đã Đăng nhập`)
      console.log('--------------------');
      res.redirect(`/admin?username=${existingAccount.name}`);
    } else {
      res.render('login', { layout: false, mess: true })
    }
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tài khoản' });
  }
}
const logout =  (req, res) => {
  console.log('Request : POST : Đăng xuất')
  console.log('--------------------');
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
