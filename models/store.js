// a model of store
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
    storename: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    storedesc: {
        type: String,
        required: true,
        trim: true
    },
    storeaddress: {
        type: String,
        trim: true
    },
    storephone: {
        type: [String],
        trim: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

var Store = mongoose.model('Store', storeSchema);

module.exports = Store;