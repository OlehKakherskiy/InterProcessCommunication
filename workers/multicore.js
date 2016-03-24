global.api = {};
api.cluster = require('cluster');
api.os = require('os');

global.application = {};
application.master = require('./master.js');
application.worker = require('./worker.js');

if (api.cluster.isMaster) {
	application.jobDescription = require('./jobDescription.js');
	console.log(application.jobDescription);
	application.master();
}
else application.worker();
