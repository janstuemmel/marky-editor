var di = require('didi');
var domify = require('domify');

var assign = require('lodash/assign');
var forEach = require('lodash/forEach');

var DEFAULT_OPTIONS = {};

var CONTAINER ='<div class="marky-markdown"></div>';

require('../assets/css/main.css');

function createInjector(options) {

  var configModule = { 'config': [ 'value', options ] };

  var coreModule = require('./core');

  var modules = [ configModule, coreModule ];

  var injector = new di.Injector(modules);

  // intantiate modules
  forEach(modules, function(m) {
    forEach(m.__init__, function(c) {
      injector[typeof c === 'string' ? 'get' : 'invoke'](c);
    });
  });

  return injector;
}

function Marky(element, content, options) {

  options = assign({}, DEFAULT_OPTIONS, options);

  // append container into dom
  this.container = element.appendChild(domify(CONTAINER));

  // set options
  options.container = this.container;
  options.element = element;
  options.content = content || '';

  // dependenciy injection
  this.injector = createInjector(options);
  this.invoke = this.injector.invoke;
  this.get = this.injector.get;

  // get the eventBus
  this._eventBus = this.get('eventBus');

  // init everything else
  this._eventBus.fire('marky.init');
}

module.exports = Marky;

Marky.prototype.on = function(type, cb) {
  this._eventBus.on(type, cb);
};
