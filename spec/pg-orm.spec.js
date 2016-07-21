var SiteHelper = require("site-helper");

describe("Конфигурация MySQL", function() {
    it("Подключение", function(next) {
        var config = require('../config');
        var dbConfig = config.get("db");
        var pg = require('pg');

        // Создаем подключение к PG
        var conString = "postgres://"+dbConfig.connection.user+":"+dbConfig.connection.password+"@"+dbConfig.connection.host+"/"+dbConfig.connection.database;
        pg.connect(conString, function (err, client, done) {

            expect( err).toBe(null);

            next();
        });
    });
});

describe("PgORM::getAttribute", function() {

    var result = '';
    var fixtureError = '';

    SiteHelper.fixtureUp( "pg-orm-base", function(resultIn, error){
        result = resultIn;
        fixtureError = error;
    });

    it( 'test 1', function(){
        expect( fixtureError ).toBeNull();
    });

    it( 'test 2', function(){
        expect( result ).toEqual('-');
    });


/*    afterEach(function() {
        db.destroy();
    });*/
});



/*
 beforeEach(function() {
 this.dbSuccess = false;
 var self = this;
 runs(function() {
 database.setup({setup:true}, function(err, db) {
 if (err) {
 throw new Error(JSON.stringify(err));
 } else {
 self.dbSuccess = true;
 }
 setFixtures(db);
 });
 });
 waitsFor(function() {
 return self.dbSuccess === true;
 }, 5000, "DB Setup");
 });

 afterEach(function() {
 db.destroy();
 });


 getAttribute
 setAttribute
 setFromObj
 fetch
 clone
 fetchAll
 checkBeforeSave
 save
 saveModel
 sql
 validate
 checkCorrectmail
 checkCorrectDate
 getFieldsByType
 getRelation
 delete
 getForm
 getInput
 showAttributeValue





 */