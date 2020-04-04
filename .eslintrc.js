module.exports = {
  extends: ['eslint-config-airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
  },
};
