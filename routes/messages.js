var express = require('express');
var Message = require('../app/models/message');

//Routes for API
//
var router = express.Router();  //Starts instance of express router

//Middleware for all requests
//Needs updating to do logging when API is used it will output to console
router.use(function(req, res, next){
    //Logging here
    console.log(req.method, req.url);
    next();
});

//Get
router.get('/', function(req, res){
    res.render('msgIndex');
});

//Routes that end in message

router.route('/messages')

    //Creates a message
    .post(function(req, res){
        var message = new Message();
        message.message_s = req.body.message_s; //Sets the message from the request
        message.date_s = req.body.date_s; //Sets the date from when posted
        message.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'New Message Created'});
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


module.exports = router;

