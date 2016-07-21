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