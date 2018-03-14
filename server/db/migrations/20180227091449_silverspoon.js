
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('restaurants', (table) => {
    table.integer('id').primary();
    table.string('name', 140).notNullable();
    table.integer('seats').notNullable();
  }),

  knex.schema.createTable('reservations', (table) => {
    table.increments('id').primary();
    table.integer('restaurantid')
      .notNullable()
      .references('id')
      .inTable('restaurants')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.date('date').notNullable();
    table.integer('time').notNullable();
    table.string('name', 140).notNullable();
    table.integer('party').notNullable();
    table.date('timestamp').defaultTo(knex.fn.now());
  }),
]);


exports.down = knex => knex.schema.dropTable('reservations')
  .then(() => knex.schema.dropTable('restaurants'));
