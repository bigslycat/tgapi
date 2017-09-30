/* @flow */

import bodyParser from 'body-parser'

import type { PartialObserver } from './types'
import type { Update } from './generatedTypes'
import isValidUpdate from './util/isValidUpdate'
import HTTPError from './HTTPError'

export default (observer: PartialObserver<Update>) => {
  const parserMiddleware = bodyParser.json()

  const botMiddlware =
    ({ body }: Object, res: any) => {
      if (isValidUpdate(body)) {
        observer.next(body)
        res.end()
        return
      }

      if (observer.error) observer.error(new HTTPError(400, 'Invalid update'))
      res.status(400).send('Bad Request')
    }

  return (req: any, res: any) => (
    typeof req.body === 'object' ?
      botMiddlware(req, res) :
      parserMiddleware(req, res, () => botMiddlware(req, res))
  )
}
