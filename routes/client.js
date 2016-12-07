var express = require('express');
var router = express.Router();

var appConfig = require('../config/app.json');

router.get('/', (req, res) => {
    if (!req.isAuthenticated() && !(appConfig.authProvider == 'none')) {
        res.redirect('/auth/' + appConfig.authProvider);
        return;
    }

    res.render('client', {
        periods: appConfig.classPeriods || 7,
        user: req.user
    });
});

module.exports = router;
