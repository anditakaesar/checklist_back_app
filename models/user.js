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
    created_on: {
        type: Date,
        default: Date.now
    }
});

// schema methods
userSchema.methods.generateHash = function (password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
    return bcryptjs.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = exports = User;