// database connection
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var mongodbconn = process.env.MONGODB_URI || 'mongodb://localhost/CheckListApp';

const connection = mongoose.connect(mongodbconn, 
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
        if (err) {
            console.log('couldn\'t connect to database');
        }
        else console.log('database connected!');
    }
);

module.exports = connection;