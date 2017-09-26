/* @flow */

import type { SpecRawUnion, UnionSpec } from '../../types'

export default (
  ({ name, description, types }: SpecRawUnion): UnionSpec => ({
    type: 'union',
    name,
    description,
    types,
  })
)
