var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function (req, res) {
    res.render('admin/index', {
        title: 'Help Desk | Admin',
        requests: db.Request.findAll()
    });
});

router.get('/users', function (req, res) {
    res.render('admin/users', {
        title: 'Help Desk | Admins',
        admins: db.Admin.findAll()
    });
});

module.exports = router;
