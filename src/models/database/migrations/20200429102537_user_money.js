
exports.up = function(knex) {
  return knex.schema.createTable('money', function (table) {
    table.increments()
    table.decimal('quantidade');
    table.string('uid').notNullable();
    table.unique('uid');

    table.foreign('uid').references('user_id').inTable('users');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('money')
};
