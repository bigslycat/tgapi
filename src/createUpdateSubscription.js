/* @flow */

import { Observable, Subscription } from 'rxjs'

import { Client } from './createBotClient'

import type { UpdateHandler } from './types'

export default (
  { emit }: UpdateHandler,
  client: Client,
  interval: number = 1000,
): Subscription =>
  Observable
    .interval(interval)
    .map(() => client.getUpdates({}))
    .subscribe(
      resPromise => resPromise.then(
        response => response.ok &&
          response.result.forEach(emit),
      ),
    )
