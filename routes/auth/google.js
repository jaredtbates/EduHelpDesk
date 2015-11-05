var express = require('express');
var router = express.Router();
var passport = require('passport');

var googleConfig = require('../../config/auth/google');

router.get('/', passport.authenticate('google', {
    scope: 'profile'
}));

router.get('/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/error'
}));

module.exports = router;