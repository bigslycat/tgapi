/* @flow */

import { values } from 'ramda'
import { Observable, Subject } from 'rxjs'

import type { Update } from './generatedTypes'

import type {
  UpdateObserver,
  UpdateType,
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

const filterByProp =
  (update$: Subject<Update>) =>
    (type: UpdateType): Observable<any> =>
      update$
        .filter(update => !!update[type])
        .distinctUntilKeyChanged('update_id')
        .map(({ update_id, ...update }) => ({
          update_id, type, [type]: update[type],
        }))

export default (): UpdateObserver => {
  const update$: Subject<Update> = new Subject()

  const filterBy = filterByProp(update$)

  const streams: Streams = {
    message$: filterBy('message'),
    editedMessage$: filterBy('edited_message'),
    channelPost$: filterBy('channel_post'),
    editedChannelPost$: filterBy('edited_channel_post'),
    inlineQuery$: filterBy('inline_query'),
    chosenInlineResult$: filterBy('chosen_inline_result'),
    callbackQuery$: filterBy('callback_query'),
    shippingQuery$: filterBy('shipping_query'),
    preCheckoutQuery$: filterBy('pre_checkout_query'),
  }

  return {
    next: (update: Update) => update$.next(update),
    error: error => update$.error(error),
    complete: () => update$.complete(),

    ...streams,

    update$: (
      Observable
        .merge(...values(streams))
        .distinctUntilChanged((prev, next) => (
          prev.update_id === next.update_id &&
          prev.type === next.type
        ))
    ),
  }
}
