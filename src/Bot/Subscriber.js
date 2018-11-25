/* @flow */

import EventEmitter from 'events'
import $$observable from 'symbol-observable'

import { getSet } from '../util'
import type { Update } from './generated'

export const [getConnected, setConnected] = getSet<boolean>('connected')

type Subscription = {
  unsubscribe(): void,
}

type Observer<T> = {
  +next?: T => mixed,
  +error?: Error => mixed,
}

export type Obs<A> = {
  +next?: (value: A) => void,
  +error?: (err: Error) => void,
  // complete value parameter is deprecated
  +complete?: (value?: A) => void,
}

const getOnUpdate = (
  next?: (Update => mixed) | Observer<Update>,
): void | (Update => mixed) => {
  if (typeof next == 'function') return next
  if (next && next.next) return value => (next: any).next(value)
}

const getOnError = (
  next?: (Update => mixed) | Observer<Update>,
  error?: Error => mixed,
): void | (Error => mixed) => {
  if (typeof next == 'object' && next.error) {
    return err => (next: any).error(err)
  }

  return error
}

export class Subscriber extends EventEmitter {
  constructor() {
    super()
    this.connect()
  }

  disconnect(): this {
    setConnected(this, false)
    return this
  }

  connect(): this {
    setConnected(this, true)
    return this
  }

  /* ::
  +subscribe: ((
    next?: (Update) => mixed,
    error?: (Error) => mixed,
  ) => Subscription) &
    ((observer: Observer<Update>) => Subscription)
  */

  subscribe(
    next?: (Update => mixed) | Observer<Update>,
    error?: Error => mixed,
  ): Subscription {
    const onUpdate = getOnUpdate(next)
    const onError = getOnError(next, error)

    if (onUpdate) this.on('update', onUpdate)
    if (onError) this.on('error', onError)

    return {
      unsubscribe: () => {
        if (onUpdate) this.removeListener('update', onUpdate)
        if (onError) this.removeListener('error', onError)
      },
    }
  }

  // $FlowFixMe
  [$$observable]() {
    return this
  }
}
