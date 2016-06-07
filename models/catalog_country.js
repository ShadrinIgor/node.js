var pgORM  = require('pg-orm');
var Catalog_country = new pgORM( 'catalog_country' );

Catalog_country.attributes = [
    name,
    title,
    description,
    image,
    name_2,
    baner,
    banner2,
    slug,
    active,
    translate,
    rating,
    pos,
    del
];

Catalog_country.attributesName = {
    name:'Название',
    title:'Заголовок',
    description:'Описание',
    image:'Фото',
    name_2:'Фото 2',
    baner:'Баннер',
    banner2:'Баннер 2',
    slug:'Slug',
    active:'Активность',
    translate:'Translate',
    rating:'Оценка системы',
    pos:'Позиция',
    del:'Удаленный'
};

Catalog_country.placeholder = {
    name:'Название страны',
    title:'Заголовок страны',
    description:'Описание страны',
    translate:'Translate',
    rating:'Оценка системы'
};

Catalog_country.rules = {
        required : ['name',"description"],
        save:   ['name','description', 'image', 'flag', 'name_2', 'baner', 'slug', 'active', 'translate', 'banner2', 'title', 'rating', 'pos', 'del' ]
};

Catalog_country.types = {
    description:'vtext',
    image:'image',
    flag:'image',
    name_2:'image',
    baner:'image',
    banner2:'image',
    active:'checkbox',
    del:'checkbox'
};

module.exports = Catalog_country;