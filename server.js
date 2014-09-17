// server.js
//
// Base Setup
//
//

//  Call the packages we need
//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Message = require('./app/models/message');
//Configure the app to use the body parser
//Lets you easily get data from POST
//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;    //Sets the port being used
//Database configure
//
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/messages');

//Routes for API
//
var router = express.Router();  //Starts instance of express router

//Middleware for all requests

router.use(function(req, res, next){
    //Logging here
    console.log('Hey something is going on');
    next();
});

//Get

router.get('/', function(req, res){
    res.json({message_s: "Testing of the route"});
});

//Routes that end in message

router.route('/messages')

    //Creates a message
    .post(function(req, res){
        var message = new Message();
        message.messeage_s = req.body.name; //Sets the message from the request
        message.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'New Message Created.'});
        });
    })
    //Gets all the messages
    .get(function(req, res){
        Message.find(function(err, messages){
            if(err)
                res.send(err);

            res.json(messages);
        });
    });

//Routes that end in /messages/:message_id
router.route('/messages/:message_id')

    //gets the message by id
    .get(function(req, res){
        Message.findById(req.params.message_id, function(err, message){
            if (err)
                res.send(err);
            res.json(message);
        });

    })
    //update the Message with given ID
    .put(function(req, res){
        Message.findById(req.params.message_id, function(err, message){
            if (err)
                res.send(err);
            message.message_s = req.body.message_s; //updates the message info
            //Save the message
            message.save(function(err){
                if (err)
                    res.send(err);
                res.json({ message:'Message Updated!'});
            });
        });
    })
    .delete(function(req, res){
        Message.remove({
            _id: req.params.message_id
        }, function(err, message){
            if(err)
                res.send(err);

            res.json({message: 'Message Deleted.'});

        });
    });

//Register our routes
//All routes will use prefix api
app.use('/api', router);

//Starts the server
//
app.listen(port);
console.log('Server started at port ' + port);
