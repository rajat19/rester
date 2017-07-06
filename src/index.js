import Koa from 'koa'
import bodyParser from 'koa-body'
import route from './routes/api.js'
import knex from './db'

const app = new Koa()
const port = 3000

app.use(bodyParser())

// initialize routes
app.use(route.routes())
	 .use(route.allowedMethods())

const server = app.listen(port, () => {
	const address = server.address()
	console.log(`Server listening on ${address.address}: ${address.port}`)
})
