var express = require('express');
var exphbs  = require('express-handlebars');
var morgan = require('morgan');
var routes = require('./routes/index');

var app = express();

app.engine('hbs', exphbs(
    {extname:'hbs',
    layoutsDir: __dirname + '/views/_layout/',
    defaultLayout: 'main'}));

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use('/', routes);



app.listen(8080, function(){
    console.log('service http://localhost:8080/ running');
})