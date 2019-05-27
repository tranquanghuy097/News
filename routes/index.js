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

index.get('/:cat', function(req, res, next) {
    var cat = req.params.cat;
    var page = req.query.page || 1;
    var limit = 10;

    if(page < 1)
        page = 1;
    var offset = (page - 1) * limit;

    Promise.all([news.loadbyCat(cat, limit, offset),
                news.countCat(cat)])
        .then(([rows, count_rows]) => {
            var total = count_rows[0].total;
            var nPage = Math.floor(total / limit);
            if(total % limit > 0)
                nPage++;
            var pages = [];
            for(i = 1; i <= nPage; i++){
                var obj = {value: i, active: i === +page};
                pages.push(obj);
            }
            var prevpage = {
                pos: page - 1,
                deactive: page - 1 < 1};
            var nextpage = {
                    pos: page + 1,
                    deactive: page + 1 > nPage};
            res.render('category', {
                category: cat,
                news: rows,
                pages,
                prevpage,
                nextpage
            })
        })
        .catch(next)
})

module.exports = index;