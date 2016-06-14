var pgOrm  = require('pg-orm');
var Cat_gallery = new pgOrm( "cat_gallery" );

Cat_gallery._attributes = {};

Cat_gallery.attributesName = {
    image:'Файл',
    catalog:'Каталог связи',
    item_id:'ID связи',
    type:'Тип',
    del:'Удален',
    pos:'Позиция'
};


Cat_gallery.attributesRule = {
    required : ['image', 'catalog', 'item_id'],
    save:   [ 'image', 'catalog', 'item_id', 'type', 'del', 'pos' ]
};

Cat_gallery.attributesType = {
    item_id: 'integer',
    image: 'image',
    del: 'integer',
    pos: 'integer'
};

module.exports = Cat_gallery;