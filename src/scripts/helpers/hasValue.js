/* @flow */

import { compose, contains, memoize } from 'ramda'

import toLowerPipe from './toLowerPipe'

const hasValue = compose(memoize, toLowerPipe, contains)

export const hasField = hasValue('field')
export const hasType = hasValue('type')
export const hasDescription = hasValue('description')
export const hasParameters = hasValue('parameters')
export const hasRequired = hasValue('required')

export default hasValue
