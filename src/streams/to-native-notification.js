const through2 = require('through2');
const eventTypes = require('../../config/events');
const di = require('../di');
const _ = require('underscore');
const notifier = require('node-notifier');
const open = require('open');
const path = require('path');
 
const ICON_FILENAME = 'smile.png';

notifier.on('click', function (notifierObject, options) {
    if(options.url){
        open(options.url);
    }
});

module.exports = function(){
    return through2.obj(function(event, enc, cb){
        console.log('to-native-event', new Date(1000 * event.eventCreatedOn), event.type);
        const nativeNotification = getNotificationObjectByEvent(event);
        if(nativeNotification){
            notifier.notify(nativeNotification);
            cb(false, JSON.stringify(event));
        }else{
            cb(false);
        }
    });
};

function getEventDescription(event){
    return eventTypes[ event.type ];
}

function getNotificationObjectByEvent(event){
    let eventActivityDescription = getEventDescription(event);

    if(!eventActivityDescription){
        return null;
    }

    let text = di.inject(eventActivityDescription.text, event)();
    let url = di.inject(eventActivityDescription.onClick, event)();

    let rows = _.compact(text.split('\n').map((row) => row.trim()));

    let title = rows[0];
    let subtitle = rows[1];
    let message = rows.splice(2).join('\n');

    return {
        url,
        title,
        subtitle,
        message,
        icon: path.join(__dirname, '../../images/', ICON_FILENAME),
        wait: false
    };
}