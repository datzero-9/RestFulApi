require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const ViewEngine = require('./config/viewEngine')
const router = require('./routers/web')
const port = process.env.PORT || 80;
const hostname = process.env.HOST_NAME;
const mongodb = process.env.MONGODB_URL;
const mongoose = require('mongoose');
const Account = require('./models/accounts')
var cors = require('cors')
const { register, login, createRegister, dangnhap,logout } = require('./controllers/accounts/register')

//connect database mongose
async function connect() {
    try {
        await mongoose.connect(mongodb);
        console.log('connect thành công')
    } catch (error) {
        console.log('connect không thành công')
    }
}
connect()

// config template engine
ViewEngine(app)
app.use(cors())

app.get('/', register)
app.post('/', createRegister)
app.get('/login', login)
app.post('/login', dangnhap)
app.get('/logout', logout);

const checkLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
const checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.send('Bạn không đủ thẩm quyền');
    }
}

app.use('/admin' , router)


app.listen(port, () => {
    console.log(mongodb)
    console.log(`đang chạy ở cổng http://${hostname}:${port}`)
})