var express = require('express');
var router = express.Router();
var db = require('../lib/db');

var appConfig = require('../config/app.json');

router.get('/', function (req, res) {
    if (!req.isAuthenticated()) {
        switch (appConfig.authProvider) {
            case 'google':
                res.redirect('/auth/google?next=admin');
                break;
        }
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
