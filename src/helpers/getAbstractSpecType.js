/* @flow */

import cutBr from './cutBr'
import zipToHeaders from './zipToHeaders'
import isType from './isType'
import isMethod from './isMethod'

import type { SpecRawType, Spec } from '../types'

export default (
  ({ name, description: descRaw, fieldHeaders, fieldsData }: SpecRawType): Spec => {
    const fields: any = zipToHeaders(fieldHeaders)(fieldsData)
    const description = cutBr(descRaw)

    if (isType(fieldHeaders)) {
      return {
        type: 'typedef',
        name,
        description,
        fields,
      }
    }

    if (isMethod(fieldHeaders)) {
      return {
        type: 'method',
        name,
        description,
        fields,
      }
    }

    return {
      type: 'unknown',
      name,
      description,
      fields,
    }
  }
)
