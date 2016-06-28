function previewUpdateHandler(eventBus, editor, preview) {

  this._preview = preview;
  this._editor = editor;

  // set content on preview init
  eventBus.on('marky.preview.init', this.updateContent.bind(this));

  // set content on change
  eventBus.on('marky.editor.change', this.updateContent.bind(this));

}


previewUpdateHandler.prototype.updateContent = function(ctx) {

  var content = this._editor.getContents();

  this._preview.setContent(content);
}

previewUpdateHandler.$inject = [ 'eventBus', 'editor', 'preview' ];

module.exports = previewUpdateHandler;
