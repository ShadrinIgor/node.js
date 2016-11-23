var pgORM  = require('pg-orm');
var Catalog_items = new pgORM( 'tb_catalog_items', [] );

Catalog_items._attributes = {};

Catalog_items.attributesName = {
    name:'Название',
    title:'Заголовок',
    description:'Описание',
    meta_description: 'Мета описание',
    date: 'Дата',
    image:'Фото',
    slug:'Slug',
    is_active:'Активность',
};

Catalog_items.placeholder = {
    name : 'Название',
    title : 'Заголовок',
    description : 'Описание',
    meta_description : 'Мета описание',
    slug : 'Slug'
};

Catalog_items.attributesRule = {
    required : ['name'],
    save:   ['name', 'description', 'image', 'slug', 'is_active', 'meta_description', 'date' ],
    tableColumns : [ 'id', 'image', 'name', 'is_active', 'slug']
};

Catalog_items.attributesType = {
    description : 'vtext',
    meta_description : 'vtext',
    image : 'image',
    is_active : 'checkbox',
    date : 'date'
};

module.exports = Catalog_items;