import * as through2 from 'through2';
import { events } from '../../config/events';
import * as di from '../di';
import * as _ from 'underscore';
import * as notifier from 'node-notifier';
import * as open from 'open';
import * as path from 'path';
import { GerritEvent } from '../interfaces/gerrit-event';
import { GerritEventFormatter } from '../interfaces/gerrit-event-formatter';
import { NotificationObject } from '../interfaces/notification-object';

export function TO_NOTIFICATION_OBJECT() {
    return through2.obj(function (event: GerritEvent, enc, cb) {
        const notificationObject: NotificationObject = getNotificationObjectByGerritEvent(event);
        
        if(notificationObject) {
            this.push(notificationObject);
        }

        cb(false);
    });
};

function getNotificationObjectByGerritEvent(event: GerritEvent): NotificationObject {
    let gerritEventFormatter: GerritEventFormatter = getGerritEventFormatter(event);

    if (!gerritEventFormatter) {
        return null;
    }

    let text = di.inject(gerritEventFormatter.text, event)();
    let url = di.inject(gerritEventFormatter.getUrl, event)();
    let authorIcon = di.inject(gerritEventFormatter.getAuthorIcon, event)();

    let rows = _.compact(text.split('\n').map((row) => row.trim()));

    let title = rows[0];
    let subtitle = rows[1];
    let message = rows.splice(2).join('\n');

    return {
        title,
        subtitle,
        message,
        url,
        authorIconPath: authorIcon ? path.join(__dirname, '../../../images/', authorIcon) : null
    } as NotificationObject;
}

function getGerritEventFormatter(event: GerritEvent): GerritEventFormatter {
    return events[event.type];
}