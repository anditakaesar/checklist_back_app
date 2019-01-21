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

userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcryptjs.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        });
};

var User = mongoose.model('User', userSchema);

module.exports = exports = User;