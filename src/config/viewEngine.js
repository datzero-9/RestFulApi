const path = require('path');
const express = require('express')
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const ViewEngine = (app) => {
    // console.log(__dirname)

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.set('views', path.join('./src', 'views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join('./src', 'public')));
    app.use(methodOverride('_method'))
    // Sử dụng express-flash và express-session
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }));
    app.use(flash());
}
module.exports = ViewEngine;