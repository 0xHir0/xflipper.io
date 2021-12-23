module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'max-classes-per-file': ['error', 8],
    'import/prefer-default-export': 0,
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-underscore-dangle': [
      'error',
      { allow: ['__BROWSER__', '__WORKER__', '__NODE__', '__DOM__'] }
    ],
    'prettier/prettier': 'error',
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/no-redundant-roles': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-closing-bracket-location': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    'import/resolver': {
      alias: [
        ['__lib', './__lib/'],
        ['__sass', './__sass/'],
      ]
    },
    webpack: {
      config: 'webpack.client.config.js'
    }
  }
};
