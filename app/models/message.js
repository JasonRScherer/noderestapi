// app/models/message.js
//
// Basic Model for message
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    message_s: String,
    date_s: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Message', MessageSchema);
