
// For more details check knexjs.org

exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTable('ninjas', function(table) {
			table.increments('id').primary()
			table.string('name').notNullable()
			table.string('rank').notNullable()
			table.boolean('available').defaultTo(false)
		})
	])
};

exports.down = function(knex, Promise) {

	return Promise.all([
		knex.schema.dropTable('ninjas')
	])
};
