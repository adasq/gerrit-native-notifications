const through2 = require('through2');
const eventTypes = require('../../config/events');
const di = require('../di');
const _ = require('underscore');
const notifier = require('node-notifier');
const open = require('open');
const path = require('path');
 
const GERRIT_ICON_PATH = '../../chrome-gerrit-notifications-extension/icons/128.png';

notifier.on('click', function (notifierObject, options) {
    open(options.url);
});

module.exports = function(){
    return through2.obj(function(event, enc, cb){

        const nativeNotification = parseEventToNativeNotification(event);
        notifier.notify(nativeNotification);

        cb(false, JSON.stringify(nativeNotification));
    });
};

function getEventDescription(event){
    return eventTypes[ event.type ];
}

function parseEventToNativeNotification(event){

    let eventActivityDescription = getEventDescription(event);

    let text = di.inject(eventActivityDescription.text, event)();
    let url = di.inject(eventActivityDescription.onClick, event)();

    let rows = text.split('\n');
    rows = rows.map((row) => row.trim());
    rows = _.compact(rows);

    let title = rows[0];
    let message = rows.splice(1).join('\n');

    return {
        url,
        title,
        message,
        icon: path.join(__dirname, GERRIT_ICON_PATH),
        wait: true
    };
}

