const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const utilities = require('../utils/utilities');
const STATICVARS = require('./staticvars');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

var jwtparams = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: STATICVARS.JWT_SECRET
}


// Configuration Serialize user
passport.serializeUser(function (user, next) {
    next(null, user.id);
});

passport.deserializeUser(function (id, next) {
    User.findById(id, function (err, user) {
        if (err) {
            console.error('Error accessing records id: ' + id);
            return console.log(err.message);
        }
        return next(null, user);
    });
});

/* ----- STRATEGIES ------- */
// Local Strategy
passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, next) {
        process.nextTick(function () {
            User.findOne({ email: email }, function (err, user) {
                if (err) {
                    return utilities.errHandler(err);
                }
                if (user) {
                    console.log('user already exists');
                    return next(null, false, { errMsg: 'email already exists' });
                }
                else {
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        if (err) {
                            console.log(err);
                            if (err.message == 'User validation failed') {
                                console.log(err.message);
                                return next(null, false, { errMsg: 'Please fill all fields' });
                            }
                            return utilities.errHandler(err);
                        }
                        console.log('New user successfully created', newUser.username);
                        console.log('email', email);
                        console.log(newUser);
                        return next(null, newUser);
                    });
                }
            });
        });
    }
));
// local login
passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, next) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                return utilities.errHandler(err);
            }
            if (!user) {
                return next(null, false, { errMsg: 'User does not exists' });
            }
            if (!user.validPassword(password)) {
                return next(null, false, { errMsg: 'Invalid password' });
            }
            return next(null, user);
        });
    }
));
// jwt
passport.use('jwt-login', new JwtStrategy(
    jwtparams,
    function (jwtPayload, next) {
        var user = {
            id: jwtPayload.id,
            username: jwtPayload.username,
            email: jwtPayload.email
        };
        
        return next(null, user);
    }
));

module.exports = passport;