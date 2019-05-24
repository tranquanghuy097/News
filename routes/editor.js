var express = require('express');
var editor = express.Router();
var bodyParser = require("body-parser");
var multer  = require('multer');
var path = require('path');
var session = require('express-session');
var model = require('../model/model');
var account = require('../model/editorModel');
var session = require('express-session');
var user;

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +  path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

editor.use(bodyParser.urlencoded({ extended: false }));
editor.use(bodyParser.json());
editor.use(express.static('public'));
editor.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
}));

editor.get('/', function(req,res){
    if(!req.session.loggedin)
        res.render('writer/signin')
    else
         res.render('editor/account', {
            user: user
         })
})


editor.get('/edit/:id', function(req, res){
    if(!req.session.loggedin)
         res.render('writer/signin')
    else
    {
    var subcategory = model.loadsubCat();
    var id = req.params.id;
    model.byID(id).then(rows => {
        if(rows.length > 0)
        {
            subcategory.then(rows2 => {
                res.render('editor/edit', {
                    subcategory: rows2,
                    news: rows[0],
                    error: false,
                })
            })
        }
        else{
            res.render('news', {
                error: true,
            })
        }
    }).catch(next)
    }
});

editor.post('/edit/update', upload.single('avatar'), function(req, res){
    if(req.file)
        req.body.image = req.file.path;
    
    model.update(req.body)
        .then(id => {
            console.log(id);
            res.redirect('/editor');
        }).catch(next)
});

editor.post('/edit/delete', upload.single('avatar'), function(req, res){
     model.delete(req.body.id)
         .then(id => {
             console.log(id);
             res.redirect('/editor');
         }).catch(next)
})

editor.get('/signup', function(req, res){
    res.render('editor/signup')
})


editor.post('/addeditor', function(req, res){
    account.add(req.body)
        .then(id => {
            console.log(id);
            res.redirect('/writer/signup');
        }).catch(next)
})

editor.get('/signin', function(req,res){
    res.render('editor/signin')
})

editor.post('/login', function(req, res, next){
    account.getUser(req.body.name, req.body.password).then(rows => {
        if(rows.length > 0)
        {
            user = rows[0];
            req.session.loggedin = true;
			req.session.username = req.body.name;
            res.render('editor/account', {
                user: user
            })
        }
        else{
            res.render('editor/signin', {
                error: true,
            })
        }
    }).catch(next)
})

editor.post('/logout', function(req, res) {
    req.session.loggedin = false;
    res.render('writer/signin')
})


module.exports = editor;