var api = {};
global.api = api;
api.net = require('net');

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var results = [];
var socketCount = 4;
var currentID = 1;
var readyResultCount = 0;
var H = task.length/socketCount;
var server = api.net.createServer(function(socket) {
  	console.log('Connected: ' + socket.localAddress);
  	var package = {
		  id: currentID,
		  task : task.slice(H*(currentID-1),H*currentID)
	  };
    currentID++;

    console.log(package);
  	socket.write(JSON.stringify(package));

  	socket.on('data', function(data) {
    data = JSON.parse(data);
    console.log('Data received (by server): ' + data);
    readyResultCount++;
    results[data.id-1] = data.task;
    if(readyResultCount == socketCount){
    	var res = [];
    	for(i = 0; i < results.length; i++)
    		res.push(results[i]);

    	console.log("Ready result: "+res);
    }
  });
}).listen(2000);
