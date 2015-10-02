var express = require('express');
var db = require('../../lib/db');
var router = express.Router();

router.post('/request', function (req, res) {
    if (req.body) {
        res.json({
            error: true,
            message: 'Empty request'
        });
        return;
    }

    var request = db.Request.sync().then(function () {
        return db.Request.create({
            studentName: req.body.studentName,
            problem: req.body.problem,
            classPeriod: req.body.classPeriod,
            computerId: req.body.computerId,
            currentTeacher: req.body.currentTeacher,
            nextTeacher: req.body.nextTeacher,
            priority: req.body.priority
        });
    });

    res.send('Success!\n' + request.toString());
});

router.use('*', function (req, res) {
    res.json({
        error: true,
        message: 'API method not found'
    });
});

module.exports = router;