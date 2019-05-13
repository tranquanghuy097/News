var express = require('express');
var writer = express.Router();
var bodyParser = require("body-parser");
var multer  = require('multer');
var path = require('path');
var model = require('../model/model');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() +  path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage });

var item = {
    category:[
        'Crime',
        'Military',
        'U.N',
        'Conflicts',
        'Executive',
        'Senate',
        'Movies',
        'TV News',
        'Markets',
        'Politics',
        'Food + Drinks',
        'Cars + Trucks',
        'Archaeology',
        'Planet Earth',
        'Security',
        'Innovation',
        'Healthy Living',
        'Shows',
        'Personalities',
    ]
};


writer.use(bodyParser.urlencoded({ extended: false }));
writer.use(bodyParser.json());
writer.use(express.static('public'));


writer.get('/write', function(req, res){
    res.render('write', item)
})

writer.post('/add', upload.single('avatar'), function(req, res){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = year + "/" + month + "/" + day;

    req.body['writer'] = 'huy';
    req.body['date'] = newdate;
    req.body['image'] = req.file.path;
    
    model.add(req.body)
        .then(id => {
            console.log(id);
            res.render('write', item);
        }).catch(err => {
            console.log(err);
            res.end('Error Occured');
        })
})

module.exports = writer;