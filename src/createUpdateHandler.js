/* @flow */

import { Observable, Subject } from 'rxjs'

import type { Update } from './generatedTypes'

import type {
  TypedUpdate,
  UpdateHandler,
  UpdateType,
} from './types'

const filterByProp =
  (update$: Observable<TypedUpdate>) =>
    (propName: UpdateType): any =>
      update$.filter(update => update.type === propName)

export default (): UpdateHandler => {
  const update$: Subject<Update> = new Subject()

  const typed$: Observable<TypedUpdate> = update$.map(
    ({
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
    }): TypedUpdate => {
      /* eslint-disable camelcase */
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

      return (
        undefined: any
      )
    },
  ).filter(Boolean)

  const filterBy = filterByProp(typed$)

  return {
    emit: (update: Update) => update$.next(update),

    update$: typed$,

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
}
