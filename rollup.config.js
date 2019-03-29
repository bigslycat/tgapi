import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import flowEntry from 'rollup-plugin-flow-entry'
import clear from 'rollup-plugin-clear'

import packageJson from './package.json'

const { dependencies } = packageJson

const deps = dependencies && Object.keys(dependencies).join('|')
const reg = deps && new RegExp(`^(${deps})($|/)`)

const banner = `
/**
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 */
`

const external = id => !!reg && reg.test(id)

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      banner,
    },
    plugins: [
      clear({
        targets: ['lib'],
      }),
      flowEntry(),
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
    ],
    treeshake: true,
    external,
  },
  {
    input: 'src/index.js',
    output: {
      file: 'esm/index.mjs',
      format: 'esm',
      banner,
    },
    plugins: [
      clear({
        targets: ['esm'],
      }),
      flowEntry(),
      babel({
        exclude: 'node_modules/**',
        presets: [
          [
            '@babel/env',
            {
              targets: { node: 10 },
              useBuiltIns: 'usage',
              corejs: { version: 3, proposals: true },
              modules: false,
            },
          ],
        ],
      }),
      commonjs(),
    ],
    treeshake: true,
    external,
  },
]
