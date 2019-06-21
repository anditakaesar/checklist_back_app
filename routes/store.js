// route for store management
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) {
    res.status(200).json({
        message: 'all store will be showed here';
    });
});

module.exports = router;