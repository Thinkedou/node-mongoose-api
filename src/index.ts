import { serve } from '@hono/node-server'
import { Hono } from 'hono'
// import {DbConnect} from './db'

const app = new Hono()
// await DbConnect()

const port = 3000
console.log(`Server is running on port ${port}`)

app.get('/', (c) => {
  return c.json({msg:'working wow 🔥'})
})


serve({
  fetch: app.fetch,
  port
})
