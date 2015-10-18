var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function (req, res) {
    db.Request.findAll().then(function(requests) {
        res.render('admin/index', {
            title: 'Help Desk | Admin',
            requests: requests
        });
    });
});

router.get('/users', function (req, res) {
    db.Admin.findAll().then(function(admins) {
        res.render('admin/users', {
            title: 'Help Desk | Admins',
            admins: admins
        });
    });
});

module.exports = router;
