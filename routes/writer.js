var express = require('express');
var writer = express.Router();
var bodyParser = require("body-parser");
var multer  = require('multer');
var path = require('path');
var model = require('../model/model');
var account = require('../model/writersModel')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +  path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

writer.use(bodyParser.urlencoded({ extended: false }));
writer.use(bodyParser.json());
writer.use(express.static('public'));


writer.get('/write', function(req, res){
    var subcategory = model.loadsubCat();
    subcategory.then(rows => {
        res.render('writer/write', {
            subcategory: rows,
        })
    })
})

writer.post('/add', upload.single('avatar'), function(req, res){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = day + "/" + month + "/" + year;

    req.body['writer'] = 'huy';
    req.body['date'] = newdate;
    req.body['image'] = req.file.path;
    
    model.add(req.body)
        .then(id => {
            console.log(id);
            res.redirect('writer/write');
        }).catch(err => {
            console.log(err);
            res.end('Error Occured');
        })
})

writer.get('/signup', function(req, res){
    res.render('writer/signup')
})

writer.post('/addwriter', function(req, res){
    account.add(req.body)
        .then(id => {
            console.log(id);
            res.redirect('/writer/signup');
        }).catch(err => {
            console.log(err);
            res.end('Error Occured');
        })
})



module.exports = writer;