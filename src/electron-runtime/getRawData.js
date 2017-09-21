/* @flow */

import Nightmare from 'nightmare'

import type { SpecRaw, SpecRawType, SpecRawUnion } from '../types'

export default (): Promise<SpecRaw> =>
  new Nightmare()
    .goto('https://core.telegram.org/bots/API')
    .evaluate(
      (): SpecRaw => {
        const toText = (e: Element): string => $(e).text()

        const getFieldData = (tableRow: Element): string[] =>
          $(tableRow).find('td').toArray().map(toText)

        const map = (fn: any) => ($e: any) => $e.toArray().map(fn)

        const mapToText: ($e: *) => string[] = map(toText)
        const mapGetFieldData: ($e: *) => string[][] = map(getFieldData)

        const $content = $('#dev_page_content')

        const isType = (text: string) => /^[A-Z][^\s]+$/.test(text)

        return {
          unions: $content.find('ul').toArray().map(
            (ul: Element): void | SpecRawUnion => {
              const $ul = $(ul)

              const types = mapToText($ul.find('li'))

              if (!types.length || !types.every(isType)) return undefined

              const $headerElement = $ul.prevAll('h4:first')
              const $descriptionElements = $ul.prevUntil($headerElement)

              return {
                name: $headerElement.text(),
                description: mapToText($descriptionElements),
                types,
              }
            },
          ).filter(Boolean),
          types: $content.find('.table').toArray().map(
            (table: Element): SpecRawType => {
              const $table = $(table)

              const $tableRows = $table.find('tr')
              const $tableHeadRow = $tableRows.slice(0, 1)
              const $tableDataRows = $tableRows.slice(1)

              const $tableHeadCells = $tableHeadRow.find('td')

              const $headerElement = $table.prevAll('h4:first')
              const $descriptionElements = $table.prevUntil($headerElement)

              return {
                name: $headerElement.text(),
                description: mapToText($descriptionElements),
                fieldHeaders: mapToText($tableHeadCells),
                fieldsData: mapGetFieldData($tableDataRows),
              }
            },
          ),
        }
      },
    )
    .end()
