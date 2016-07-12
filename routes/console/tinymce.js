var express = require('express');
var router = express.Router();
var siteHelper = require('site-helper');
var formidable = require('formidable');
var fs = require('fs.extra');
var queue = require('queue');

/* GET users listing. */
router.get('/tinymce(/)?', function(req, res, next) {
    res.send("Ура");
});

router.post('/tinymce/upload(/)?(:folder)?', function(req, res, next) {
    var images = require('images');

    var q = queue({concurrency:1});
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var file = files['files[]'];

        if( file && file.size > 0 ){

            var path = 'f/editor_tinymce/';
            if( req.params.folder )path += folder + '/';

            // Создаем директорию
            q.push( function( next ){
                fs.mkdirRecursive( 'public/'+ path, function( error ) {
                    if (error)console.log(error);

                    next();
                });
            });

            // Переносим файл
            q.push( function( next ){
                fs.move( file.path, 'public/'+ path + file.name , function( error ){
                    if( error )console.log( error );
                    images('public/'+ path + file.name)
                        .draw(images("public/images/logo.png"), images('public/'+ path + file.name).width()-50, images('public/'+ path + file.name).height()-50)
                        .save( 'public/'+ path + file.name, {
                            quality : 80
                        });

                    next();
                });
            });

            // Создаем превью файлы
            q.push( function( next ){
                var fileName = file.name;
                var fileParam = fileName.split(".");

                images('public/'+ path + fileName)
                    .size(300)
                    .draw(images("public/images/logo.png"), images('public/'+ path + file.name).width()-50, images('public/'+ path + file.name).height()-50)
                    .save('public/'+ path + fileParam[0]+'_2.jpg', {
                        quality : 60
                    });


                images('public/'+ path + fileName)
                    .size(100)
                    .draw(images("public/images/logo.png"), images('public/'+ path + file.name).width()-50, images('public/'+ path + file.name).height()-50)
                    .save('public/'+ path + fileParam[0]+'_3.jpg', {
                        quality : 60
                    });

                res.setHeader('access-control-allow-headers', 'Content-Type, Content-Range, Content-Disposition');
                res.setHeader('access-control-allow-methods', 'OPTIONS, HEAD, GET, POST, DELETE');
                res.setHeader('access-control-allow-origin', '*');
                res.setHeader('content-type', 'application/json');
                res.setHeader('status', '200');
                res.setHeader('vary', 'Accept-Encoding');

                res.send({"files":[{
                    "url":"http://localhost:3000/" + path + file.name,
                    "thumbnailUrl":"http://localhost:3000/" + path + siteHelper.getImageSize( file.name, 3 ),
                    "name": file.name ,
                    "type": file.type,
                    "size": file.size,
                    "deleteUrl":"/console/tinymce/upload/" + file.name+"?_method=delete",
                    "deleteType":"DELETE"
                }]});

            });

            // Когда все задачи закончатся запустится callBack
            q.start(function(err) {
                console.log("Очеред кончилась");
            });

        }
            else {
            res.setHeader('content-type', 'application/json');
            res.setHeader('status', '200');
            res.send({"error":"error"});
        }
    });
});

router.delete('/tinymce/upload/(:file)(/)?', function(req, res, next) {

    var q = queue();
    var file = req.params.file;
    if( file ){

        q.push( function(next){

            fs.remove( 'public/f/editor_tinymce/' + file, function( error ){
                if( error )console.log( error );
                next();
            });
        });

        q.push( function(next){
            fs.remove( 'public/f/editor_tinymce/' + siteHelper.getImageSize( file, 2 ), function( error ){
                if( error )console.log( error );
                next();
            });
        });

        q.push( function(next){
            fs.remove( 'public/f/editor_tinymce/' + siteHelper.getImageSize( file, 3 ), function( error ){
                if( error )console.log( error );
                next();
            });
        });

        // Когда все задачи закончатся запустится callBack
        q.start(function(err) {

            res.setHeader('access-control-allow-headers', 'Content-Type, Content-Range, Content-Disposition');
            res.setHeader('access-control-allow-methods', 'OPTIONS, HEAD, GET, POST, DELETE');
            res.setHeader('access-control-allow-origin', '*');
            res.setHeader('content-type', 'application/json');
            res.setHeader('status', '200');
            res.setHeader('vary', 'Accept-Encoding');
            res.send({file:true,file:true});
        });
    }
});

router.get('/tinymce/images(/)?(:dir)?(/)?', function(req, res, next) {

    var q2 = queue({concurrency:1});
    var cout = [];
    var path = "f/editor_tinymce";
    if( req.params.dir != undefined )path += "/"+req.params.dir;

    fs.readdir( "public/"+path, function ( err, files ){
        if( err )res.send( err );
            else {
            files.forEach( function(file){

                q2.push( function( next ){

                    fs.stat( "public/" + path+"/"+file, function( err, stats ){
                        if( file.indexOf( "_2." ) == -1 && file.indexOf( "_3." ) == -1 && stats.size > 0 ){

                            cout.push( "/"+ path+"/"+siteHelper.getImageSize( file, 3 ) );
                        }
                        next();
                    });
                });
            });

            q2.start( function(error){
                res.send( JSON.stringify( cout ) );
            });

        }
    });
});

router.get('/tinymce/dir(/)?', function(req, res, next) {

    var q2 = queue({concurrency:1});
    var cout = [];
    fs.readdir( "public/f/editor_tinymce", function ( err, files ){
        if( err )res.send( err );
        else {
            files.forEach( function(file){

                q2.push( function( next ){

                    fs.stat( "public/f/editor_tinymce/"+file, function( err, stats ){
                        if( stats.size == 0 ){

                            cout.push( file );
                        }
                        next();
                    });
                });
            });

            q2.start( function(error){
                res.send( JSON.stringify( cout ) );
            });

        }
    });
});

router.post('/tinymce/dir(/)?', function(req, res, next) {
    console.log("delete folder 2");
    if( req.body.folder ){
        fs.mkdir( "public/f/editor_tinymce/"+req.body.folder, 755, function(){
            res.send("1");
        });
    }
    else res.send("0");
});

router.put('/tinymce/dir(/)?', function(req, res, next) {

    if( req.body.folder && req.body.oldfolder ){
        fs.rename( "public/f/editor_tinymce/"+req.body.oldfolder, "public/f/editor_tinymce/"+req.body.folder, function(){
            res.send("1");
        });
    }
    else res.send("0");
});

router.delete('/tinymce/dir(/)?', function(req, res, next) {
    if( req.body.folder ){
        console.log( req.body.folder );
        fs.rmdir( "public/f/editor_tinymce/"+req.body.folder, function(){
            res.send("1");
        });
    }
    else res.send("0");
});

module.exports = router;