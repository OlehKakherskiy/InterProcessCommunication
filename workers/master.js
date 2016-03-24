module.exports = function() {

  var cpuCount = api.os.cpus().length;
  var jobDescription = application.jobDescription;

  var workers = [];

  var resultMessages = [];
  var resultsCount = 0;

  for (var i = 0; i < cpuCount; i++) {
    var worker = api.cluster.fork();
    workers.push(worker);
  }

  jobDescription.configureJobDescription(cpuCount);

  workers.forEach(function(worker) {

    var partialTask = jobDescription.getPartialTask(worker.id);

    worker.send(partialTask);

    worker.on('exit', function (code) {
      console.log('exit ' + worker.process.pid + ' ' + code);
    });

    worker.on('message', function (message) {
      console.log(
        'message from worker (partial calcs) ' + worker.process.pid + ': ' +
        JSON.stringify(message)
      );

      resultMessages[worker.id-1] = message;
      resultsCount++;

      if (resultsCount == cpuCount) {
        console.log("Partial calculations are finished. Merging results...")
        var res = jobDescription.getMergeStrategy()(resultMessages);
        console.log("Calculations finished "+ res);
        jobDescription.setJobResult(res);
        console.log("Job is done.");
        process.exit(1);
      }

    });

  });

};
