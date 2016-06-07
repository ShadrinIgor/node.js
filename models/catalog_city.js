var mysql  = require('mysql');
var config = require('../config');
var Promise = require('bluebird');
var knex = require('knex')( config.get("db") );
var bookshelf = require('bookshelf')(knex);

var Catalog_city = bookshelf.Model.extend({
    tableName: 'catalog_city'
});

module.exports = Catalog_city;