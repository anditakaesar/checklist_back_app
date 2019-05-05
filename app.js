const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var compression = require('compression');
var helmet = require('helmet');
var path = require('path');
const passport = require('./utils/passport');

// create app instance
const app = express();

// mongoose
require('./utils/dbconn');

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name: 'expressTest.sess',
    secret: 'A_TEST_SECRET',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1000 * 60 * 15 }
}));

// routes
app.get('/', 
    (req, res) => {
        return res.status(200).json({
            success: true,
            msg: 'Default Route, check api documentation!'
        });
    }
);

app.use('/list', passport.authenticate('jwt-login'), require('./routes/list'));
app.use('/users', require('./routes/login'));

module.exports = app;
