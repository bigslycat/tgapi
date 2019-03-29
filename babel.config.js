const env = ({ modules = false } = {}) => [
  '@babel/env',
  {
    targets: { node: 6 },
    useBuiltIns: 'usage',
    corejs: { version: 3, proposals: true },
    modules: modules && 'commonjs',
  },
]

module.exports = {
  exclude: 'node_modules/**',
  presets: ['@babel/flow', env()],
  env: {
    test: {
      plugins: ['istanbul'],
      presets: [env({ modules: true }), ['module:ava/stage-4', false]],
    },
    script: {
      presets: [
        [
          '@babel/env',
          {
            targets: { node: 'current' },
            useBuiltIns: 'usage',
            corejs: { version: 3, proposals: true },
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
}
