const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const STATICVARS = require('../utils/staticvars');

// POST: try to login
// GET: get user detail, id from cookies
// PUT: create new user
// DELETE/$id: delete some userid

router.post('/create',
    (req, res) => {
        if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
            var newUser = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConf: req.body.passwordConf
            };

            User.create(newUser, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({
                        success: false,
                        err: err
                    });
                } else {
                    return res.status(200).json({ 
                        success: true, user: user 
                    });
                }
            });
        } else {
            return res.status(400).json({ success: false, msg: 'error format body' });
        }
    }
);

/* POST login. */
router.post('/auth', function (req, res, next) {
    
});

module.exports = router;