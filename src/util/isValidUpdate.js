/* @flow */

import {
  allPass,
  anyPass,
  complement,
  is,
  propIs,
} from 'ramda'

const isObject = is(Object)

const propIsNumber = propIs(Number)

const propIsObject =
  (propName: string) => allPass(([
    propIs(Object, propName),
    complement((propIs(Array, propName): any)),
  ]: any))

type IsValidUpdate = (value: any) => boolean

const isValidUpdate: IsValidUpdate =
  allPass(([
    isObject,
    propIsNumber('update_id'),
    anyPass(([
      propIsObject('message'),
      propIsObject('edited_message'),
      propIsObject('channel_post'),
      propIsObject('edited_channel_post'),
      propIsObject('inline_query'),
      propIsObject('chosen_inline_result'),
      propIsObject('callback_query'),
      propIsObject('shipping_query'),
      propIsObject('pre_checkout_query'),
    ]: any)),
  ]: any))

export default isValidUpdate
