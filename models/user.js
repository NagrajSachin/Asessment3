const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', user);

