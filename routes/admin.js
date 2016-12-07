var express = require('express');
var router = express.Router();
var db = require('../lib/db');

var appConfig = require('../config/app.json');

router.get('/', (req, res) => {
    if (!req.isAuthenticated() && appConfig.authProvider != 'none') {
        res.redirect('/auth/' + appConfig.authProvider + '?next=admin');
        return;
    }

    if ((appConfig.authProvider != 'none') && appConfig.admins.indexOf(req.user.emails[0].value) == -1) {
        res.redirect('/');
        return;
    }

    res.render('admin');
});

module.exports = router;
