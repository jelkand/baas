import { fastify, FastifyInstance, RouteShorthandOptions } from 'fastify'
import { bogosort, Comparator } from 'bogosort-x'

const server: FastifyInstance = fastify({
  logger: true,
})

const intComparator: Comparator<number> = (a: number, b: number) => {
  if (a > b) return 1
  if (a < b) return -1
  return 0
}

const intSorter = bogosort(intComparator)

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
}

server.get('/ping', opts, async (request, reply) => {
  return { pong: 'it worked!' }
})

server.post(
  '/sort-integers',
  {
    schema: {
      body: {
        type: 'array',
        items: {
          type: 'integer',
        },
      },
    },
  },
  async (request, reply) => {
    return intSorter(request.body as number[])
  }
)

server.listen(3000, '0.0.0.0', err => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }

  const addressObj = server?.server?.address()
  const port = typeof addressObj !== 'string' ? addressObj?.port : 'none'
  const address = typeof addressObj !== 'string' ? addressObj?.address : 'none'
  server.log.info(`server listening on ${address} and port ${port}`)
})
