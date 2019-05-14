var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var news = require('./routes/news');
var writer = require('./routes/writer');
var editor = require('./routes/editor')
var path = require('path')

var app = express();

app.engine('hbs', exphbs(
    {extname:'hbs',
    layoutsDir: __dirname + '/views/_layout/',
    defaultLayout: 'main'}));

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/news', news);
app.use('/writer', writer);
app.use('/editor', editor);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.listen(8080, function(){
    console.log('service http://localhost:8080/ running');
})