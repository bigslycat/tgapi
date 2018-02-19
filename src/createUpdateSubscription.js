/* @flow */

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import 'rxjs/add/observable/from'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/publish'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/pluck'

import { last } from 'ramda'

import type { Client } from './createBotClient'

import type { PartialObserver } from './types'
import type { Update } from './generatedTypes'

type RequestParams = {
  timeout?: number,
  offset?: number,
  allowed_updates?: string[],
  limit?: number,
}

const getRequesrParams =
  (timeout: number, allowedUpdates: void | string[]) =>
    (offset: number): RequestParams => (
      allowedUpdates ?
        { timeout, offset, allowed_updates: allowedUpdates } :
        { timeout, offset }
    )

type Options = {
  allowedUpdates?: string[],
  timeout?: number,
}

export default (
  client: Client,
  observer$: PartialObserver<Update>,
  options: Options = {},
) => {
  const getParams = getRequesrParams(
    Math.max(options.timeout || 1, 1),
    options.allowedUpdates,
  )

  const subject$: Subject<number> = new Subject()

  const result$ =
    subject$
      .startWith(1)
      .map(getParams)
      .mergeMap(client.getUpdates)
      .publish()

  result$.connect()

  const updates$: Observable<Update> =
    result$
      .filter(res => res.ok)
      // $FlowFixMe
      .pluck('result')
      .filter((updates: Update[]) => !!updates.length)
      .mergeMap((updates: Update[]) => Observable.from(updates))

  const offsetSubscription =
    result$.map((res) => {
      if (!res.ok) return 1
      const lastUpdate = last(res.result)
      return lastUpdate ? lastUpdate.update_id + 1 : 1
    }).subscribe(subject$)

  const updatesSubscription =
    updates$.subscribe(observer$)

  return () => {
    offsetSubscription.unsubscribe()
    updatesSubscription.unsubscribe()
  }
}
