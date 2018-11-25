const env = ({ modules = false } = {}) => [
  '@babel/env',
  {
    targets: {
      node: 6,
      browsers: ['last 4 version', '> 1%', 'not dead'],
    },
    useBuiltIns: 'usage',
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
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
}
