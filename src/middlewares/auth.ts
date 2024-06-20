import { createMiddleware } from 'hono/factory'

const guard = createMiddleware(async (c, next) => {
  console.log(`AUTH GUARD :: [${c.req.method}] ${c.req.url}`)
  await next()
})



export {guard}