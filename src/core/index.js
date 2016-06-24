module.exports = {
  __init__: [ 'eventBus', 'editor', 'preview' ],
  eventBus: [ 'type', require('./EventBus') ],
  editor: [ 'type', require('./Editor') ],
  preview: [ 'type', require('./preview') ]
}
