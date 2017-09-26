/* @flow */

import { compose, map, memoize, toLower } from 'ramda'

export default compose(memoize, map)(toLower)
