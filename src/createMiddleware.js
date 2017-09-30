/* @flow */

import bodyParser from 'body-parser'

import type { UpdateObserver } from './types'

export default (observer$: UpdateObserver) => {
  const parserMiddleware = bodyParser.json()

  const botMiddlware =
    (req: any, res: any) => {
      observer$.next(req.body)
      res.end()
    }

  return (req: any, res: any) => (
    typeof req.body === 'object' ?
      botMiddlware(req, res) :
      parserMiddleware(req, res, () => botMiddlware(req, res))
  )
}
