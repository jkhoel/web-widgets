module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['better-styled-components', 'prettier'],
  rules: {
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'better-styled-components/sort-declarations-alphabetically': 2,
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        jsxSingleQuote: false,
        endOfLine: 'lf',
        jsxBracketSameLine: false,
        printWidth: 100,
        semi: true,
      },
    ],
  },
};
