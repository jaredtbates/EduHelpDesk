var express = require('express');
var db = require('../../lib/db');
var router = express.Router();

/* GET users listing. */
router.all('/api/request', function (req, res, next) {
    var request = db.Request.sync().then(function() {
        return Request.create({
            studentName: req.body.studentName,
            problem: req.body.problem,
            classPeriod: req.body.classPeriod,
            computerId: req.body.computerId,
            currentTeacher: req.body.currentTeacher,
            nextTeacher: req.body.nextTeacher,
            priority: req.body.priority
        });
    });
    res.send('Success!\n' + request);
});

module.exports = router;