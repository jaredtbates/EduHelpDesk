var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var limit = require('express-better-ratelimit');
var session = require('express-session');
var passport = require('passport');

var appConfig = require('./config/app.json');

var routes = {
    index: require('./routes/index'),
    admin: require('./routes/admin'),
    api: {
        v1: require('./routes/api/v1')
    },
    auth: {
        google: require('./routes/auth/google'),
        microsoft: require('./routes/auth/microsoft')
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
    secret: appConfig.sessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', routes.index);
app.use('/api/v1', routes.api.v1);
app.use('/admin', routes.admin);

switch (appConfig.authProvider) {
    case 'none':
        break;
    case 'google':
        app.use('/auth/google', routes.auth.google);
        var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
        var googleConfig = require('./config/auth/google.json');
        passport.use(new GoogleStrategy({
                clientID: googleConfig.clientID,
                clientSecret: googleConfig.clientSecret,
                callbackURL: "http://" + appConfig.url + "/auth/google/callback"
            },
            function(token, tokenSecret, profile, done) {
                process.nextTick(function() {
                    return done(null, profile);
                });
            }
        ));
        break;
    case 'microsoft':
        app.use('/auth/microsoft', routes.auth.microsoft);
        var WindowsLiveStrategy = require('passport-windowslive').Strategy;
        var microsoftConfig = require('./config/auth/microsoft.json');
        passport.use(new WindowsLiveStrategy({
                clientID: microsoftConfig.clientID,
                clientSecret: microsoftConfig.clientSecret,
                callbackURL: "http://" + appConfig.url + "/auth/microsoft/callback"
            },
            function(token, tokenSecret, profile, done) {
                process.nextTick(function() {
                    return done(null, profile);
                });
            }
        ));
        break;
    default:
        console.log('\x1b[31mERROR: An invalid authentication scheme has been specified in app.json!\x1b[0m');
        process.exit(1);
        break;
}

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
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

module.exports = app;
