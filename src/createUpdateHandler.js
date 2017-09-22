/* @flow */

import { Subject } from 'rxjs'

import type { Update } from './generatedTypes'
import type { UpdateHandler, UpdateProp } from './types'

const filterByProp =
  (update$: Subject<Update>) =>
    (propName: UpdateProp): any =>
      update$.filter(
        update => !!update[propName],
      )

export default (): UpdateHandler => {
  const update$: Subject<Update> = new Subject()

  const filterBy = filterByProp(update$)

  return {
    emit: (update: Update) => update$.next(update),

    update$,

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
