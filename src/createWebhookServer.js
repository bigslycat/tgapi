/* @flow */

import http from 'http'
import { resolve } from 'url'

import type { UpdateHandler } from './types'
import type { Result, Update } from './generatedTypes'

export default (bot: UpdateHandler, path: string = '') => {
  const server = http.createServer()
  const url = resolve('/', path)

  server.on(
    'request',
    (req: http.IncomingMessage, res: http.ServerResponse) => {
      if (req.method !== 'POST' || req.url !== url) return

      let data = ''

      req.on('data', newData => (data += newData))

      req.on('end', () => {
        try {
          const request: Result<Update[]> = JSON.parse(data)
          if (request.ok) request.result.forEach(bot.emit)
        } finally {
          res.end()
        }
      })
    },
  )

  return server
}
