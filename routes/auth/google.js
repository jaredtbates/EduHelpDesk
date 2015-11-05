var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', passport.authenticate('google', { scope: 'profile' }));

router.get('/callback', passport.authenticate('google', { successRedirect: '/' }));

module.exports = router;