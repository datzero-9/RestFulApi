const path = require('path');
const express = require('express')
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const session = require('express-session');

const ViewEngine = (app) => {

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //template handlebars
    const hbs = exphbs.create({
        helpers: {
            format: (number) => {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            },
            sum: (a, b) => {
                return a + b;
            }
        }
    });

    // Cấu hình Handlebars engine
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    // app.engine('handlebars', handlebars.engine());
    // app.set('view engine','handlebars')
    app.set('views', path.join('./src', 'views'));

    app.use(express.static(path.join('./src', 'public')));

    app.use(methodOverride('_method'))


    app.use(session({
        secret: 'datxyz',
        resave: false, // Không lưu lại session nếu không có gì thay đổi
        saveUninitialized: false,
    }))

}
module.exports = ViewEngine;