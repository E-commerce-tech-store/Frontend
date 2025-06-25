// Extends ESLint config to use Prettier for formatting
module.exports = {
  ...require('./eslint.config.js'),
  plugins: [...(require('./eslint.config.js').plugins || []), 'prettier'],
  extends: [...(require('./eslint.config.js').extends || []), 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        "endOfLine": 'auto',
      },
    ],
  },
};
