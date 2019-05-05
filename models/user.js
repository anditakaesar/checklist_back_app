// a model of list
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcryptjs = require('bcryptjs');

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', function (next) {
    var user = this;
    bcryptjs.hash(user.password, 10, (err, hash) => {
        if(err) {
            console.log(err);
        }
        else {
            user.password = hash;
        }
        next();
    });
});

var User = mongoose.model('User', userSchema);

module.exports = exports = User;