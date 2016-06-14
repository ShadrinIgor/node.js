var pgOrm  = require('pg-orm');
var Cat_relations = new pgOrm( "cat_relations" );

Cat_relations._attributes = {};

Cat_relations.attributesName = {
    leftClass:'\'Левый\' класс',
    left_id:'\'Левый\' ID',
    rightClass:'\'Правый\' класс ',
    right_id:'\'Правый\' ID',
    del:'Удален',
    pos:'Позиция'
};


Cat_relations.attributesRule = {
    required : ['leftClass', 'left_id', 'rightClass', 'right_id'],
    save:   [ 'leftClass', 'left_id', 'rightClass', 'right_id', 'del', 'pos' ]
};

Cat_relations.attributesType = {
    left_id: 'integer',
    right_id: 'integer',
    del: 'integer',
    pos: 'integer'
};

module.exports = Cat_relations;