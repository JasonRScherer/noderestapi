// app/models/message.js
//
// Basic Model for message
//
// Requirements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Basic Schema for messages to be stored in the database.
var MessageSchema = new Schema({
    message_s: String,
    date_s: String
});

module.exports = mongoose.model('Message', MessageSchema);
