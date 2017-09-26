/* @flow */

// $FlowFixMe
import { startsWith } from 'ramda'

const or = /\s+or\s+/

const arrOf = 'Array of '
const isArray = startsWith(arrOf)

const getType =
  (type) => {
    switch (type) {
      case 'String':
      case 'True':
      case 'Boolean': return type.toLowerCase()
      case 'Float number':
      case 'Float':
      case 'Integer': return 'number'
      default: return type
    }
  }

const tgTypeToFlow = (
  (typeRaw: string): string => {
    if (isArray(typeRaw)) return `Array<${tgTypeToFlow(typeRaw.slice(arrOf.length))}>`
    return typeRaw.split(or).map(getType).join(' | ')
  }

)

export default tgTypeToFlow
