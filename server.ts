import express from 'express'
import next from 'next'
// import Pattern from './router/pattern.json'
import GraphQL from './backend/GraphQL'

const port = parseInt((process as any).env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const server = express()
app
	.prepare()
	.then(() => GraphQL(server))
	.then(() => {
		// for (let { page, pattern } of Pattern.patterns) {
		// 	server.get(pattern, (req, res) =>
		// 		app.render(req, res, page, { ...req.query, ...req.params })
		// 	)
		// }

		server.route('*').get((req, res) => handle(req, res))
		server.listen(port, () => {
			console.log('')
			console.log(`> Ready on http://localhost:${port}`)
		})
	})
	.catch(e => {
		console.error(e);

		process.exit(1)
	})
