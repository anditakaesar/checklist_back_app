// a model of list
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    description: String,
    date: { type: Date, default: Date.now },
    checked: { type: Boolean, default: false }
});

var CheckList = mongoose.model('CheckList', listSchema);

module.exports = exports = CheckList;