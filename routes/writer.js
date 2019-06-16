var express = require('express');
var writer = express.Router();
var bodyParser = require("body-parser");
var multer  = require('multer');
var path = require('path');
var model = require('../model/model');
var account = require('../model/writersModel');
var session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var user;

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
writer.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
}));

var upload = multer({ storage: storage });


writer.get('/write', function(req, res){
    if(!req.session.loggedin)
        res.redirect('/writer/signin')
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

writer.get('/signin', (req, res) => {
    res.render('writer/signin');
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
        req.body['image'] = 'images\\' + req.file.filename;
    
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
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var info = {
        name: req.body.name,
        penname: req.body.penname,
        password: hash,
        email: req.body.email,
        birthday: req.body.birthday,
    }
    account.add(info)
        .then(id => {
            console.log(id);
            res.redirect('/writer/signin');
        }).catch(err => {
            console.log(err);
            res.end('Error Occured');
        }).catch(next)
})

writer.get('/', function(req,res){
    if(!req.session.loggedin)
        res.redirect('/writer/signin')
    else
         res.render('writer/account', {
            user: user
         })
})

writer.post('/login', function(req, res, next){
    account.getUser(req.body.name).then(rows => {
        if(rows.length > 0)
        {
            if(bcrypt.compareSync(req.body.password, rows[0].password))
            {
                user = rows[0];
                req.session.loggedin = true;
			    req.session.username = req.body.name;
                res.render('writer/account', {
                    user: user
                })
            }
            else{
                res.render('writer/signin', {
                    error: true,
                })
            }
        }
        else{
            res.render('writer/signin', {
                error: true,
            })
        }
    }).catch(next)
})

writer.post('/logout', function(req, res) {
    req.session.loggedin = false;
    res.render('writer/signin')
})



module.exports = writer;