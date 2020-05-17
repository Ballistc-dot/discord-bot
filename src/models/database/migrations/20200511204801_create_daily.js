
exports.up = function(knex) {
  return knex.schema.createTable('daily',function(table){
    const date = new Date()
    const day = date.getDate()
      
    table.string('user_id').notNullable()
    table.datetime('last_daily', { precision: 6 }).defaultTo(day)
    table.unique('user_id')
      
      
    table.foreign('user_id').references('user_id').inTable('users')
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('daily')
};
