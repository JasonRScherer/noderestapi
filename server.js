// server.js
//
// Base Setup
// This is the basic server that connects to the other routes including messages and temparetures
//

//  Call the packages we need
//
const express = require('express');
const bodyParser = require('body-parser');
const Temperature = require('./app/models/temperature');
const pub = __dirname;
const path = require('path');
const app = express();
const routes = require('./routes/route');
const temperatures = require('./routes/temperatures');
const messages = require('./routes/messages');
const config = require('./config/cfg');
const mongoose = require('mongoose');

//Database configure
//
const db = mongoose.connect(config.mongoDB.location);

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

//Routes being used
app.use('/', routes);
app.use('/msgs', messages);
app.use('/temps', temperatures);

//Starts the server
//
const server = app.listen(config.web.port);
console.log('Server started at port ' + config.web.port  + '\nCtrl+C to close');
