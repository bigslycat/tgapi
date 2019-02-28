/* @flow */

import { resolve } from 'path'
import { promises } from 'fs'
import { JSDOM } from 'jsdom'
import { CLIEngine } from 'eslint'
import jquery from 'jquery'
import wordwrap from 'wordwrap'
import fetch from 'isomorphic-fetch'

import { toUpperFirst } from '../util'

const generatedPath = resolve(__dirname, '..', 'Bot', 'generated')
const typesFile = resolve(generatedPath, 'apiTypes.js')
const clientFile = resolve(generatedPath, 'BotCore.js')

const cli = new CLIEngine({
  fix: true,
  useEslintrc: true,
})

const wrap0 = wordwrap(77)
const wrap1 = wordwrap(75)
const wrap2 = wordwrap(73)

const starIndent = (str: string) => `* ${str}`

const regType = /^[A-Z][a-zA-Z0-9]*$/
const regMethod = /^[a-z][a-zA-Z0-9]*$/
const regOptional = /^Optional\. */
const regArray = /^Array of +/

const parseType = (str: string, prefix: string = ''): string => {
  if (regArray.test(str)) {
    return `$ReadOnlyArray<${parseType(str.replace(regArray, ''), prefix)}>`
  }

  return str
    .split(/ +(?:or|and) +/)
    .map(type => {
      switch (type) {
        case 'Integer':
        case 'Float':
        case 'Float number':
          return 'number'

        case 'True':
        case 'False':
        case 'String':
        case 'Boolean':
          return type.toLowerCase()

        default:
          return prefix + type
      }
    })
    .join('|')
}

type Prop = {
  name: string,
  type: string,
  optional: boolean,
  description: string,
}

type TypeSpec =
  | {
      type: 'object',
      name: string,
      description: $ReadOnlyArray<string>,
      props: $ReadOnlyArray<Prop>,
    }
  | {
      type: 'union',
      name: string,
      description: $ReadOnlyArray<string>,
      types: $ReadOnlyArray<string>,
    }
  | {
      type: 'defined',
      name: string,
      description: $ReadOnlyArray<string>,
      value: string,
    }
  | {
      type: 'any',
      name: string,
      description: $ReadOnlyArray<string>,
    }

type MethodSpec = {
  name: string,
  description: $ReadOnlyArray<string>,
  props: $ReadOnlyArray<Prop>,
}

const definedTypes = {
  InputFile: `stream$Readable | string`,
}

const serializable = [
  'reply_markup',
  'media',
  'mask_position',
  'results',
  'shipping_options',
  'errors',
]

const renderProps = (props: $ReadOnlyArray<Prop>) => {
  const toSerialize = props
    .filter(prop => serializable.includes(prop.name))
    .map(
      prop =>
        `${prop.name}: props.${prop.name} && JSON.stringify(props.${
          prop.name
        })`,
    )

  return toSerialize.length
    ? `{ ...props, ${toSerialize.join(', ')} }`
    : 'props'
}

