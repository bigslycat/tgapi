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
  MessageUpdate,
  EditedMessageUpdate,
  ChannelPostUpdate,
  EditedChannelPostUpdate,
  InlineQueryUpdate,
  ChosenInlineResultUpdate,
  CallbackQueryUpdate,
  ShippingQueryUpdate,
  PreCheckoutQueryUpdate,
} from './types'

interface Streams {
  message$: Observable<MessageUpdate>,
  editedMessage$: Observable<EditedMessageUpdate>,
  channelPost$: Observable<ChannelPostUpdate>,
  editedChannelPost$: Observable<EditedChannelPostUpdate>,
  inlineQuery$: Observable<InlineQueryUpdate>,
  chosenInlineResult$: Observable<ChosenInlineResultUpdate>,
  callbackQuery$: Observable<CallbackQueryUpdate>,
  shippingQuery$: Observable<ShippingQueryUpdate>,
  preCheckoutQuery$: Observable<PreCheckoutQueryUpdate>,
}

export default (): UpdateObserver => {
  const update$: Subject<Update> = new Subject()

  /* eslint-disable camelcase */

  const streams: Streams = {

    message$: update$.mergeMap(
      ({ update_id, message }) => message ?
        Observable.of({ update_id, message, type: 'message' }) :
        Observable.empty(),
    ),

    editedMessage$: update$.mergeMap(
      ({ update_id, edited_message }) => edited_message ?
        Observable.of({ update_id, edited_message, type: 'edited_message' }) :
        Observable.empty(),
    ),

    channelPost$: update$.mergeMap(
      ({ update_id, channel_post }) => channel_post ?
        Observable.of({ update_id, channel_post, type: 'channel_post' }) :
        Observable.empty(),
    ),

    editedChannelPost$: update$.mergeMap(
      ({ update_id, edited_channel_post }) => edited_channel_post ?
        Observable.of({ update_id, edited_channel_post, type: 'edited_channel_post' }) :
        Observable.empty(),
    ),

    inlineQuery$: update$.mergeMap(
      ({ update_id, inline_query }) => inline_query ?
        Observable.of({ update_id, inline_query, type: 'inline_query' }) :
        Observable.empty(),
    ),

    chosenInlineResult$: update$.mergeMap(
      ({ update_id, chosen_inline_result }) => chosen_inline_result ?
        Observable.of({ update_id, chosen_inline_result, type: 'chosen_inline_result' }) :
        Observable.empty(),
    ),

    callbackQuery$: update$.mergeMap(
      ({ update_id, callback_query }) => callback_query ?
        Observable.of({ update_id, callback_query, type: 'callback_query' }) :
        Observable.empty(),
    ),

    shippingQuery$: update$.mergeMap(
      ({ update_id, shipping_query }) => shipping_query ?
        Observable.of({ update_id, shipping_query, type: 'shipping_query' }) :
        Observable.empty(),
    ),

    preCheckoutQuery$: update$.mergeMap(
      ({ update_id, pre_checkout_query }) => pre_checkout_query ?
        Observable.of({ update_id, pre_checkout_query, type: 'pre_checkout_query' }) :
        Observable.empty(),
    ),
  }

  /* eslint-enable camelcase */

  return {
    next: (update: Update) => update$.next(update),
    error: error => update$.error(error),
    complete: () => update$.complete(),

    ...streams,

    update$: (
      Observable
        .merge(
          streams.message$,
          streams.editedMessage$,
          streams.channelPost$,
          streams.editedChannelPost$,
          streams.inlineQuery$,
          streams.chosenInlineResult$,
          streams.callbackQuery$,
          streams.shippingQuery$,
          streams.preCheckoutQuery$,
        )
        .distinctUntilChanged((prev, next) => (
          prev.update_id === next.update_id &&
          prev.type === next.type
        ))
    ),
  }
}
