var express = require('express');
var router = express.Router();
var siteHelper = require('site-helper');
var formidable = require('formidable');
var fs = require('fs.extra');

/* GET users listing. */
router.get('/catalog/(:table)(/)?', function(req, res, next) {
    var classObj = require('../../models/' + req.params.table);
    if( classObj ){
        classObj.fetchAll({limit:25}, function (items, error) {
            if (error != undefined) {
                res.send('Error1:' + error);
            }
            else {
                if( classObj.attributesRule && classObj.attributesRule.tableColumns )
                    var lisTableColumns = classObj.attributesRule.tableColumns;
                else
                    var lisTableColumns = [ 'id', 'name' ];

                res.render('console/catalog_list', {items: items, tableColumns: lisTableColumns, message: '', siteHelper: siteHelper});
            }
        });
    }
});

router.get('/catalog/(:table)/(:id)(/)?', function(req, res, next) {
    if( req.params.id >0 ){
        var className = 'catalog_country';
        var Catalog_country = require('../../models/' + className);
            Catalog_country.fetch(req.params.id, function (item, error) {
                if (error != undefined) {
                    res.send('Error1:' + error);
                }
                else {

                    var form = item.getForm();''
                    res.render('console/catalog', {item: item, form: form, className: className, message: '', siteHelper: siteHelper, uploadMessage: ''});
                }
            });
    }
});

router.delete('/catalog/(:table)/(:id)(/)?', function(req, res, next) {
    var form = bsForm.getForm(className, {});
    res.render('console/catalog', {form:form, className: className, message:'', siteHelper: siteHelper});
});

router.put('/catalog/(:table)/(:id)(/)?', function(req, res, next) {
    var message = '';
    var uploadMessage = '';
    var model = require('../../models/' + req.params.table);

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if( err ) {
            message = err;
            res.render('console/catalog', {item: model, form: model.getForm(), message: message, siteHelper: siteHelper, uploadMessage: uploadMessage});
        }
        else {
            model.setFromObj( fields );
            uploadFiles( files, model, function( uploadError ){
                if( uploadError != undefined && uploadError ){
                    uploadMessage = 'Произошла обшибка: '+uploadError;
                }

                //console.log( model._attributes );
                model.save( function( item, error ){
                    if( error != undefined )message = 'Произошла обшибка: '+error;
                                       else message = 'Запись успешно сохраннена';

                    res.render('console/catalog', {item: model, form: model.getForm(), message: message, siteHelper: siteHelper, uploadMessage: uploadMessage});
                });
            });
        }
    });
});

router.post('/catalog/(:table)/(:id)(/)?', function(req, res, next) {
    console.log( 'Нет' );
    var message = '';
    var form;
    var className = 'catalog_country';
    var Catalog_country = require('../../models/' + className);

    if( Catalog_country.saveForm( req.body) ){
        message = 'Запись успешно сохраннена';
    }
        else{
        message = 'Произошла обшибка: '+bsForm.errors;
    }

    form = Catalog_country.getForm();
    res.render('console/catalog', {form: form, className: className, message: message});
});

function uploadFiles( files, model, callBack ){
    var queue = require("queue");
    var q = queue();

    if( typeof( files ) == 'object' ){
        var file;
        var errors = [];
        var currentDate = new Date();
        var path = 'f/'+model.tableName+'/'+currentDate.getFullYear()+'/'+( currentDate.getMonth() + 1 )+'/'+currentDate.getDate()+'/';
        if( model.getAttribute("id")>0 )path += model.getAttribute("id") + '/';

        model.getFieldsByType( model, "image").forEach( function ( field ){
            if( typeof( files[field] ) == "object" && files[field].size > 0 ){
                q.push( function(next) {
                    // Создаем категории
                    fs.mkdirRecursive('../../public/' + path, function (error) {
                        if( error )errors.push(error);
                        // Переносим файлы
                        fs.move(files[field].path, '../../public/' + path + files[field].name, function (error) {
                            console.log("пернес: " + files[field].name);
                            // Удалем если в поле ранее был сохранен файл
                            if( model.getAttribute( field ) ){
                                fs.remove( '../../public/' + model.getAttribute( field ), function( error ){
                                    console.log("удалил: " + model.getAttribute( field ) + ', и сохранил: '+ files[field].name );
                                    model.setAttribute(field, path + files[field].name);
                                    next();
                                });
                            }
                            else{
                                console.log('сохранил: '+ files[field].name );
                                model.setAttribute(field, path + files[field].name);
                                next();
                            }
                        });
                    });
                });
            }
        });

        // Когда все задачи закончатся запустится callBack
        q.start(function(err) {
            callBack( errors );
        });

    }
        else {
        callBack( ['error upload']);
    }
}

// Удаялем картинки
router.get('/catalog/(:table)/delete-file/(:id)/(:field)(/)?', function(req, res, next) {

    if( req.params.table && req.params.id>0 && req.params.field ){
        var model = require( "../../models/"+req.params.table );
        var fs = require("fs");
        model.fetch( req.params.id, function(){
            if( model.getAttribute( req.params.field ) ){
                fs.unlink( "../../public/"+model.getAttribute( req.params.field ), function( err ){
                    if( err != undefined ){
                        console.log( "Ошибка удаления файла: "+err );
                    }

                    model.setAttribute( req.params.field, "" );
                    model.save( function( item, error ){
                        if( error != undefined ){
                            console.log( "Ошибка сохранения при удалении файла: "+error );
                            res.send("0");
                        }
                        else {
                            res.send("1");
                        }

                    });

                });
            }
        });
    }
});

module.exports = router;