var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    req.session.next = req.query.next;
    next();
}, passport.authenticate('google', { scope: 'profile' }));

router.get('/callback', passport.authenticate('google'), function (req, res) {
    switch (req.session.next) {
        case 'admin':
            res.redirect('/admin');
            break;
        default:
            res.redirect('/');
    }
    delete req.session.next;
});

module.exports = router;