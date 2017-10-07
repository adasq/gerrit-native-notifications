import * as through2 from 'through2';
import { ignoreList } from '../../config/ignore';
import * as _ from 'underscore';
import { GerritEvent } from '../interfaces/gerrit-event';

export function IGNORE_GERRIT_EVENT() {
    return through2.obj((event: GerritEvent, enc, cb) => {
        console.log('ignore-gerrit-event');

        const ignoredFn = _.find(ignoreList, fn => fn(event));
        const isIgnored = !!ignoredFn;
        if (isIgnored) {
            console.log('the event has been ignored by function:');
            console.log(ignoredFn.toString())
            cb(false);
        } else {
            cb(false, event);
        }
    });
};
