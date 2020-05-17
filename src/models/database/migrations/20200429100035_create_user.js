
exports.up = function(knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('user_id').notNullable();
    table.string('game_id').notNullable();
    table.string('username').notNullable();
    table.decimal('total_bets')
    table.decimal('total_wins')

    
    table.unique('user_id')
    table.unique('game_id');
    //table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
