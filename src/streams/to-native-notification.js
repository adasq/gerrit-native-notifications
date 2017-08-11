const through2 = require('through2');
const eventTypes = require('../../config/events');
const di = require('../di');
const _ = require('underscore');
let notifier = require('node-notifier');
const open = require('open');
const path = require('path');
const platform = require('os').platform();

const DEFAULT_ICON_FILENAME = 'smile.png';
const DEFAULT_ICON_PATH = path.join(__dirname, '../../images/', DEFAULT_ICON_FILENAME);

module.exports = function() {
    return through2.obj(function(event, enc, cb){
        const nativeNotification = getNotificationObjectByEvent(event);
        if(nativeNotification){
            if(platform === 'darwin') {
                showNotificationOnOSX(nativeNotification);
            } else {
                showNotification(nativeNotification);
            }
            cb(false, JSON.stringify(event) + '\n');
        }else{
            cb(false);
        }
    });
};

function showNotificationOnOSX(eventDescription) {
    const { title, subtitle, message, url, authorIconPath } = eventDescription;
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

function showNotification(eventDescription) {
    const { title, subtitle, message, url, authorIconPath } = eventDescription;
    notifier.notify({
        url,
        title,
        subtitle,
        message,
        icon: authorIconPath || DEFAULT_ICON_PATH,
        wait: false
    });
}

function getEventDescription(event){
    return eventTypes[ event.type ];
}

function getNotificationObjectByEvent(event){
    let eventActivityDescription = getEventDescription(event);

    if(!eventActivityDescription){
        return null;
    }

    let text = di.inject(eventActivityDescription.text, event)();
    let url = di.inject(eventActivityDescription.getUrl, event)();
    let authorIcon = di.inject(eventActivityDescription.getAuthorIcon, event)();

    let rows = _.compact(text.split('\n').map((row) => row.trim()));

    let title = rows[0];
    let subtitle = rows[1];
    let message = rows.splice(2).join('\n');

    return {
        title,
        subtitle,
        message,
        url,
        authorIconPath: authorIcon ? path.join(__dirname, '../../images/', authorIcon) : null
    };
}