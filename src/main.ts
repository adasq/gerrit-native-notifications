import { TO_FILE } from './streams/to-file';
import { TO_GERRIT_EVENT } from './streams/to-gerrit-event';
import { IGNORE_GERRIT_EVENT } from './streams/ignore-gerrit-event';
import { REGISTER_REVIEWER_ADDED } from './streams/register-reviewer-added';
import { TO_NATIVE_NOTIFICATION } from './streams/to-native-notification';

import { GERRIT_STREAM } from './streams/ssh-stream';

initialize();

function initialize(){
  GERRIT_STREAM()
  .pipe(TO_GERRIT_EVENT(), { end: false })
  .pipe(IGNORE_GERRIT_EVENT(), { end: false })
  .pipe(REGISTER_REVIEWER_ADDED(), { end: false })
  .pipe(TO_NATIVE_NOTIFICATION(), { end: false })
  .pipe(TO_FILE(), { end: false });
}