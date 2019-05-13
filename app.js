var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var bodyParser = require("body-parser");
var routes = require('./routes/index');
var writer = require('./routes/writer')
var path = require('path')

var app = express();

app.engine('hbs', exphbs(
    {extname:'hbs',
    layoutsDir: __dirname + '/views/_layout/',
    defaultLayout: 'main'}));

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/news', routes);
app.use('/writer', writer);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.listen(8080, function(){
    console.log('service http://localhost:8080/ running');
})