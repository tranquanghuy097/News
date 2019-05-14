var express = require('express');
var router = express.Router();
var model = require('../model/model');

router.use(express.static('public'))

router.get('/', function(req, res){
    res.render('home');
})

router.get('/:id', function(req, res){
    var id = req.params.id;

    model.byID(id).then(rows => {
        if(rows.length > 0)
        {
            res.render('news', {
                error: false,
                news: rows[0]
            })
        }
        else{
            res.render('news', {
                error: true,
            })
        }
    }).catch(err => {
        console.log(err);
        res.end('Error occured');
    })
})

module.exports = router;