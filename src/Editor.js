var domify = require('domify');
var ace = require('brace');

var codemirror = require('codemirror/lib/codemirror');

require('codemirror/mode/markdown/markdown');
require('codemirror/addon/scroll/simplescrollbars');


var DEFAULT_OPTIONS = {
  theme: 'kuroir'
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

  var wrapper = container.appendChild(domify(WRAPPER))
  var el = wrapper.appendChild(domify(EDITOR));


  this.editor = codemirror(el, {
    mode: 'markdown',
    // theme: '3024-night',
    lineNumbers: true,
    scrollbarStyle: 'overlay',
    lineWrapping: true
  });

  this.editor.setSize('100%', '100%')

  this._eventBus.fire('marky.editor.init');

  var that = this;

  this.editor.on('change', function() {
    that._eventBus.fire('marky.editor.change');
  });

  this.setContents(config.content);

}

Editor.prototype.getContents = function() {
  return this.editor.getValue();
}

Editor.prototype.setContents = function(content) {
  return this.editor.setValue(content);
}
