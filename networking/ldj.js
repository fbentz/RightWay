const
    events = require('events'),
    util = require('util'),

    LDJClient = function(stream) {
        events.eventEmitter.call(this);
    };

util.inherits(LDJClient, events.EventEmitter);
