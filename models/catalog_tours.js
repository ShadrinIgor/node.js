var mysql  = require('mysql');
var config = require('../config');
var Promise = require('bluebird');
var knex = require('knex')( config.get("db") );
var bookshelf = require('bookshelf')(knex);

var Catalog_tours = bookshelf.Model.extend({
    tableName: 'catalog_tours',

    /**
     * Orders the query by column in order
     * @param column
     * @param order
     */
    orderBy: function (column, order) {
        return this.query(function (qb) {
            qb.orderBy(column, order);
        });
    },

    limit : function( count ){
        return this.query( function(gb){
            gb.limit( count ).offset(0)
        })
    },

    andWhere : function ( params ){
        return this.query( function(gb){
            console.log( params );
            if( params ) {

                if ( params[0])gb.andWhere(params[0], params[1], params[2]);
                         else gb.andWhere(params2);
            }
        })
    },

    country : function (){
        var Catalog_country = require( '../models/catalog_country' );
        return this.belongsTo( Catalog_country, 'country_id' );

    },

    category : function(){
        var Catalog_tours_category = require( '../models/catalog_tours_category' );
        return this.belongsTo( Catalog_tours_category, 'category_id' );
    }
})

module.exports = Catalog_tours;