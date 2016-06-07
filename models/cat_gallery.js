var mysql  = require('mysql');
var config = require('../config');
var Promise = require('bluebird');
var knex = require('knex')( config.get("db") );
var bookshelf = require('bookshelf')(knex);

var Сat_gallery = bookshelf.Model.extend({
    tableName: 'cat_gallery',

    orderBy: function (column, order) {
        return this.query(function (qb) {
            qb.orderBy(column, order);
        });
    },

    limit: function( count ){
        return this.query( function(gb){
            gb.limit( count ).offset(0);
        } )
    }
});

module.exports = Сat_gallery;