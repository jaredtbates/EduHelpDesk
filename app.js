var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var limit = require('express-better-ratelimit');
var handlebars = require('hbs');

var routes = {
    index: require('./routes/index'),
    api: {
        v1: require('./routes/api/v1')
    }
};

var app = express();

// json formatting
app.set('json spaces', 2);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/api/v1', routes.api.v1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
    max: 30,
    accessLimited: JSON.parse('{"statusCode":429,"error":"Rate limit exceeded"}')
}));

// handlebars helpers
handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for (var i = 1; i < n; i++) {
        accum += block.fn(i);
    }
    return accum;
});

module.exports = app;
