import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

import packageJson from './package.json'

const deps =
  Object.keys(packageJson.dependencies)
    .concat('http', 'url')
    .join('|')

const reg = new RegExp(`^(${deps})($|/)`)

const banner = `
/**
 * tgapi v${packageJson.version}
 * ${packageJson.description}
 */
`

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/bundle.js',
    format: 'cjs',
    banner,
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: [
        'ramda',
        'transform-object-rest-spread',
      ],
      presets: [
        'flow',
        ['env', {
          targets: { node: 6 },
          modules: false,
        }],
      ],
    }),
    resolve(),
    commonjs(),
  ],
  external: id => reg.test(id),
}
