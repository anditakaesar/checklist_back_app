// route for store management
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'all store will be showed here';
    });
});

module.exports = router;