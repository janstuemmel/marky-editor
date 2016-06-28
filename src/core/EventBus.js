var forEach = require('lodash').forEach;

function EventBus() {
  this._listeners = {};
}

module.exports = EventBus;

EventBus.prototype.on = function(type, callback) {

  if (!this._listeners[type]) {
    this._listeners[type] = [ callback ];
  } else {
    this._listeners[type].push(callback)
  }
}

EventBus.prototype.fire = function(type, data) {

  var listeners = this._listeners[type];

  if (!listeners) {
    return;
  }

  forEach(listeners, function(fn) {
    fn.apply(null, data);
  });
}

EventBus.prototype.off = function(type, callback) {

  var listeners = this._listeners[type];

  if (!listeners) {
    return;
  }

  if(callback) {

    for(var i=0; i<listeners.length; i++) {
      if (listeners[i] === callback) {
        listeners.remove(i);
      }
    }

  } else {
    listeners.length = 0;
  }

}
