/// Permitir modulos com @, ex: @backend
require('module-alias/register');

import express from 'express';
import next from 'next';
import Database from '@backend/Services/Database';
import Models from '@backend/Models';
import GraphQL from '@backend/GraphQL';


const fetch = require('node-fetch')
//@ts-ignore
global.fetch = fetch

const port = parseInt((process as any).env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const server = express();
app
	.prepare()
	.then(() => Database().up())
	.then(() => Models(server))
	.then((ServerModels) => GraphQL({ app: server, ctx: () => ({ Models: ServerModels }) }))
	.then(() => {
		server.route('*').get((req, res) => handle(req, res))
		server.listen(port, () => {
			console.log('|>')
			console.log(`\ue0b0 Ready on http://localhost:${port} `)
			console.log('<|')
		})
	})
	.catch(e => {
		console.error(e);

		process.exit(1)
	})
