var express = require('express');
var db = require('../../lib/db');
var router = express.Router();

router.post('/request', function (req, res) {
    if (req.body == null) {
        res.json({
            statusCode: 400,
            error: 'Empty request'
        });
        return;
    }

    db.Request.build({
        studentName: req.body.studentName,
        problem: req.body.problem,
        classPeriod: req.body.classPeriod,
        computerId: req.body.computerId,
        currentTeacher: req.body.currentTeacher,
        nextTeacher: req.body.nextTeacher,
        priority: parseInt(req.body.priority)
    }).save();

    res.json({
        statusCode: 201,
        error: 'Request submitted'
    });
});

router.use('*', function (req, res) {
    res.json({
        statusCode: 404,
        error: 'Not Found'
    });
});

module.exports = router;