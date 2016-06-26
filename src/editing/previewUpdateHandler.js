var md = require('../util/markdownUtil');

function previewUpdateHandler(eventBus, editor, preview) {

  this._editor = editor;
  this._preview = preview;

  var that = this;

  eventBus.on('marky.preview.init', function() {
    that._preview.setContent( that._editor.getContents() );
  });

  eventBus.on('marky.editor.change', function() {
    that._preview.setContent( md(that._editor.getContents()));
  });

}

previewUpdateHandler.$inject = [ 'eventBus', 'editor', 'preview' ];

module.exports = previewUpdateHandler;
