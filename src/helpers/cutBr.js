/* @flow */

import { compose, map, replace } from 'ramda'

export default compose(map, replace(/\n/g))('')
