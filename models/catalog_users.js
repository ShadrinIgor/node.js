var pgOrm  = require('pg-orm');
var inherits = require('inherits');

var Catalog_users = new pgOrm( "catalog_users" );

//inherits(Catalog_users, pgOrm );
    //new pgOrm( "catalog_users" );

Catalog_users.attributes = {};

Catalog_users.attributesName = {
    name:'Название',
    active:'Активность',
    password:'Описание',
    surname:'Фамилия',
    fathname:'Отчество',
    email:'Email',
    country_id:'Страна'
};

Catalog_users.placeholder = {
    name:'Название',
    active:'Активность',
    password:'Описание',
    surname:'Фамилия',
    fathname:'Отчество',
    email:'Email',
    country_id:'Страна'
};

Catalog_users.rules = {
    required : ['name', 'email', 'email'],
    save:   ['name','email', 'password', 'active', 'surname', 'fathname', 'country_id' ]
};

Catalog_users.types = {
    email:'email',
    password:'password',
    active:'checkbox'
};

module.exports = Catalog_users;