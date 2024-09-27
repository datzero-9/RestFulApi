require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const ViewEngine = require('./config/viewEngine')
var bodyParser = require('body-parser');
const router = require('./routers/web')
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;
const mongoose = require('mongoose');

const register = require('./controllers/accounts/register')




//connect database mongose
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/dacs4');
        console.log('connect thành công')
    } catch (error) {
        console.log('connect không thành công')

    }
}
connect()

// config template engine
ViewEngine(app)


const checkAdmin = (req, res, next) => {
    if (true) {
        next()
    } else {

    }
}
app.get('/', register)
app.use('/admin', router)

app.listen(port, () => {
    console.log(`đang chạy ở cổng http://${hostname}:${port}`)
})