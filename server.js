// server.js
//
// Base Setup
//
//

//  Call the packages we need
//
var express = require('express.io');
var bodyParser = require('body-parser');
var Temperature = require('./app/models/temperature');
var pub = __dirname;
var path = require('path');
var app = express().http().io();
var routes = require('./routes/route');
var temperatures = require('./routes/temperatures');
var messages = require('./routes/messages');
var port = process.env.PORT || 3000;    //Sets the port being used
//Database configure
//
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/api');
//Configure the app to use the body parser
//Lets you easily get data from POST
//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//Sets the Directory of the views
app.set('views', path.join(__dirname, 'views'));

//Sets the default template engine to Jade
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res,next){
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/msgs', messages);

app.use('/temps', temperatures);
//Starts the server
//
var server = app.listen(port);
console.log('Server started at port ' + port);
