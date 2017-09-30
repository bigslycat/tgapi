/* @flow */

import bodyParser from 'body-parser'

import type { UpdateObserver } from './types'
import isValidUpdate from './util/isValidUpdate'

export default (observer: UpdateObserver) => {
  const parserMiddleware = bodyParser.json()

  const botMiddlware =
    ({ body }: Object, res: any) => {
      if (isValidUpdate(body)) {
        observer.next(body)
        res.end()
        return
      }

      observer.error(new Error('Invalid update'))
      res.status(400).send('Bad Request')
    }

  return (req: any, res: any) => (
    typeof req.body === 'object' ?
      botMiddlware(req, res) :
      parserMiddleware(req, res, () => botMiddlware(req, res))
  )
}
