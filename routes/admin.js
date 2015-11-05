var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function (req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/google?next=admin');
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
