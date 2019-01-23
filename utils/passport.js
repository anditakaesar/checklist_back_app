
const passport    = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

const User = require('../models/user');
const staticvars = require('./staticvars');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
function (email, password, cb) {

    //Assume there is a DB module pproviding a global UserModel
    return User.findOne({email, password})
        .then(user => {
            if (!user) {
                return cb(null, false, {message: 'Incorrect email or password.'});
            }

            return cb(null, user, {
                message: 'Logged In Successfully'
            });
        })
        .catch(err => {
            return cb(err);
        });
}
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   :  staticvars.JWT_SECRET
},
function (jwtPayload, cb) {
    return User.findById(jwtPayload._id)
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
));