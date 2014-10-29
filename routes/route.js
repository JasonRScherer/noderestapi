var express = require('express');
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
    res.render('index');
});






module.exports = router;
