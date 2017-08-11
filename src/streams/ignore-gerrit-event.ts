import * as through2 from 'through2';
import { isIgnored } from '../ignore';

export function IGNORE_GERRIT_EVENT() {
    return through2.obj(function(event, enc, cb){
    		console.log('ignore-gerrit-event');
            if ( isIgnored(event) ) {
            	console.log('the event has been ignored');
                cb(false);
            } else {
                cb(false, event);
            }
    });
};
