var pgOrm  = require('pg-orm');

var Catalog_users = new pgOrm( "catalog_users" );

Catalog_users._attributes = {};

Catalog_users.attributesName = {
    name:'Название',
    active:'Активность',
    password:'Пароль',
    surname:'Фамилия',
    fathname:'Отчество',
    email:'Email',
    country_id:'Страна',
    salt:'Соль для пароля'
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

Catalog_users.attributesRule = {
    required : ['name', 'email', 'email'],
    save:   [ 'salt, date_add', 'name','email', 'password', 'active', 'surname', 'fathname', 'country_id' ]
};

Catalog_users.attributesType = {
    email:'email',
    password:'password',
    active:'checkbox',
    date_add : 'date',
    integer : 'country_id',
    boolean : 'active'
};

Catalog_users.relations = {
    country_id: [ "HAS_MANY", "catalog_country" ]
};

module.exports = Catalog_users;