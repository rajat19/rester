const config = require('../knexfile')
let env = 'development'
const knex = require('knex')(config[env])

export default knex

// knex.migrate.latest([config])
