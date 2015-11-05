var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', passport.authenticate('google', {
    scope: 'profile'
}));

router.get('/callback', function(req) {
    passport.authenticate('google', {
        successRedirect: req.params.page || '/'
    })
});

module.exports = router;