
exports.up = function(knex) {
    return knex.schema.createTable('comments',function (table) {
        table.increments('id').primary();
        table.integer('image_id').references('id').inTable('images');
        table.integer('user_id').references('id').inTable('users');
        table.text('comment');
        table.integer('rating');
        table.dateTime('comment_date').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
