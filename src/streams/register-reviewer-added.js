var through2 = require('through2');
var ignore = require('../ignore');
var helpers = require('../helpers');

function iAmAddedAsReviewer(event) {
	return event.type === 'reviewer-added' && helpers.isMe(event.reviewer);
}

module.exports = function(){
    return through2.obj(function(event, enc, cb){
    	if (iAmAddedAsReviewer(event)) {
    		helpers.trackChange(event.change);
    	}
    	cb(false, event);    		
    });
};
