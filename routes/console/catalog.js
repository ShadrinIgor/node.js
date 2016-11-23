var express = require('express');
var router = express.Router();
var siteHelper = require('site-helper');
var formidable = require('formidable');
var fs = require('fs.extra');

/* GET users listing. */
router.get('/catalog/(:table)(/)?', function(req, res, next) {
    var className = req.params.table;
    var classObj = require('../../models/' + className);

    if( classObj ){
        classObj.getForm( function( addformHtml ){

            classObj.fetchAll({limit:25}, function (items, error) {
                if ( error && error != undefined) {
                    res.send('Error1:' + error);
                }
                else {
                    if( classObj.attributesRule && classObj.attributesRule.tableColumns )
                        var lisTableColumns = classObj.attributesRule.tableColumns;
                    else
                        var lisTableColumns = [ 'id', 'name' ];

                    res.render('console/catalog_list', {items: items, addForm:addformHtml, className: className, tableColumns: lisTableColumns, message: '', siteHelper: siteHelper});
                }
            });

        } );
    }
});

router.get('/catalog/(:table)/(:id)(/)?', function(req, res, next) {
    if( req.params.id >0 ){
        var className = req.params.table;
        var Catalog_country = require('../../models/' + className);
            Catalog_country.fetch(req.params.id, function (item, error) {

                if ( error && error != undefined) {
                    res.send('Error:' + error);
                }
                else {

                    item.getForm( function( form ){
                        res.render('console/catalog', {item: item, form: form, className: className, message: '', siteHelper: siteHelper, uploadMessage: ''});
                    } );
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
    console.log(req.body);
    form.parse(req, function(err, fields, files) {

        if( err ) {
            message = err;
            model.getForm( function( form ){
                res.render('console/catalog', {item: model, form: form, message: message, siteHelper: siteHelper, uploadMessage: uploadMessage});
            });
        }
        else {

            model.setFromObj( fields, function( errors ){

                model.save( function( item, error ){
                    if( error && error != undefined ) {
                        message = 'Произошла обшибка: ' + error;
                    }
                    else message = 'Запись успешно сохраннена';

                    model.getForm( function( form ){
                        res.render('console/catalog', {item: model, form: form, message: message, siteHelper: siteHelper, uploadMessage: uploadMessage});
                    });

                }, fields, files);
            });
        }
    });
});

router.post('/catalog/(:table)(/)?', function(req, res, next) {

    var message = '';
    var form;
    var className = req.params.table;
    var model = require('../../models/' + className);

    if( className && model ){

        var form = new formidable.IncomingForm();
        console.log(req.body);
        form.parse(req, function(err, fields, files) {

            if (err) {
                message = err;
                model.getForm(function (form) {
                    res.render('console/catalog', {
                        item: model,
                        form: form,
                        message: message,
                        siteHelper: siteHelper,
                        uploadMessage: ''
                    });
                });
            }
            else {
                model.setFromObj( fields, function( errors ) {

                    model.saveModel(function (result, errors) {
                        if (errors && errors.length > 0) {
                            model.getForm(function (form) {

                                res.render('console/catalog', {
                                    item: model,
                                    form: form,
                                    className: className,
                                    message: '',
                                    siteHelper: siteHelper,
                                    uploadMessage: ''
                                });
                            });
                        } else {
                            res.redirect(siteHelper.getSiteUrl(['console', 'catalog', className]));
                        }
                    }, req.body);

                });
            }
        });
    }
    else{
        message = 'Произошла обшибка: '+bsForm.errors;
        classModel.getForm( function( form ){
            res.render('console/catalog', {form: form, className: className, message: message, siteHelper: siteHelper, uploadMessage: ''});
        });
    }
});

// Удаляем картинки
router.get('/catalog/(:table)/delete-file/(:id)/(:field)(/)?', function(req, res, next) {
    if( req.params.table && req.params.id>0 && req.params.field ){
        var model = require( "../../models/"+req.params.table );
        var fs = require("fs");
        model.fetch( req.params.id, function(){
            if( model.getAttribute( req.params.field ) ){
                fs.unlink( "../../public/"+model.getAttribute( req.params.field ), function( err ){
                    if( err && err != undefined ){
                        console.log( "Ошибка удаления файла: "+err );
                    }

                    model.setAttribute( req.params.field, "" );
                    model.save( function( item, error ){
                        if( error && error != undefined ){
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