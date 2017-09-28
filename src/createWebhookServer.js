/* @flow */

import http, { Server } from 'http'

import type { PartialObserver } from './types'
import type { Update } from './generatedTypes'

import HTTPError from './HTTPError'
import setWebhookToServer from './setWebhookToServer'

export default (
  bot$: PartialObserver<Update>,
  path: string,
  onError?: (error: HTTPError) => any,
): Server => {
  const server = http.createServer()

  setWebhookToServer(bot$, path, onError)(server)

  return server
}
