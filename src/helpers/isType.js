/* @flow */

import { allPass } from 'ramda'

import { hasField, hasType, hasDescription } from './hasValue'

export default allPass([hasField, hasType, hasDescription])
