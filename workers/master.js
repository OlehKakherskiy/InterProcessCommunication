module.exports = function() {

  var cpuCount = api.os.cpus().length;
  var resultMessages = [];
  var resultsCount = 0;

  var workers = [];
  for (var i = 0; i < cpuCount; i++) {
    var worker = api.cluster.fork();
    workers.push(worker);
  }

  var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
  workers.forEach(function(worker) {
    var H = task.length/cpuCount; //кол-во элементов
    subArray = task.slice(H*(worker.id-1),H*worker.id);
    console.log(subArray);
    worker.send({task:subArray});

    worker.on('exit', function (code) {
      console.log('exit ' + worker.process.pid + ' ' + code);
    });

    worker.on('message', function (message) {
      console.log(
        'message from worker (partial calcs) ' + worker.process.pid + ': ' +
        JSON.stringify(message)
      );

      resultMessages[worker.id-1] = message.result;
      resultsCount++;
      if (resultsCount == cpuCount) {
        res = [];
        for(i = 0; i < resultMessages.length; i++){
          res.push(resultMessages[i]);
        }
        console.log("Calculations finished "+ res);
        process.exit(1);
      }

    });

  });

};
