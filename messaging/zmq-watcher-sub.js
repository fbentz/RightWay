'use stict';
var zmq = require('zmq'),

  subscriber = zmq.socket('sub');

subscriber.subscribe("");

subscriber.on('message', function(data) {
  var message = JSON.parse(data),
      date = new Date(message.timestamp);
  console.log("File '" + message.file +"' change at " + date);
});

subscriber.connect('tcp://localhost:5432');
