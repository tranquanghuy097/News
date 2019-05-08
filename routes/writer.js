var express = require('express');
var writer = express.Router();
var bodyParser = require("body-parser");
var multer  = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +  path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage })


writer.use(bodyParser.urlencoded({ extended: false }));
writer.use(bodyParser.json());


writer.get('/write', function(req, res){
    res.render('write')
})

writer.post('/add', upload.single('avatar'), function(req, res){
    console.log(req.file);
    console.log(req.body);
    console.log(req.file.path);
    console.log(req.category);
    res.end();
})

module.exports = writer;