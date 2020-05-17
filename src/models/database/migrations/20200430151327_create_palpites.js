
exports.up = function(knex) {
  return knex.schema.createTable('bets',function(table){
    table.increments()

    table.string('bet').notNullable()
    table.string('bet_id').notNullable()
    table.decimal('bet_value').notNullable()
    table.string('user_id').notNullable()
    table.string('match_id').notNullable()
    
    table.unique('bet_id')
    table.foreign('user_id').references('user_id').inTable('users')
    table.foreign('match_id').references('match_id').inTable('apostas')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('bets')
};
