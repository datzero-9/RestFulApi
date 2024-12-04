
const Account = require('../../models/accounts')
const session = require('express-session');
const register = (req, res) => {
  let userIp = req.ip || req.connection.remoteAddress;

  // Kiểm tra nếu server chạy đằng sau proxy
  if (req.headers['x-forwarded-for']) {
    userIp = req.headers['x-forwarded-for'].split(',')[0];
  }
  console.log('IP Người truy cập: ' + userIp);
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
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.json({ message: 'Tài khoản đã tồn tại', status: false });
    } else {
      const newAccount = new Account({
        name,
        username,
        password,
      });
      await newAccount.save();
      res.status(200).json({ message: 'tạo tài khoản thành công', status: true })
      // res.render('login', { layout: false, title: true })
    }
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
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('Request : POST : Đăng nhập')
    console.log('--------------------');
    const username = req.body.username;
    const password = req.body.password;
    // Tìm tài khoản đã tồn tại
    const existingAccount = await Account.findOne({ username: username, password: password });
    if (existingAccount) {
      res.status(200).json(existingAccount)
    } else {
      res.json(false)
    }

  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tài khoản' });
  }
}
const logout = (req, res) => {
  const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
  console.log(`Client IP: ${clientIp}`);
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

const infoUser = async (req, res) => {
  try {
    const clientIp = (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim();
    console.log(`Client IP: ${clientIp}`);
    console.log('POST : /api/infoUser')
    console.log('--------------------');
    const user = await Account.findOne({ _id: req.body.id });
    res.status(200).json(user)
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tài khoản' });
  }
}

const changeInfo = async (req, res) => {
  try {
    console.log(req.body)
    console.log('POST : /api/changeInfo')
    console.log('--------------------');
    const user = await Account.findOne({ _id: req.body.id });
    user.name = req.body.name;
    user.password = req.body.password;
    await user.save()
    res.status(200).json('Thay đổi thành công Tài khoản')
    // res.status(200).json('ok')
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tài khoản' });
  }
}


const getListUser = async (req, res) => {
  try {
    console.log('GET : /api/listUser')
    console.log('--------------------');

    const user = await Account.find().sort({ createdAt: -1 });
    res.status(200).json(user)
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi tạo tài khoản' });
  }
}
module.exports = { register, login, createRegister, dangnhap, logout, infoUser, changeInfo, getListUser };
