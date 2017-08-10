const GERRIT_STREAM = require('./src/streams/ssh-stream');
const TO_FILE = require('./src/streams/to-file')();
const TO_GERRIT_EVENT = require('./src/streams/to-gerrit-event')();
const IGNORE_GERRIT_EVENT = require('./src/streams/ignore-gerrit-event')();
const REGISTER_REVIEWER_ADDED = require('./src/streams/register-reviewer-added')();
const TO_NATIVE_NOTIFICATION = require('./src/streams/to-native-notification')();

initialize();

function initialize(){
  GERRIT_STREAM
  .pipe(TO_GERRIT_EVENT, { end: false })
  .pipe(IGNORE_GERRIT_EVENT, { end: false })
  .pipe(REGISTER_REVIEWER_ADDED, { end: false })
  .pipe(TO_NATIVE_NOTIFICATION, { end: false })
  .pipe(TO_FILE, { end: false });
}