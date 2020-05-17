
exports.up = function(knex) {
  return knex.schema.createTable('apostas',function(table){
      table.increments().primary()
      table.string('time_1').notNullable()
      table.string('time_2').notNullable()
      table.string('link')
      table.string('match_id').notNullable()
      
      table.string('create_user_id').notNullable()
      table.string('create_user_name').notNullable()
      
      table.boolean('isEnded').defaultTo(false)
      table.boolean('no_more_bets').defaultTo(false)
      table.string('winner')
      
      table.unique('match_id')
      table.unique('link')
      table.foreign('create_user_id').references('user_id').inTable('users')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('apostas')
};
