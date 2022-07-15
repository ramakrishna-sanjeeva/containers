"use strict";

var fs = require('fs');
var { spawn } = require('child_process');

//Spawned process settings
var options = {
    env: {},                //Environment variables from Lambda implementation is not available 
    encoding: 'utf-8',
    timeout: 10000,
    killSignal: 'SIGKILL'
}

exports.handler = function (event, context, callback) {
    console.log(event);
    var appEvent = event;
    //Source is either SNS/SQS
    if (event.Records) {
        var record = event.Records[0];
        if (record.EventSource == "aws:sns") {
            appEvent = JSON.parse(record.Sns.Message);
        } else if (record.EventSource == "aws:sqs") {
            appEvent = JSON.parse(record.body);
        }
    }
    var code = Buffer.from(appEvent.encodedCode, 'base64').toString('utf8');
    fs.writeFile('/tmp/code.py', code, function (err) {
        if (err) throw callback(Error(err));
    });

    var startTime = new Date().getTime();
    var pythonScript = spawn('python', ["/tmp/code.py"], options);

    var pythonScriptOutput = "";
    pythonScript.stdout.on('data', function (data) {
        console.log(data.toString());
        pythonScriptOutput = data.toString();
    })

    pythonScript.stderr.on('data', function (data) {
        console.error('Python script failed with error code of ', data);
        callback(Error('Python script failed with error code of ', data), null);
    })

    pythonScript.on('close', (code) => {
        if (code !== 0) {
            console.log(`pythonScript process exited with code ${code}`);
        } else {
            var endTime = new Date().getTime();
            var response = {
                'id': appEvent.id,
                'language': appEvent.language,
                'exitCode': code,
                'executionTime': (endTime - startTime) / 1000,
                'encodedResponse': Buffer.from(pythonScriptOutput, "utf8").toString("base64")
            };
            console.log("Response :", JSON.stringify(response));
            callback(null, response);
        }
    });
}