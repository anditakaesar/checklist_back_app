const express = require('express');
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

module.exports = app;
