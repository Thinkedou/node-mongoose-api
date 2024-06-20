import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {DbConnect} from './db'

import creations    from './routes/creations'
import users    from './routes/users'

const app = new Hono()
await DbConnect()

const port = 3000
console.log(`Server is running on port ${port}`)

// app.use('api/creations/*',guard)

// 3000/api/users/
app.route('/api', users)
// 3000/api/creations/
app.route('/api', creations)

app.use("*",(c)=>{
  return c.json({msg:'404 oups'})
});



// // Add a custom header
// app.use('/message/*', async (c, next) => {
//   await next()
//   c.header('x-message', 'This is middleware!')
// })

serve({
  fetch: app.fetch,
  port
})
