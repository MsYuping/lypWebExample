var events = require('events');
var emitter = new events.eventEmitter();
emitter.emit("error");
