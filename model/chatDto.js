let mongoose = require('mongoose');
let Schema = mongoose.Schema;


var chatSchema = new Schema({
    author: String,
    message: String,
},{ versionKey: false });



let Chat = mongoose.model('chats', chatSchema);

module.exports = Chat;