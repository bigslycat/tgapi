/* @flow */

import { dropLast, last } from 'ramda'

import leftPad from './leftPad'

const jsDocStart = '/**'
const rowPrefix = ' * '
const jsDocEnd = ' */'

export default (
  (text: string[], maxLen: number, indent: number = 0): string => {
    const pad = leftPad(indent)

    const formatted = text.map(
      (row: string) => row.split(/\s+/).reduce(
        (rows: string[], nextWord: string): string[] => {
          const lastRow = last(rows)

          return (
            !lastRow || lastRow.length + nextWord.length + 1 > maxLen ?
              [...rows, pad(rowPrefix) + nextWord] :
              [...dropLast(1, rows), `${lastRow} ${nextWord}`]
          )
        }, [],
      ).join('\n'),
    ).join(`\n${pad(' *')}\n`)

    return [
      pad(jsDocStart),
      formatted,
      pad(jsDocEnd),
    ].join('\n')
  }
)
