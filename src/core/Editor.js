var domify = require('domify');
var assign = require('lodash/assign');

var codemirror = require('codemirror/lib/codemirror');

require('codemirror/addon/mode/overlay');

require('codemirror/mode/gfm/gfm');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/php/php');

require('codemirror/addon/scroll/simplescrollbars');

var DEFAULT_OPTIONS = {
  theme: 'dracula',
  mode: 'gfm',
  scrollbarStyle: 'overlay',
  lineNumbers: true,
  lineWrapping: true
};

var WRAPPER = '<div class="marky-wrapper"></div>';
var EDITOR = '<div class="marky-editor"></div>';


function Editor(eventBus, config) {

  this._eventBus = eventBus;

  var that = this;

  eventBus.on('marky.init', function() {
    that._init(config);
  });
}

Editor.$inject = [ 'eventBus', 'config' ]

module.exports = Editor;

Editor.prototype._init = function(config) {

  var container = config.container;

  // append editor to dom
  this.wrapper = container.appendChild(domify(WRAPPER))
  this.el = this.wrapper.appendChild(domify(EDITOR));

  // get codemirror options
  this.options = assign({}, DEFAULT_OPTIONS, config.editor);
  this.options.value = config.content;

  // init codemirror
  this.editor = codemirror(this.el, this.options);

  // set size
  this.editor.setSize('100%', '100%')

  // set the given contents
  this.setContents(config.content);

  var that = this;

  this.on('change', function() {
    that._eventBus.fire('marky.editor.change');
  });

  // init
  this._eventBus.fire('marky.editor.init');
}

Editor.prototype.on = function(type, cb) {
  this.editor.on(type, cb);
}

Editor.prototype.getContents = function() {
  return this.editor.getValue();
}

Editor.prototype.setContents = function(content) {
  return this.editor.setValue(content);
}

Editor.prototype.setOption = function(option, value) {
  return this.editor.setOption(option, value);
}
