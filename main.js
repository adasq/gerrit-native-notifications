var sshStream = require('./src/streams/ssh-stream');

const RE_INITIALIZE_TIMEOUT = 5000;

var SSH_STREAM;
var TO_FILE = require('./src/streams/to-file')();
var TO_GERRIT_EVENT = require('./src/streams/to-gerrit-event')();
var IGNORE_GERRIT_EVENT = require('./src/streams/ignore-gerrit-event')();
var TO_NATIVE_NOTIFICATION = require('./src/streams/to-native-notification')();

function initialize(){

    SSH_STREAM = sshStream();

    SSH_STREAM.stderr.on('data', (error) => {
        console.log('reconnect due', error.toString());
        reInitialize();
    });

    SSH_STREAM.stdout
    .pipe(TO_GERRIT_EVENT, { end: false })
    .pipe(IGNORE_GERRIT_EVENT, { end: false })
    .pipe(TO_NATIVE_NOTIFICATION, { end: false })
    .pipe(TO_FILE, { end: false });

}

function reInitialize(){
    setTimeout(initialize, RE_INITIALIZE_TIMEOUT);
}

//events error handling:

TO_GERRIT_EVENT.on('error', (err) => {
    console.error('TO_GERRIT_EVENT error');
    reInitialize();
    console.error(err);
});

initialize();