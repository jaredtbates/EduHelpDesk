var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('admin/index', {
        title: 'Help Desk | Admin'
    });
});

router.get('/users', function (req, res) {
    res.render('admin/users', {
        title: 'Help Desk | Users'
    });
});

module.exports = router;
