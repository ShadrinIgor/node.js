var express = require('express');
var session = require('express-session');
var config = require('./config');
var dbConfig = config.get("db");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var pg = require('pg');
var pgSession = require('connect-pg-simple')(session);
var LocalStrategy = require('passport-local').Strategy;
var Catalog_users = require( './models/catalog_users' );
var md5 = require("md5");
var methodOverride = require('method-override')

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
        Catalog_users.fetchAll( {where:"email='"+username+"'",limit:1},
            function( users, error ){
            if( error != undefined || typeof( users ) != "object" ){
                return done(null, false, { message: 'No find user' });
            }
                else {
                var user = users[0];
                if (!user || !user.getAttribute("id") || user.getAttribute("password") != md5( user.getAttribute("salt")+password ) ) {
                    return done(null, false, { message: 'Incorrect data.' });
                }
                    else {
                    return done(null, user)
                }

            }
        })
    }
));

passport.serializeUser( function( user, done ){
    if( user != false ){
        console.log( user + '-' );
        done( null, user.getAttribute("id") );
    }
        else done( null, {} );
});

passport.deserializeUser( function( id, done ){
    Catalog_users.fetch( id, function( user, error ){
            if( error != undefined ){
                console.log( 'deserializeUser' );
                console.log( 'login - error ('+error+')' );
            }
                else done(null,user)
        })
});
// END PASSPORT

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: new pgSession({
        pg : pg,                                  // Use global pg-module
        conString : "postgres://"+dbConfig.connection.user+":"+dbConfig.connection.password+"@"+dbConfig.connection.host+"/"+dbConfig.connection.database, // Connect using something else than default DATABASE_URL env variable
        tableName : 'user_sessions'               // Use another table-name than the default "session" one
    }),
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
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
