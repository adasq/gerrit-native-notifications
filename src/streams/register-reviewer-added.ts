import * as through2 from 'through2';
import * as helpers from '../helpers';

function iAmAddedAsReviewer(event) {
	return event.type === 'reviewer-added' && helpers.isMe(event.reviewer);
}

export function REGISTER_REVIEWER_ADDED() {
    return through2.obj(function(event, enc, cb){
    	if (iAmAddedAsReviewer(event)) {
    		console.log('tracking now', event.change.id)
    		helpers.trackChange(event.change);
    	}
    	cb(false, event);    		
    });
};
