import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { StatusCode } from 'hono/utils/http-status'

const app = new Hono()

app.use(
  '/',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8787'],
  })
)

app.get(
  '/',
  async (c) => {
    const query = c.req.query('q')
    if (!query)
      return c.body('Missing query')

    const response = await fetch(query)

    c.status(response.status as StatusCode)
    c.header('Content-Type', 'model/gltf-binary')

    return c.body(response.body)
  }
)

export default app