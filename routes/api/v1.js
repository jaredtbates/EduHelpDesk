var express = require('express');
var router = express.Router();
var db = require('../../lib/db');

var appConfig = require('../../config/app.json');

router.get('/request', (req, res) => {
    if (!req.isAuthenticated() && appConfig.authProvider != 'none') {
        res.redirect('/auth/' + appConfig.authProvider);
        return;
    }
    
    db.Request.findAll({ order: [['id', 'DESC']] }).then(requests => {
        res.json({
            data: requests
        });
    });
});

router.post('/request', (req, res) => {
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

router.put('/request/:id', (req, res) => {
    db.Request.findById(req.params.id).then(request => {
        request.update(req.body);
    });

    res.json({
        statusCode: 204
    });
});

router.delete('/request/:id', (req, res) => {
    db.Request.findById(req.params.id).then(request => {
        request.destroy();
    });

    res.json({
        statusCode: 204
    });
});

router.use('*', (req, res) => {
    res.json({
        statusCode: 404,
        error: 'Not Found'
    });
});

module.exports = router;