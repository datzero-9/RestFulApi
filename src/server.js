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


//connect database mongose
async function connect() {
    try {
    await mongoose.connect('mongodb://localhost:27017/f8_education_dev');
        console.log('connect thành công')
    } catch (error) {
        console.log('connect không thành công')
        
    }
}
connect()

// config template engine
ViewEngine(app)


app.use('/',router)

app.listen(port, () => {
    console.log(`đang chạy ở cổng http://${hostname}:${port}`)
})