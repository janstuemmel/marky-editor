module.exports = {
  __init__: [ 'eventBus', 'editor', 'preview', 'renderer' ],
  eventBus: [ 'type', require('./EventBus') ],
  editor: [ 'type', require('./Editor') ],
  preview: [ 'type', require('./preview') ],
  renderer: [ 'type', require('./renderer') ]
}
