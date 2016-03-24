	var jobDescription = {};
	var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];

	var H = -1;

	var result = [];

	jobDescription.configureJobDescription = function(cpuCount){
		H = task.length/cpuCount;
	}

	//partNumber starts from 1.
	jobDescription.getPartialTask = function(partNumber){ 
		var result = {
			partialTask: task.slice(H * (partNumber - 1), H * partNumber),
			workerAction:
				"return partialTask.map(function(item){"+
					"return item*2;"+
				"});"
		};
		console.log("getPartialTask result: "+ JSON.stringify(result));
		return result;
	}

	jobDescription.getMergeStrategy = function(){
		return function(parts){
			var res = [];
			for(var i = 0; i < parts.length; i++)
				res.push(parts[i]);
			return res;
		}
	}

	jobDescription.setJobResult = function(jobResult){
		result = jobResult;
	}
module.exports = jobDescription;