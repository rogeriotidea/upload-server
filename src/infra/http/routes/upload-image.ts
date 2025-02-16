import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const UploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/upload',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          name: z.string(),
          password: z.string().optional(),
        }),
        response: {
          201: z.object({ uploadId: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Upload already exists'),
        },
      },
    },
    async (request, reploy) => {
      return reploy.status(201).send({ uploadId: '123' })
    }
  )
}
