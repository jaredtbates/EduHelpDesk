var express = require('express');
var router = express.Router();
var config = require('../config/config');

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Help Desk',
        periods: config.app.classPeriods || 7
    });
});

module.exports = router;
