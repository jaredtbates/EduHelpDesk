var express = require('express');
var router = express.Router();

var appConfig = require('../config/app.json');

router.get('/', function (req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/google');
        return;
    }

    res.render('index', {
        title: 'Help Desk',
        periods: appConfig.classPeriods || 7,
        user: req.user
    });
});

module.exports = router;
