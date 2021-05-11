const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router
    .use('/admin', require('./admin').router)
    .use('/shop', require('./shop').router)

exports.router = router;