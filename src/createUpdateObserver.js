/* @flow */

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/empty'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/distinctUntilKeyChanged'

import type { Update } from './generatedTypes'

import type {
  UpdateObserver,
  TypedUpdate,
} from './types'

const formatUpdate = ({
  /* eslint-disable camelcase */
  update_id,
  message,
  edited_message,
  channel_post,
  edited_channel_post,
  inline_query,
  chosen_inline_result,
  callback_query,
  shipping_query,
  pre_checkout_query,
}: Update): TypedUpdate | void => {
  if (message) return { update_id, message, type: 'message' }
  if (edited_message) return { update_id, edited_message, type: 'edited_message' }
  if (channel_post) return { update_id, channel_post, type: 'channel_post' }
  if (edited_channel_post) return { update_id, edited_channel_post, type: 'edited_channel_post' }
  if (inline_query) return { update_id, inline_query, type: 'inline_query' }
  if (chosen_inline_result) return { update_id, chosen_inline_result, type: 'chosen_inline_result' }
  if (callback_query) return { update_id, callback_query, type: 'callback_query' }
  if (shipping_query) return { update_id, shipping_query, type: 'shipping_query' }
  if (pre_checkout_query) return { update_id, pre_checkout_query, type: 'pre_checkout_query' }
  /* eslint-enable camelcase */
}

export default (): UpdateObserver => {
  const rawUpdate$: Subject<Update> = new Subject()

  const update$ = rawUpdate$
    .map(formatUpdate)
    .mergeMap((update: TypedUpdate | void): Observable<TypedUpdate> =>
      update ? Observable.of(update) : Observable.empty())
    .publish()

  const message$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'message' ? Observable.of(update) : Observable.empty()).publish()

  const editedMessage$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'edited_message' ? Observable.of(update) : Observable.empty()).publish()

  const channelPost$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'channel_post' ? Observable.of(update) : Observable.empty()).publish()

  const editedChannelPost$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'edited_channel_post' ? Observable.of(update) : Observable.empty()).publish()

  const inlineQuery$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'inline_query' ? Observable.of(update) : Observable.empty()).publish()

  const chosenInlineResult$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'chosen_inline_result' ? Observable.of(update) : Observable.empty()).publish()

  const callbackQuery$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'callback_query' ? Observable.of(update) : Observable.empty()).publish()

  const shippingQuery$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'shipping_query' ? Observable.of(update) : Observable.empty()).publish()

  const preCheckoutQuery$ = update$.mergeMap((update: TypedUpdate) =>
    update.type === 'pre_checkout_query' ? Observable.of(update) : Observable.empty()).publish()

  update$.connect()
  message$.connect()
  editedMessage$.connect()
  channelPost$.connect()
  editedChannelPost$.connect()
  inlineQuery$.connect()
  chosenInlineResult$.connect()
  callbackQuery$.connect()
  shippingQuery$.connect()
  preCheckoutQuery$.connect()

  return {
    next: (update: Update) => rawUpdate$.next(update),
    error: (error: any) => rawUpdate$.error(error),
    complete: () => rawUpdate$.complete(),

    update$,
    message$,
    editedMessage$,
    channelPost$,
    editedChannelPost$,
    inlineQuery$,
    chosenInlineResult$,
    callbackQuery$,
    shippingQuery$,
    preCheckoutQuery$,
  }
}
