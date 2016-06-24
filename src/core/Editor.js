var domify = require('domify');
var assign = require('lodash/assign');

var codemirror = require('codemirror/lib/codemirror');

require('codemirror/mode/markdown/markdown');
require('codemirror/addon/scroll/simplescrollbars');


var DEFAULT_OPTIONS = {
  theme: 'default',
  mode: 'markdown',
  scrollbarStyle: 'simple',
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
