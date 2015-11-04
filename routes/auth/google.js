var express = require('express');
var router = express.Router();
var googleConfig = require('../../config/auth/google');

router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.me'] }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

module.exports = router;