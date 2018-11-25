/* @flow */

import fetch from 'isomorphic-fetch'

import type { APIRequest } from './privates'

const json = res => res.json()

export const callMethod = (request: APIRequest) =>
  fetch(request.url, { method: 'POST', body: request.body }).then(json)
