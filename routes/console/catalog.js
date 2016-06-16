var express = require('express');
var router = express.Router();
var bsForm = require('bookshelf-form');

/* GET users listing. */
router.get('/catalog', function(req, res, next) {
    var className = 'catalog_country';
    var Catalog_country = require('../../models/' + className);
    var id=1;

    if( id && id>0 ) {
        Catalog_country.fetch(1, function (item, error) {
            if (error != undefined) {
                res.send('Error1:' + error);
            }
            else {

                var form = item.getForm();
                res.render('console/catalog', {form: form, className: className, message: ''});
            }
        });

    }
        else {
        var form = bsForm.getForm(className, {});
        res.render('console/catalog', {form:form, className: className, message:''});
    }
});

router.post('/catalog', function(req, res, next) {
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

/*    if (id && id > 0) {
        new Catalog_country({id: 1})
            .fetch()
            .then(function (item) {
                if (bsForm.saveForm(className, item.attributes)) {
                    message = 'Запись успешно сохранена';
                }
                else {
                    message = 'Произошла ошибка<ul>' + bsForm.errors + '</ul>';
                }

                var form = bsForm.getForm(className, item.attributes);
                res.render('console/catalog', {form: form, className: className, message: message});

            })
            .catch(function (error) {
                res.send('Error1:' + error);
            });
    }
    else {
        var form = bsForm.getForm(className, {});
        res.render('console/catalog', {form: form, className: className, message: ''});
    }*/
});



module.exports = router;