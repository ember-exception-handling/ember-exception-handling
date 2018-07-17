'use strict';

module.exports = {
  name: 'exception-handling',
  importTransforms: require('ember-cli-cjs-transform').importTransforms,

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/lodash.curryright/index.js', {
      using: [{ transformation: 'cjs', as: 'lodash/curryRight' }],
    });
  },
};
