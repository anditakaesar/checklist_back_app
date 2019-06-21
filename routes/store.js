const express = require('express');
const router = express.Router();
const Store = require('../models/store');

router.get('/',
    (req, res) => {
        Store.find({}).exec((err, stores) => {
            if (err) {
                return res.status(400).json({
                    message: err
                });
            }

            return res.status(200).json({
                stores: stores
            });
        });
    }
);

router.put('/',
    (req, res) => {
        let storename = req.body.storename;
        let storedesc = req.body.storedesc;
        let storephone = req.body.storephone;
        
        let newStore = new Store({
            storename: storename,
            storedesc: storedesc,
            storephone: storephone
        });

        newStore.save().then(() => {
            return res.status(200).json({
                message: 'new store created!',
                store: newStore
            });
        });
});


module.exports = router;