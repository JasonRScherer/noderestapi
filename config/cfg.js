var config = {};


config.mongoDB = {};
config.web = {};

config.mongoDB.location="mongodb://localhost:27017/api";
config.web.port = process.env.PORT || 3000;



module.exports = config;
