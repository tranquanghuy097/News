var express = require('express')
var index = express.Router();
var news = require('../model/newsModel')

index.use(express.static('public'));

index.get('/', (req, res, next) => {
    var limit = 4;
    var offset = 0;
    var limit2 = 10;

    Promise.all([news.loadbyPage(limit, offset),
        news.loadbyBottom(limit2, offset)])
    .then(([rows1, rows2]) => {
        res.render('home', {
            trending: rows1,
            newest: rows2,
        })
    }).catch(next)

})

module.exports = index;