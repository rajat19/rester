import Koa from 'koa'
import Route from 'koa-router'
import knex from '../db'

const app = new Koa()
const route = new Route({
		prefix: '/api'
})

// get a list of ninjas from database
route.get('/ninjas', ctx => {
	ctx.body = {type: 'GET'}
})

// add a new ninja to the database
route.post('/ninjas', async (ctx, next) => {
	const ninja = ctx.request.body
	await knex('ninjas')
		.insert(ninja)
		.then((ninja) => {
			ctx.body = "data successfully inserted"
		})
		.catch(function(err) {
			ctx.body = err.message
		})
})

// update ninja in database
route.put('/ninjas/:id', (ctx) => {
	ctx.body = {type: 'PUT'}
})

// delete ninja from database
route.delete('/ninjas/:id', (ctx) => {
	ctx.body = {type: 'DELETE'}
})

export default route
