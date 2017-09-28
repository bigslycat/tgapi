/* @flow */

import { values } from 'ramda'
import { Subject } from 'rxjs/Subject'
/* :: import { Observable } from 'rxjs/Observable' */

import type { Update } from './generatedTypes'

import type {
  RxUpdateHandler,
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

type Filter = (update$: Subject<Update>) => (propName: UpdateType) => any

const filterByProp: Filter =
  update$ => type =>
    update$
      .filter(update => !!update[type])
      .distinctUntilKeyChanged('update_id')
      .map(({ update_id, ...update }) => ({
        update_id, type, [type]: update[type],
      }))

export default (): RxUpdateHandler => {
  const update$: Subject<Update> = new Subject()

  const filterBy = filterByProp(update$)

  const message$: Observable<MessageUpdate> = filterBy('message')
  const editedMessage$: Observable<EditedMessageUpdate> = filterBy('edited_message')
  const channelPost$: Observable<ChannelPostUpdate> = filterBy('channel_post')
  const editedChannelPost$: Observable<EditedChannelPostUpdate> = filterBy('edited_channel_post')
  const inlineQuery$: Observable<InlineQueryUpdate> = filterBy('inline_query')
  const chosenInlineResult$: Observable<ChosenInlineResultUpdate> = filterBy('chosen_inline_result')
  const callbackQuery$: Observable<CallbackQueryUpdate> = filterBy('callback_query')
  const shippingQuery$: Observable<ShippingQueryUpdate> = filterBy('shipping_query')
  const preCheckoutQuery$: Observable<PreCheckoutQueryUpdate> = filterBy('pre_checkout_query')

  const streams = {
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
