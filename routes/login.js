var express = require('express');
var router = express.Router();
var User = require('../models/user');

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
            }

            User.create(newUser, (err, user) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.json({ success: true });
                }
            });
        } else {
            return res.json({ success: false, msg: 'error format body' });
        }
    }
);

module.exports = router;