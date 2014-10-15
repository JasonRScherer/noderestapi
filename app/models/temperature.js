// app/models/message.js
//
// Basic Model for message
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemperatureSchema = new Schema({
    temp_l: Number,
    date: {type:Date, default: new Date()}
});

module.exports = mongoose.model('Temperature', TemperatureSchema);
