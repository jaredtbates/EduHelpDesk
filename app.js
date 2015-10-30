var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var limit = require('express-better-ratelimit');

var routes = {
    index: require('./routes/index'),
    admin: require('./routes/admin'),
    api: {
        v1: require('./routes/api/v1')
    }
};

var app = express();

// json formatting
app.set('json spaces', 2);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

module.exports = app;
