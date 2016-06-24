var di = require('didi');
var domify = require('domify');
var ace = require('brace');
var assign = require('lodash').assign;

var DEFAULT_OPTIONS = {};

var CONTAINER ='<div class="marky-markdown"></div>';

var PREVIEW =
  '<div class="marky-wrapper">' +
    '<div class="marky-preview" style="background:#f7f7f7">sadsa</div>' +
  '</div>';

function createInjector(options) {

  var configModule = { 'config': [ 'value', options ] };

  var coreModule = {
    eventBus: [ 'type', require('./EventBus') ],
    editor: [ 'type', require('./Editor') ],
    preview: [ 'type', require('./editing/preview') ]
  };

  var modules = [ configModule, coreModule ];

  return new di.Injector(modules);
}

function Marky(element, content, options) {

  options = assign({}, DEFAULT_OPTIONS, options);

  var container = element.appendChild(domify(CONTAINER));
  // var preview = container.appendChild(domify(PREVIEW));

  options.container = container;
  options.element = element;
  options.content = content || '';

  this.injector = createInjector(options);

  this.invoke = this.injector.invoke;
  this.get = this.injector.get;

  this._eventBus = this.get('eventBus');
  this._editor = this.get('editor');
  this._preview = this.get('preview');

  // init everything else
  this._eventBus.fire('marky.init');

}

module.exports = Marky;
