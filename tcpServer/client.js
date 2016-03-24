var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var user;

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, function() {
  socket.on('data', function(data) {
    data = JSON.parse(data);
    console.log('Data received (by client): ' + data);

    console.log(data.task);
    data.task = data.task.map(function(item) {
        return item * 2;
    });
      console.log("task "+JSON.stringify(data));
      socket.write(JSON.stringify(data));
    });
});
