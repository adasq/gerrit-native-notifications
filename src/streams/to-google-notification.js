var through2 = require('through2');
var eventTypes = require('../../config/events');
var di = require('../di');
var _ = require('underscore');


module.exports = function(){
    return through2.obj(function(chunk, enc, cb){
        console.log('to google notification: ',event.type);
        var googleNotification = parseMessageObjToChromeNotification(createMessageByEvent(chunk))
        
        cb(false, googleNotification);
    });
};

function createMessageByEvent(event){

    var eventActivityDescription = eventTypes[ event.type ];
    var textFn = eventActivityDescription.text;
    var onClickFn = eventActivityDescription.onClick;

    var text = di.inject(textFn, event)();
    var onClick = di.inject(onClickFn, event)();

    return {
        text,
        onClick
    };
}


function parseMessageObjToChromeNotification(messageObj){
    var rows = messageObj.text.split('\n');
    rows = rows.map((row) => row.trim());
    rows = _.compact(rows);

    var title = rows[0];

    var items = rows.splice(1).map((row, i) => {
        return {
            title: i % 2 === 1 ? row : '',
            message: i % 2 === 0 ? row : ''
        };
    });

    return {
        url: messageObj.onClick,
        event: {
            title,
            type: 'list',
            message: '-',
            iconUrl: '/icons/128.png',
            items
        }
    };
}