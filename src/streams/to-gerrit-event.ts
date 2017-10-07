import * as through2 from 'through2';
import * as _ from 'underscore';
import * as parseJson from 'parse-json';
import { GerritEvent } from '../interfaces/gerrit-event';

function getEventsListByChunk(chunk) {
    return _.compact(chunk.toString().split('\n'));
}

export function TO_GERRIT_EVENT() {
    return through2.obj(function (chunk, enc, cb) {
        const that = this;
        let gerritEvent: GerritEvent = null;
        console.log('to gerrit event');
        getEventsListByChunk(chunk).forEach((event) => {
            if (event) {
                try {
                    gerritEvent = parseJson(event) as GerritEvent;
                    that.push(gerritEvent);
                } catch (ex) {
                    console.log('to-gerrit-event exception', ex);
                    console.log(gerritEvent);
                }
            }
        });
        cb();
    });
}