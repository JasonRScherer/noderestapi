var config = {};


config.mongoDB = {};
config.solr = {};
config.web = {};

config.mongoDB.location="mongodb://localhost:27017/api";
config.web.port = process.env.PORT || 3000;




module.exports = config;
