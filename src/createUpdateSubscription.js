/* @flow */

import { Observable } from 'rxjs/Observable'
/* :: import { Subscription } from 'rxjs/Subscription' */

import { Client } from './createBotClient'

import type { UpdateHandler } from './types'

export default (
  { emit }: UpdateHandler,
  { getUpdates }: Client,
  interval: number = 1000,
): Subscription =>
  Observable
    .interval(interval)
    .mapTo(undefined)
    .map(getUpdates)
    .subscribe(
      resPromise => resPromise.then(
        response => response.ok &&
          response.result.forEach(emit),
      ),
    )
