var TestContainer = require('mocha-test-container-support');
var MarkyEditor = require('src/Marky.js');

var MARKY;

function bootstrapMarky() {

  return function() {
    var testContainer = TestContainer.get(this);
    MARKY = new MarkyEditor(testContainer);
  };
}

module.exports.bootstrapMarky = (window || global).bootstrapMarky = bootstrapMarky;

function inject(fn) {
  return function() {

    if (!MARKY) {
      throw new Error('no marky instance');
    }

    MARKY.invoke(fn);
  };
}

module.exports.inject = (window || global).inject = inject
