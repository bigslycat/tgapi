/* @flow */

import { curryN, pipe } from 'ramda'

import toLowerAll from './toLowerAll'

export default curryN(2, pipe)(toLowerAll)
