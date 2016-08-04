var GERRIT_STREAM = require('./src/ssh-stream');
var TO_FILE = require('./src/streams/to-file')();
var TO_GERRIT_EVENT = require('./src/streams/to-gerrit-event')();
var IGNORE_GERRIT_EVENT = require('./src/streams/ignore-gerrit-event')();
var TO_NATIVE_NOTIFICATION = require('./src/streams/to-native-notification')();

initialize();

function initialize(){
  GERRIT_STREAM
  .pipe(TO_GERRIT_EVENT, { end: false })
  // .pipe(IGNORE_GERRIT_EVENT, { end: false })
  .pipe(TO_NATIVE_NOTIFICATION, { end: false })
  .pipe(TO_FILE, { end: false });
}

