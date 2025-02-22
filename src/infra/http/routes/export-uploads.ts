import { exportsUploads } from '@/app/functions/export-uploads'
import { getUploads } from '@/app/functions/get-uploads'
import { uploadImage } from '@/app/functions/upload-image'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportUploadsRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/upload/exports',
    {
      schema: {
        summary: 'Export Uploads',
        tags: ['uploads'],
        querystring: z.object({
          searchQuery: z.string().optional(),
        }),
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (request, reploy) => {
      const { searchQuery } = request.query

      const result = await exportsUploads({
        searchQuery,
      })

      const { reportUrl } = unwrapEither(result)

      return reploy.status(201).send({ reportUrl })
    }
  )
}
