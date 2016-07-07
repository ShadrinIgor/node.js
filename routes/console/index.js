var express = require('express');
var router = express.Router();
var passport = require('passport');
var CatalogUsers = require('../../models/catalog_users');
var Localpassport = require('passport-local');

var catalog = require("./catalog");
var tinymce = require("./tinymce");

router.all( "/catalog(/)?(:action)?(/)?(:action2)?(/)?(:action3)?(/)?(:action4)?(/)?", catalog ); //(/)?(:action)?
router.all( "/tinymce(/)?(:action)?(/)?(:action2)?(/)?(:action3)?(/)?(:action4)?(/)?", tinymce ); //(/)?(:action)?

// Logout
router.get("/logout", function( req, res, next ){
    if( req.isAuthenticated() )
    {
        req.logOut();
        res.redirect( "/console" );
    }
});

// Index
router.get('/(:error)?', function(req, res, next) {
    if( req.isAuthenticated() )
    {
        res.render('console/index', {title: 'Express'});
    }
    else
    {
        var error;
        if( req.params.error != 'undefined' && req.params.error )var error = "Неверный логин или пароль";
        res.render('console/login', {error: error});
    }

});

// Authorization POST
router.post('/', function( req, res, next ){
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/console/error');}

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/console' );
        });
    })(req, res, next);
});

module.exports = router;