import Koa from 'koa'
import Router from 'koa-router'
import knex from '../db'

const app = new Koa();
const router = new Router({
	prefix: '/api'
});

let distance = (lat1, lon1, lat2, lon2) => {
	const R = 6371e3; // metres
	const F = 22/(7*180)
	console.log(lat1, lat2)
	let φ1 = lat1*F;
	let φ2 = lat2*F;
	let Δφ = (lat2-lat1)*F;
	let Δλ = (lon2-lon1)*F;

	let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	let d = Math.round(R * c / 1000, 2);
	return d
}

// get a list of ninjas from database
router.get('/ninjas', async(ctx, next) => {
	const result = await knex('ninjas').select()
	const lat = ctx.request.query.lat
	const lon = ctx.request.query.lon
	result.forEach( ninja => {
		let dist = distance(lat, lon, ninja.lat, ninja.lon)
		console.log(ninja.name + " is "+ dist +" km away")
	})
})

// add a new ninja to the database
router.post('/ninjas', async (ctx, next) => {
	const ninja = ctx.request.body
	try {
		const id = await knex('ninjas').insert(ninja)
		const result = await knex('ninjas').where('id', id)
		console.log(result)
		ctx.body = result
	} catch (err) {
		console.error(err);
	}
})

// update ninja in database
router.put('/ninjas/:id', async(ctx, next) => {
	const id = ctx.params.id
	const newData = ctx.request.body
	try {
		const update = await knex('ninjas').where('id', id).update(newData)
		const result = await knex('ninjas').where('id', id)
		console.log(result)
		ctx.body = result
	} catch (err) {
		console.error(err)
		ctx.body = err
	}
})

// delete ninja from database
router.delete('/ninjas/:id', async(ctx, next) => {
	const id = ctx.params.id
	try {
		const result = await knex('ninjas').where('id', id).del()
		console.log(result)
		ctx.body = "successfully deleted"
	} catch (err) {
		console.error(err)
		ctx.body = err
	}
})

// for any other requests
router.get('/(.*)', async(ctx,next) => {
	console.log(ctx.params);
	Object.keys(ctx.params).map(key => console.log(ctx.params[key]));
})

export default router
