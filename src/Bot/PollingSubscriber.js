/* @flow */

import EventEmitter from 'events'

/* :: import type { Bot } from './Bot' */
import type { UpdateType } from './types'
import { Subscriber, getConnected } from './Subscriber'

import { getSet } from '../util'

const [getLastId, setLastId] = getSet('lastId')
const [getOptions, setOptions] = getSet('options')

const events = [
  'message',
  'edited_message',
  'channel_post',
  'edited_channel_post',
  'inline_query',
  'chosen_inline_result',
  'callback_query',
  'shipping_query',
  'pre_checkout_query',
]

const getUpdates = (emitter: EventEmitter) => {
  if (!getConnected(emitter)) return

  const { limit, timeout, allowedUpdates } = getOptions(emitter)

  getOptions(emitter)
    .bot.getUpdates({
      limit,
      timeout,
      offset: getLastId(emitter) + 1,
      allowed_updates: allowedUpdates,
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.error_code}: ${response.description}`),
        )
      }

      if (!response.result.length) return

      const updates = response.result

      setLastId(emitter, updates[updates.length - 1].update_id)

      updates.forEach(update => {
        emitter.emit('update', update)
        events.forEach(
          eventName =>
            update[eventName] && emitter.emit(eventName, update[eventName]),
        )
      })

      return getUpdates(emitter)
    })
    .catch(error => emitter.emit('error', error))
}

export type Options = {
  bot: Bot,
  limit?: number,
  timeout?: number,
  allowedUpdates?: Iterable<UpdateType>,
}

export class PollingSubscriber extends Subscriber {
  constructor({ allowedUpdates, ...options }: Options) {
    super()

    setLastId(this, -1)
    setOptions(this, {
      ...options,
      allowedUpdates: allowedUpdates && [...allowedUpdates],
    })
  }

  get bot(): Bot {
    return getOptions(this).bot
  }

  setLimit(limit?: number) {
    getOptions(this).limit = limit
    return this
  }

  setTimeout(timeout?: number) {
    getOptions(this).timeout = timeout
    return this
  }

  setAllowedUpdates(allowedUpdates?: Iterable<UpdateType>) {
    getOptions(this).allowedUpdates = allowedUpdates && [...allowedUpdates]
    return this
  }

  connect(): this {
    super.connect()
    Promise.resolve(this).then(getUpdates)
    return this
  }
}
