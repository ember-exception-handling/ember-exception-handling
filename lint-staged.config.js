'use strict';

module.exports = {
  concurrent: false,
  linters: {
    '*.{js,json,css,md}': ['prettier --write', 'git add'],
    '*.js': ['eslint'],
  },
};