// eslint-disable-next-line
;(async () => {
  const response = await fetch('https://core.telegram.org/bots/API')
  const content = await response.text()

  const $: typeof jquery = (jquery(new JSDOM(content).window): any)

  const $headers: $ReadOnlyArray<*> = $('#dev_page_content h4')
    .toArray()
    .map((el: HTMLElement) => $(el))

  const getText = el => $(el).text()

  const getDescription = header =>
    header
      .nextUntil('h3, h4, .table', 'p')
      .toArray()
      .reduce((acc, el) => {
        $(el)
          .html()
          .split(/<br(\s*\/)?>/)
          .forEach(p => acc.push(p))
        return acc
      }, [])
      .filter(p => p != null)
      .map(p => $(`<p>${p}</p>`).text())

  const getTable = header =>
    header
      .nextUntil('h3, h4', '.table:first')
      .find('tr')
      .toArray()
      .slice(1)
      .map(tr =>
        $(tr)
          .find('td')
          .toArray()
          .map(getText),
      )

  const types: $ReadOnlyArray<TypeSpec> = $headers
    .filter(header => regType.test(header.text()))
    .map(header => {
      const name = header.text()
      const description = getDescription(header)
      const table = getTable(header)

      if (table.length) {
        return {
          name,
          description,
          type: 'object',
          props: getTable(header).map(tr => ({
            name: tr[0],
            type: tr[1],
            optional: regOptional.test(tr[2]),
            description: tr[2],
          })),
        }
      }

      const list = header
        .nextUntil('h3, h4', 'ul:first')
        .find('li')
        .toArray()
        .map(getText)

      if (list.length) {
        return {
          name,
          description,
          type: 'union',
          types: list,
        }
      }

      if (definedTypes[name]) {
        return {
          type: 'defined',
          name,
          description,
          value: definedTypes[name],
        }
      }

      return { name, description, type: 'any' }
    })

  const methods: $ReadOnlyArray<MethodSpec> = $headers
    .filter(header => regMethod.test(header.text()))
    .map(header => ({
      name: header.text(),
      description: getDescription(header),
      props: getTable(header).map(tr => ({
        name: tr[0],
        type: tr[1],
        optional: tr[2] === 'Optional',
        description: tr[3],
      })),
    }))

  const flowMethods: $ReadOnlyArray<string> = methods.map(method => {
    const haveProps = !!method.props.length
    const props = haveProps
      ? [
          'props: {',
          method.props
            .map(prop =>
              [
                '/**',
                ...wrap2(prop.description)
                  .split('\n')
                  .map(starIndent),
                '*/',
                `${prop.name}${prop.optional ? '?' : ''}: ${parseType(
                  prop.type,
                  'a.',
                )},`,
              ].join('\n'),
            )
            .join('\n\n'),
          '}',
        ].join('\n')
      : ''

    const arr = [
      '/**',
      `* ${method.name}`,
      '*',
      method.description
        .map(p =>
          wrap1(p)
            .split('\n')
            .map(starIndent)
            .join('\n'),
        )
        .join('\n*\n'),
      '*/',
      `${method.name}(`,
      `${props}${
        method.props.length && method.props.every(prop => prop.optional)
          ? ' = {}'
          : ''
      }`,
      `): Promise<t.Result<r.${toUpperFirst(method.name)}Result>> {`,
      `return callMethod(this, '${method.name}'${
        haveProps ? `, ${renderProps(method.props)}` : ''
      })`,
      '}',
    ]

    return arr.join('\n')
  })

  const flowTypes: $ReadOnlyArray<string> = types.map(type =>
    [
      '/**',
      `* ${type.name}`,
      '*',
      type.description
        .map(p =>
          wrap0(p)
            .split('\n')
            .map(starIndent)
            .join('\n'),
        )
        .join('\n*\n'),
      '*/',
      ...(() => {
        switch (type.type) {
          case 'object':
            return [
              `export type ${type.name} = {`,
              type.props
                .map(prop =>
                  [
                    '/**',
                    ...wrap2(prop.description)
                      .split('\n')
                      .map(starIndent),
                    '*/',
                    `${prop.name}${prop.optional ? '?' : ''}: ${parseType(
                      prop.type,
                    )},`,
                  ].join('\n'),
                )
                .join('\n\n'),
              '}',
            ]
          case 'union':
            return [`export type ${type.name} = ${type.types.join('|')}`]
          case 'defined':
            return [`export type ${type.name} = ${type.value}`]
          case 'any':
            return [`export type ${type.name} = any`]
          default:
            /* :: (type: empty) */
            throw new Error()
        }
      })(),
      '',
    ].join('\n'),
  )

  const flowTypesResult = cli.executeOnText(
    ['/* @flow */', ...flowTypes].join('\n\n'),
    typesFile,
  )

  const flowMethodsResult = cli.executeOnText(
    [
      '/* @flow */',
      '',
      '/* :: ',
      "import * as t from '../types'",
      "import * as a from './apiTypes'",
      "import * as r from '../returnTypes'",
      '*/',
      '',
      "import { callMethod } from '../callMethod'",
      '',
      'export class BotCore {',
      flowMethods.join('\n\n'),
      '}',
    ].join('\n'),
    clientFile,
  )

  await Promise.all([
    promises.writeFile(typesFile, flowTypesResult.results[0].output, 'utf8'),
    promises.writeFile(clientFile, flowMethodsResult.results[0].output, 'utf8'),
  ])
})()
