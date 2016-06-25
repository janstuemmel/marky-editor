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


//// MAIN //////

function insertCSS(name, css) {

  var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');

  style.setAttribute('data-css-file', name);

  style.type = 'text/css';

  if (style.styleSheet) style.styleSheet.cssText = css;

  else style.appendChild(document.createTextNode(css));

  head.appendChild(style);
}

insertCSS('marky.css', require('../assets/css/main.css'));
