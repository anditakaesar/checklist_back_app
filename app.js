const express = require('express');

// passport
require('./utils/passport');

const app = express();

// mongoose
require('./utils/dbconn');

// bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// compression
var compression = require('compression');
app.use(compression());

// helmet
var helmet = require('helmet');
app.use(helmet());

// static files
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', 
    (req, res) => {
        return res.status(200).json({
            success: true,
            msg: 'Default Route, check api documentation!'
        });
    }
);

// routes '/list'
app.use('/list', require('./routes/list'));

// test require auth router
// app.use('/list', require('passport').authenticate('jwt', {session: false}), require('./routes/list'));
app.use('/login', require('./routes/login'));

module.exports = app;
