// database connection
const mongoose = require('mongoose');
const STATICVARS = require('./staticvars');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(STATICVARS.MONGODB_URI, 
    { useNewUrlParser: true, useCreateIndex: true },
    err => {
        if (err) {
            console.log('couldn\'t connect to database');
        }
        else console.log('database connected!');
    }
);

module.exports = connection;