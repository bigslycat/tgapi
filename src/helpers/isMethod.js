/* @flow */

import { allPass } from 'ramda'

import { hasType, hasDescription, hasParameters, hasRequired } from './hasValue'

export default allPass([hasParameters, hasType, hasRequired, hasDescription])
