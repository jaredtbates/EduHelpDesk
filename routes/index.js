var express = require('express');
var router = express.Router();
var appConfig = require('../config/app.json');

router.get('/', function (req, res) {
    res.render('index', {
        title: 'Help Desk',
        periods: appConfig.classPeriods || 7
    });
});

module.exports = router;
