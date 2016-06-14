var express = require('express');
var router = express.Router();
var passport = require('passport');
var CatalogUsers = require('../../models/catalog_users');
var Localpassport = require('passport-local');

var catalog = require("./catalog");

router.all( "/catalog", catalog ); //(/)?(:action)?

// Logout
router.get("/logout", function( req, res, next ){
    if( req.isAuthenticated() )
    {
        req.logOut();
        res.redirect( "/console" );
    }
})

// Index
router.get('/(:error)?', function(req, res, next) {

/*    CatalogUsers.fetchAll( {fields:'id, name', where:'id>10', sort: 'id DESC', limit: 2, offset: 0 }, function ( item, error ){
        if( item && item.length >0 ){
            item.forEach( function( line, num ){
                console.log( item[num].attributes );
            });
        }
            else console.log( 'empty' );

    });*/

    CatalogUsers.fetch( 1, function( item, error ){
        if( typeof ( item ) == 'object' ){
            item.getAttribute('country_id', function ( itemR ){
                console.log( itemR.getAttribute("id") + ' - ' + itemR.getAttribute("name") );
            });

        }
    });

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
        if (!user) { return res.redirect('/console/error'); }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/console' );
        });
    })(req, res, next);
});

module.exports = router;