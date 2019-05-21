var express = require('express');
var writer = express.Router();
var bodyParser = require("body-parser");
var multer  = require('multer');
var path = require('path');
var model = require('../model/model');
var account = require('../model/writersModel');
var user;
var login = false;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +  path.extname(file.originalname))
    }
});

writer.use(bodyParser.urlencoded({ extended: false }));
writer.use(bodyParser.json());
writer.use(express.static('public'));

var upload = multer({ storage: storage });


writer.get('/write', function(req, res){
    if(login == false)
        res.render('writer/signin')
    else
    {
        var subcategory = model.loadsubCat();
        subcategory.then(rows => {
            res.render('writer/write', {
                subcategory: rows,
            })
        })
    }
})

writer.post('/add', upload.single('avatar'), function(req, res, next){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = day + "/" + month + "/" + year;

    req.body['writer'] = user.penname;
    req.body['date'] = newdate;
    if(req.file)
        req.body['image'] = req.file.path;
    
    model.add(req.body)
        .then(id => {
            console.log(id);
            res.redirect('/writer/write');
        }).catch(next)
})

writer.get('/signup', function(req, res){
    res.render('writer/signup')
})

writer.post('/addwriter', function(req, res, next){
    account.add(req.body)
        .then(id => {
            console.log(id);
            res.redirect('/writer/signup');
        }).catch(err => {
            console.log(err);
            res.end('Error Occured');
        }).catch(next)
})

writer.get('/', function(req,res){
    if(login == false)
        res.render('writer/signin')
    else
         res.render('writer/account', {
            user: user
         })
})

writer.post('/login', function(req, res, next){
    account.getUser(req.body.name, req.body.password).then(rows => {
        if(rows.length > 0)
        {
            user = rows[0];
            login = true;
            res.render('writer/account', {
                user: user
            })
        }
        else{
            res.render('writer/signin', {
                error: true,
            })
        }
    }).catch(next)
})

writer.post('/logout', function(req, res) {
    login = false;
    res.render('writer/signin')
})



module.exports = writer;