module.exports = function() {
	
  console.log('Hello from worker ' + process.pid + ' ' + api.cluster.worker.id);

  process.on('message', function (message) {
    console.log(
      'message to worker ' + process.pid +
      ' from master: ' + JSON.stringify(message)
    );
    var taskFunc = new Function("partialTask",message.workerAction)
    process.send(taskFunc(message.partialTask));
  });
};