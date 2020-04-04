module.exports = {
  extends: ['eslint-config-airbnb', 'eslint:recommended', 'plugin:react/recommended'],
  plugins: ['better-styled-components'],
  rules: {
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'better-styled-components/sort-declarations-alphabetically': 2,
  },
};
