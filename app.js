var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var limit = require('express-better-ratelimit');
var session = require('express-session');
var passport = require('passport');

var routes = {
    index: require('./routes/index'),
    admin: require('./routes/admin'),
    api: {
        v1: require('./routes/api/v1')
    },
    auth: {
        callback: require('./routes/auth/google')
    }
};

var app = express();

// json formatting
app.set('json spaces', 2);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '9e`%(K7s9T3w&9-d4n^YvX);9qVz`sM',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/', routes.index);
app.use('/api/v1', routes.api.v1);
app.use('/admin', routes.admin);
app.use('*', function(req, res) {
    res.redirect('/');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(logger('dev'));

    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// rate limiting
app.use(limit({
    duration: 5000,
    max: 10,
    accessLimited: JSON.parse('{"statusCode":429,"error":"Rate limit exceeded"}')
}));

// auth

module.exports = app;
