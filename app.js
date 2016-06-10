var express = require('express');
var session = require('express-session');
var MySQLStore = require( 'express-mysql-session' );
var nconf = require('nconf');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Catalog_users = require( './models/catalog_users' );
var md5 = require("md5");

var routes = require('./routes/index');
var consoleRoute = require('./routes/console/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// PASSPORT ----
passport.use(new LocalStrategy({
        usernameField : "email",
        passwordField : "password"
    },
    function(username, password, done) {
        new Catalog_users( )
            .where( {email:username} )
            .fetch()
            .then( function( user ){
                if (!user || !user.id || user.attributes.password != md5( user.attributes.salt+password ) ) {
                    return done(null, false, { message: 'Incorrect data.' });
                }

                return done(null, user);
            })
            .catch( function( error ) {
                return done(error)
            });
    }
));

passport.serializeUser( function( user, done ){
    console.log( 'serializeUser' );
    done( null, user.id )
});

passport.deserializeUser( function( id, done ){
    new Catalog_users({id:id})
        .fetch()
        .then( function( user ){
            done(null,user)
        })
        .catch( function( error ){
            console.log( 'deserializeUser' );
            console.log( 'login - error ('+error+')' );
        })
});
// END PASSPORT

/*app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store:  new MySQLStore( nconf.get("db:connection") ),
    resave: true,
    saveUninitialized: true
}));*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public'),{maxAge:86400000}));

app.use('/', routes);
app.use('/console', consoleRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
