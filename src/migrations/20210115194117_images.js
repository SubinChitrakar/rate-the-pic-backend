
exports.up = function(knex) {
    return knex.schema.createTable('images',function (table) {
        table.increments('id').primary();
        table.text('image_name');
        table.text('image_path');
        table.date('upload_date').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('images');
};
