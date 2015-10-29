var express = require('express');
var db = require('../../lib/db');
var router = express.Router();

router.post('/request', function (req, res) {
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
        body: 'Request submitted'
    });
});

router.put('/request/:id', function(req, res) {
    db.Request.findById(req.params.id).then(function(request) {
        request.update(req.body);
    });

    res.json({
        statusCode: 204
    });
});

router.delete('/request/:id', function(req, res) {
    db.Request.findById(req.params.id).then(function(request) {
        request.destroy();
    });

    res.json({
        statusCode: 204
    });
});

router.use('*', function (req, res) {
    res.json({
        statusCode: 404,
        error: 'Not Found'
    });
});

module.exports = router;