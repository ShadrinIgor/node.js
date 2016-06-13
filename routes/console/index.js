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

    CatalogUsers.fetch( 28, function( item, error ){
        if( typeof ( item ) == 'object'){
            console.log( "getAttribute" );
            item.getAttribute("country_id", function( items ){
                items.forEach( function( iitem ){
                    console.log( iitem.getAttribute("id") + ' - '+iitem.getAttribute("name") );
                } );

                item.getAttribute("country_id", function( items ){
                    items.forEach( function( iitem ){
                        console.log( iitem.getAttribute("id") + ' 2 '+iitem.getAttribute("name") );
                    } );
                });
            });


            /*item.setAttribute("name", "666 OrexСA.com 555" );
            item.save( function( item, errors ){
                if( errors != undefined && errors && errors.length > 0 ){
                    errors.forEach( function( error ){
                        console.log(error)
                    })
                }
                    else console.log("Saved - ");
            })*/
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