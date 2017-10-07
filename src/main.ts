import { TO_FILE } from './streams/to-file';
import { TO_GERRIT_EVENT } from './streams/to-gerrit-event';
import { IGNORE_GERRIT_EVENT } from './streams/ignore-gerrit-event';
import { REGISTER_REVIEWER_ADDED } from './streams/register-reviewer-added';
import { TO_NATIVE_NOTIFICATION } from './streams/to-native-notification';
import { TO_NOTIFICATION_OBJECT } from './streams/to-notification-object';

import { GERRIT_STREAM } from './streams/ssh-stream';

import * as os from 'os';

initialize();
const platform = os.platform();

function initialize(){
  GERRIT_STREAM()
  .pipe(TO_GERRIT_EVENT(), { end: false })
  .pipe(IGNORE_GERRIT_EVENT(), { end: false })
  .pipe(REGISTER_REVIEWER_ADDED(), { end: false })
  .pipe(TO_NOTIFICATION_OBJECT(), { end: false })
  .pipe(TO_NATIVE_NOTIFICATION(platform), { end: false })
  .pipe(TO_FILE(), { end: false });
}