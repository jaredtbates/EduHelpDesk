var express = require('express');
var router = express.Router();
var passport = require('passport');

var googleConfig = require('../../config/auth/google.json');

router.get('/', (req, res, next) => {
    req.session.next = req.query.next;
    next();
}, passport.authenticate('google', {
    scope: ['profile', 'email'],
    hostedDomain: googleConfig.domain
}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
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