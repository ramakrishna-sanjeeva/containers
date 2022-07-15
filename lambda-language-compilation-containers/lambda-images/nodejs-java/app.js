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
    var code = Buffer.from(appEvent.encodedCode, 'base64').toString('ascii');
    fs.writeFile('/tmp/HelloWorld.java', code, function (err) {
        if (err) throw callback(Error(err));
    });

    var compilationStartTime = new Date().getTime();
    var javaSrcCompile = spawn('javac', ["/tmp/HelloWorld.java"], options);

    javaSrcCompile.stdout.on('data', function (data) {
        console.log(data.toString());
    })

    javaSrcCompile.stderr.on('data', function (data) {
        console.error('Java code compilation failed with error code of ', data);
        callback(Error('Java code compilation failed with error code of ', data), null);
    })

    javaSrcCompile.on('close', (code) => {
        var compilationEndTime = new Date().getTime();
        if (code !== 0) {
            console.log(`javaSrcCompile process exited with code ${code}`);
        } else {
            var executionStartTime = new Date().getTime();
            var javaClassOutput = "";

            var javaClassExecution = spawn('java', ["-classpath", "/tmp", "HelloWorld"], options);

            javaClassExecution.stdout.on('data', function (data) {
                console.log(data.toString());
                javaClassOutput = data.toString();
            })

            javaClassExecution.stderr.on('data', function (data) {
                console.error('Java execution failed with error code of ', data);
                callback(Error('Java execution failed with error code of ', data), null);
            })

            javaClassExecution.on('close', (code) => {
                var executionEndTime = new Date().getTime();
                if (code !== 0) {
                    console.log(`javaClassExecution process exited with code ${code}`);
                } else {
                    var endTime = new Date().getTime();
                    var response = {
                        'id': appEvent.id,
                        'language': appEvent.language,
                        'exitCode': code,
                        'compilationTime': (compilationEndTime - compilationStartTime) / 1000,
                        'executionTime': (executionEndTime - executionStartTime) / 1000,
                        'encodedResponse': Buffer.from(javaClassOutput, "utf8").toString("base64")
                    };
                    console.log("Response :", JSON.stringify(response));
                    callback(null, response);
                }
            });
        }
    });
}

