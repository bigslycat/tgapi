/* @flow */

import http, { Server } from 'http'

import type { UpdateHandler } from './types'

import HTTPError from './HTTPError'
import setWebhookToServer from './setWebhookToServer'

export default (
  bot: UpdateHandler,
  path: string,
  onError?: (error: HTTPError) => any,
): Server => {
  const server = http.createServer()

  setWebhookToServer(bot, path, onError)(server)

  return server
}
