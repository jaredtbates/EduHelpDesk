var express = require('express');
var router = express.Router();
var config = require('../config');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {
        title: 'Help Desk',
        periods: config.classPeriods
    });
});

module.exports = router;
