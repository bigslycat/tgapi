/* @flow */

import { compose, map, zipObj } from 'ramda'

import toLowerAll from './toLowerAll'

export default compose(map, zipObj, toLowerAll)
