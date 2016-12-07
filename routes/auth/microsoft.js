var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', (req, res, next) => {
    req.session.next = req.query.next;
    next();
}, passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic', 'wl.emails'] }));

router.get('/callback', passport.authenticate('windowslive'), (req, res) => {
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