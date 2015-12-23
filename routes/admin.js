var express = require('express');
var router = express.Router();
var db = require('../lib/db');

var appConfig = require('../config/app.json');

router.get('/', function (req, res) {
    if (!req.isAuthenticated() && !(appConfig.authProvider == 'none')) {
        res.redirect('/auth/' + appConfig.authProvider + '?next=admin');
        return;
    }

    if (!(appConfig.authProvider == 'none') && appConfig.admins.indexOf(req.user.emails[0].value) == -1) {
        res.redirect('/');
        return;
    }

    db.Request.findAll().then(function(requests) {
        res.render('admin/index', {
            title: 'Help Desk | Admin',
            requests: requests
        });
    });
});

module.exports = router;
