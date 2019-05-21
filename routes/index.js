var express = require('express')
var index = express.Router();

index.use(express.static('public'));

index.get('/', (req, res) => {
    res.render('home')
})

module.exports = index;