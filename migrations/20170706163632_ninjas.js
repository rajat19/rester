
// For more details check knexjs.org

exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTableIfNotExists('geo', function(table) {
			table.increments('id').primary()
			table.string('type').defaultTo("Point")
			table.enu('coordinates', ['lat', 'lon'])
		})
		.createTableIfNotExists('ninjas', function(table) {
			table.increments('id').primary()
			table.string('name').notNullable().unique()
			table.string('rank').notNullable()
			table.boolean('available').defaultTo(false)
			// table.foreign('geometry').references('geo.id')
			table.double('lat')
			table.double('lon')
		})
	])
};

exports.down = function(knex, Promise) {

	return Promise.all([
		knex.schema.dropTable('ninjas')
	])
};
