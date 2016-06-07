var mysql  = require('mysql');
var config = require('../config');
var Promise = require('bluebird');
var knex = require('knex')( config.get("db") );
var bookshelf = require('bookshelf')(knex);

var Catalog_tours_category = bookshelf.Model.extend({
    tableName: 'catalog_tours_category'
});

module.exports = Catalog_tours_category;