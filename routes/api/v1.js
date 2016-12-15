var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sanitizeHtml = require('sanitize-html');

var db = require('../../lib/db');
var appConfig = require('../../config/app.json');
var emailConfig = require('../../config/email.json');

var transport = nodemailer.createTransport(smtpTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secureConnection: emailConfig.secure,
    requiresAuth: true,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.password
    }
}));

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
        studentName: sanitize(req.body.studentName),
        studentEmail: sanitize(req.body.studentEmail),
        problem: sanitize(req.body.problem),
        classPeriod: sanitize(req.body.classPeriod),
        computerId: sanitize(req.body.computerId),
        currentTeacher: sanitize(req.body.currentTeacher),
        nextTeacher: sanitize(req.body.nextTeacher),
        priority: parseInt(sanitize(req.body.priority))
    }).save().then(request => {
        sendEmail(request.studentEmail, 'We have received your request (#' + request.id + ')',
            'Hey ' + request.studentName.split(' ')[0] + '!<br><br>' +
            'We have received your request and will get to it as soon as possible. Please be patient and do not submit another request until you have been contacted by a help desk cadet.<br><br>' +
            'Thank you!<br>' +
            'The Help Desk<br><br><hr><br>' +
            'For reference purposes, your request has been included below:<br>' + request.problem);

        res.json({
            statusCode: 201,
            body: 'Request submitted'
        });
    }).catch(error => {
        res.json({
            statusCode: 500
        });
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
                    'We have resolved your request. If your computer was taken to be worked on, a cadet will return it to you shortly.<br><br>' +
                    'Thank you!<br>' +
                    'The Help Desk<br><br><hr><br>' +
                    'For reference purposes, your request has been included below:<br>' + request.problem);
            }
        }

        request.update(req.body);

        res.json({
            statusCode: 204
        });
    }).error(error => {
        res.json({
            statusCode: 500
        });
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

function sanitize(text) {
    return sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: []
    });
}

module.exports = router;