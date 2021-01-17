
exports.up = function(knex) {
    return knex.schema.createTable('users',function (table) {
        table.increments('id').primary();
        table.string('email');
        table.string('password');
        table.boolean('admin');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
