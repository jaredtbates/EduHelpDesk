var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function (req, res) {
    var requests = [];

    db.Request.findAll().then(function(dbRequests) {
        var promises = [];
        dbRequests.forEach(function(request) {
            promises.push(Promise.all(db.Request.count()).spread(function() {
                return request.toJSON()
            }));
        });
    }).then(function(dbRequests) {
        res.send(dbRequests);
    });

    res.render('admin/index', {
        title: 'Help Desk | Admin',
        requests: requests
    });
});

router.get('/users', function (req, res) {
    res.render('admin/users', {
        title: 'Help Desk | Admins',
        admins: db.Admin.findAll()
    });
});

module.exports = router;
