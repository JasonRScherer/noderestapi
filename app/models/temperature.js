// app/models/message.js
//
// Basic Model for message
//
// Requirements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Sets up the schema for temperatures, only captures number and datetime
var TemperatureSchema = new Schema({
    temp_l: Number,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
