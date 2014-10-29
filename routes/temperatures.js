var express = require('express');
var Temperature = require('../app/models/temperature');
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
    res.render('tempIndex');
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

router.route('/temperatures')

    //Creates a new temperature data point
    .post(function(req, res){
        var temp = new Temperature();
        temp.temp_l = req.body.temp_l; //Sets the message from the request
        temp.date = new Date;
        temp.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'New Message Created'});
        });
    })
    //Gets all the messages
    .get(function(req, res){
        Temperature.find(function(err, temps){
            if(err)
                res.send(err);
            res.json(temps);
        });
    });






module.exports = router;

