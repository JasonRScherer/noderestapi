var express = require('express');
var Temperature = require('../app/models/temperature');
var app = require('../server');
var http = require('http').createServer(express);

//Routes for API
//
var router = express.Router();  //Starts instance of express router
var temp;
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
//Routes that end in /temperatures/:temp_id
router.route('/temperatures/:temp_id')

//gets the message by id
.get(function(req, res){
    Temperature.findById(req.params.temp_id, function(err, temperature){
        if (err)
            res.send(err);
        res.json(temperature);
    });

})
//update the Message with given ID
.put(function(req, res){
    Temperature.findById(req.params.temp_id, function(err, temperature){
        if (err)
            res.send(err);
        temperature.temp_l = req.body.temp_l; //updates the message info
        //Save the message
        temperature.save(function(err){
            if (err)
                res.send(err);
            res.json({ message:'Message Updated!'});
        });
    });
})
.delete(function(req, res){
    Temperature.remove({
        _id: req.params.temp_id
    }, function(err, temperature){
        if(err)
            res.send(err);

        res.json({message: 'Message Deleted.'});

    });
});

router.route('/temperatures')

//Creates a new temperature data point
.post(function(req, res){
    temp = new Temperature();

    temp.temp_l = req.body.temp_l; //Sets the message from the request
    temp.date = new Date;

    temp.save(function(err){
        if(err)
            res.send(err);

        res.json({message: 'New Message Created'});
    });
    req.io.broadcast('temp', req.body.temp_l);
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

