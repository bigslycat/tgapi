/* @flow */

import http from 'http'

import type { PartialObserver } from './types'
import type { Update } from './generatedTypes'

import setWebhookToServer from './setWebhookToServer'

export default (bot$: PartialObserver<Update>, path: string): http.Server => {
  const server = http.createServer()

  setWebhookToServer(bot$, path)(server)

  return server
}
