import * as through2 from 'through2';
import { events } from '../../config/events';
import * as di from '../di';
import * as _ from 'underscore';
import * as notifier from 'node-notifier';
import * as open from 'open';
import * as path from 'path';

import { NotificationObject } from '../interfaces/notification-object';
import { GerritEvent } from '../interfaces/gerrit-event';
import { GerritEventFormatter } from '../interfaces/gerrit-event-formatter';

const DEFAULT_ICON_FILENAME = 'smile.png';
const DEFAULT_ICON_PATH = path.join(__dirname, '../../../images/', DEFAULT_ICON_FILENAME);

export function TO_NATIVE_NOTIFICATION(platform: string) {
    return through2.obj(function (notificationObject: NotificationObject, enc, cb) {

        if(!notificationObject) { return cb(false); }

        showNotificationOnPlatform(notificationObject, platform);
        cb(false, JSON.stringify(notificationObject) + '\n');
    });
};

function showNotificationOnPlatform(notificationObject: NotificationObject, platform: string) {
    if (platform === 'darwin') {
        showNotificationOnOSX(notificationObject);
    } else {
        showNotification(notificationObject);
    }
}

function showNotificationOnOSX(notificationObject: NotificationObject) {
    const { title, subtitle, message, url, authorIconPath } = notificationObject;
    (new notifier.NotificationCenter()).notify({
        title,
        subtitle,
        message,
        icon: authorIconPath || DEFAULT_ICON_PATH,
        open: url,
        actions: 'Open',
        closeLabel: 'Close',
    });
}

function showNotification(motificationObject: NotificationObject) {
    const { title, subtitle, message, url, authorIconPath } = motificationObject;
    notifier.notify({
        url,
        title,
        subtitle,
        message,
        icon: authorIconPath || DEFAULT_ICON_PATH,
        wait: false
    });
}