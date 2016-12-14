var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var db = require('../../lib/db');
var appConfig = require('../../config/app.json');
var emailConfig = require('../../config/email.json');

var transport = nodemailer.createTransport('smtps://' + emailConfig.email + ':' + emailConfig.password + '@' + emailConfig.smtpAddress);

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
        studentEmail: req.body.studentEmail,
        problem: req.body.problem,
        classPeriod: req.body.classPeriod,
        computerId: req.body.computerId,
        currentTeacher: req.body.currentTeacher,
        nextTeacher: req.body.nextTeacher,
        priority: parseInt(req.body.priority)
    }).save();

    sendEmail(req.body.studentEmail, 'We have received your request (#' + request.id + ')',
        'Hey ' + req.body.studentName.split(' ')[0] + '!<br><br>' +
        'We have received your request and will get to it as soon as possible. Please be patient and do not submit another request until you have been contacted by a help desk cadet.<br><br>' +
        'Thank you!<br>' +
        'The Help Desk<br><br><hr><br>' +
        'For reference purposes, your request has been included below:<br>' + req.body.problem);

    res.json({
        statusCode: 201,
        body: 'Request submitted'
    });
});

router.put('/request/:id', (req, res) => {
    db.Request.findById(req.params.id).then(request => {
        if (request.studentEmail) {
            if (req.body.received) {
                sendEmail(request.studentEmail, 'We have started working on your request (#' + request.id + ')',
                    'Hey ' + request.studentName.split(' ')[0] + '!<br><br>' +
                    'Just an update: We have started working on your request!<br><br>' +
                    'Thank you!<br>' +
                    'The Help Desk<br><br><hr><br>' +
                    'For reference purposes, your request has been included below:<br>' + request.problem);
            } else if (req.body.resolved) {
                sendEmail(request.studentEmail, 'Your request is resolved (#' + request.id + ')',
                    'Hey ' + request.studentName.split(' ')[0] + '!<br><br>' +
                    'We have resolved your request.<br><br>' +
                    'Thank you!<br>' +
                    'The Help Desk<br><br><hr><br>' +
                    'For reference purposes, your request has been included below:<br>' + request.problem);
            }
        }

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

function sendEmail(to, subject, html) {
    if (!emailConfig.enabled) {
        return;
    }

    transport.sendMail({
        from: '"Help Desk" <' + emailConfig.email + '>',
        to: to,
        subject: subject,
        html: html
    });
}

module.exports = router;