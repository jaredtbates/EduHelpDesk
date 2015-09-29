var express = require('express');
var db = require('../../lib/db');
var router = express.Router();

/* GET users listing. */
router.post('/:studentName/:problem/:', function (req, res, next) {
    var request = Request.sync().then(function() {
        return Request.create({
            studentName: ''
        });
    });
    res.send('respond with a resource');
});

module.exports = router;