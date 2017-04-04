var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema ({
    fullname: String,
    phone: Number,
    email: String,
    username: String,
    url: String,
    password: String,
    address: String,
    gender: String,
    interests: [String]
});

var User = mongoose.model ('users', UserSchema);

module.exports = User;

module.exports.all = function () {
    
}