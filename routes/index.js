var express = require('express')
var index = express.Router();
var news = require('../model/newsModel')

index.use(express.static('public'));

index.get('/', (req, res) => {
    var limit = 4;
    var offset = 0;

    news.loadbyPage(limit, offset).then(rows =>{
        res.render('home', {
            trending: rows,
            active: rows.id = 1? true : false,
        })
    })
})

module.exports = index;