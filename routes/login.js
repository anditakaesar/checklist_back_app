const express = require('express');
const router = express.Router();
const passport = require('../utils/passport');
const jwt = require('jsonwebtoken');
const STATICVARS = require('../utils/staticvars');

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.json({ message: 'User not logged in' });
}

function genToken (payload) {
    var token = jwt.sign(payload, STATICVARS.JWT_SECRET, { expiresIn: 24 * 3600 });
    return token;
}

function genPayload(user) {
    var userPayload = {
        id: user._id,
        username: user.username,
        email: user.email
    }
    return userPayload;
}

// initialize passport
router.use(passport.initialize());
router.use(passport.session());

router.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ errMsg: info.errMsg });
        }
        req.login(user, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            var userPayload = genPayload(user);
            
            return res.json({ 
                message: 'User Signup and logged in', 
                user: userPayload,
                token: genToken(userPayload) 
            });
        });
    })(req, res, next);
});

/* POST login. */
router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({ message: 'Login Error', errMsg: info.errMsg });
        }
        req.login(user, function (err) {
            if (err) {
                console.error(err);
                return next(err);
            }
            var userPayload = genPayload(user);
            
            return res.json({ 
                message: 'User Signup and logged in', 
                user: userPayload,
                token: genToken(userPayload) 
            });
        });
    })(req, res, next);
});

router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    return res.json({ message: 'user logged out' });
});

router.get('/info', isLoggedIn, function (req, res, next) {
    res.json({ message: 'user info' });
});

router.post('/jwtinfo', function (req, res, next) {
        passport.authenticate('jwt-login', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({ message: 'JWT Login error', errMsg: info.errMsg });
            }

            return res.json({ message: 'JWT Login success', user: user })
        })(req, res, next);
    }
);

module.exports = router;