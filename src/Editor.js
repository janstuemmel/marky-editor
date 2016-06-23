var domify = require('domify');
var ace = require('brace');

var forEach = require('lodash').forEach;

require('brace/mode/markdown');


var DEFAULT_OPTIONS = {
  theme: 'kuroir'
}

var EDITOR = '<div class="marky-editor"></div>';

var themes = [
  'ambiance',
  'iplastic',
  'terminal',
  'chaos',
  'katzenmilch',
  'textmate',
  'chrome',
  'kr_theme',
  'tomorrow',
  'clouds',
  'kuroir',
  'tomorrow_night_blue',
  'clouds_midnight',
  'merbivore',
  'tomorrow_night_bright',
  'cobalt',
  'merbivore_soft',
  'tomorrow_night_eighties',
  'crimson_editor',
  'mono_industrial',
  'tomorrow_night',
  'dawn',
  'monokai',
  'twilight',
  'dreamweaver',
  'pastel_on_dark',
  'vibrant_ink',
  'eclipse',
  'solarized_dark',
  'xcode',
  'github',
  'solarized_light',
  'idle_fingers',
  'sqlserver'
];

require('brace/theme/kuroir.js');

function Editor(eventBus, config) {

  var that = this;

  eventBus.on('marky.init', function() {
    that._init(config);
  });
}

Editor.$inject = [ 'eventBus', 'config' ]

module.exports = Editor;

Editor.prototype._init = function(config) {

  var container = config.container;

  var el = container.appendChild(domify(EDITOR));

  this.editor = ace.edit(el);

  this.editor.getSession().setMode('ace/mode/markdown');
  this.editor.setTheme('ace/theme/kuroir');
  this.editor.setShowPrintMargin(false);
  this.editor.$blockScrolling = Infinity;
}

Editor.prototype.getContents = function() {
  return this.editor.getValue();
}

Editor.prototype.setContents = function(content) {
  return this.editor.setValue(content);
}
