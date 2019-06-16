var express = require('express');
var router = express.Router();
var model = require('../model/model');
var bodyParser = require("body-parser");
var news = require('../model/newsModel');
var id;

router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res){
    res.render('home');
})

router.get('/:id', function(req, res, next){
    id = req.params.id;

    var page = req.query.page || 1;
    var limit = 10;

    if(page < 1)
        page = 1;
    var offset = (page - 1) * limit;

    Promise.all([news.loadComment(id, limit, offset),
                news.countComment(id), model.byID(id)])
        .then(([rows, count_rows, newsContent]) => {
            if(newsContent.length > 0)
            {
            var total = count_rows[0].total;
            var nPage = Math.floor(total / limit);
            if(total % limit > 0)
                nPage++;
            var prevpage = {
                pos: page - 1,
                deactive: page - 1 < 1};
            var lastpage = {
                pos: nPage,
                deactive: page == nPage};
            var pages = [];
            for(i = 1; i <= nPage; i++){
                var obj = {value: i, active: i === +page};
                pages.push(obj);
            }
                res.render('news', {
                    error: false,
                    news: newsContent[0],
                    comment: rows,
                    pages,
                    prevpage,
                    lastpage,
                })
            
            }
            else{
                res.render('news', {
                    error: true,
                })
            }
            
        })
        .catch(next)
})

router.post('/add', function(req, res, next){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = day + "/" + month + "/" + year;
    req.body['date'] = newdate;
    req.body['newsid'] = id;
    
    news.addComment(req.body)
        .then(i => {
            res.redirect('/news/' + id);
        }).catch(next)
})


module.exports = router;