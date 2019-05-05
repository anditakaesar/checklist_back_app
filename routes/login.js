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
            return res.json({ message: 'User Signup and logged in' });
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
            return res.json({ message: 'Login Successful' });
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

module.exports = router;