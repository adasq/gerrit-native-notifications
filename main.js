var initializeGerritConnection = require('./src/ssh-stream');
const RE_INITIALIZE_TIMEOUT = 5000;

var SSH_STREAM;
var TO_FILE = require('./src/streams/to-file')();
var TO_GERRIT_EVENT = require('./src/streams/to-gerrit-event')();
var IGNORE_GERRIT_EVENT = require('./src/streams/ignore-gerrit-event')();
var TO_NATIVE_NOTIFICATION = require('./src/streams/to-native-notification')();

initialize();

function initialize(){
    initializeGerritConnection(function(err, sshStream){
        if(err){
            return console.log('could not connect', err);
        }
        console.log('connected!');

        sshStream.stdout
        .pipe(TO_GERRIT_EVENT, { end: false })
        .pipe(IGNORE_GERRIT_EVENT, { end: false })
        .pipe(TO_NATIVE_NOTIFICATION, { end: false })
        .pipe(TO_FILE, { end: false });

        sshStream.on('close', function() {
          console.log('Stream :: close');
          reInitialize();
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
          reInitialize();
        });
    });
}

function reInitialize(){
    setTimeout(initialize, RE_INITIALIZE_TIMEOUT);
}