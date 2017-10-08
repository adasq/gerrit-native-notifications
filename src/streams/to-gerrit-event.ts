import * as through2 from 'through2';
import * as _ from 'underscore';
import * as parseJson from 'parse-json';
import { GerritEvent } from '../interfaces/gerrit-event';

export function TO_GERRIT_EVENT() {
    return through2.obj(function (chunk, enc, cb) {
        const pushGerritEventForward = (gerritEvent: GerritEvent) => this.push(gerritEvent);

        _.chain(getGerritEventsStringByChunk(chunk))
        .compact()
        .map(parseToGerritEvent)
        .compact()
        .map(pushGerritEventForward);

        cb();
    });
}

function getGerritEventsStringByChunk(chunk): string[] {
    return chunk
        .toString()
        .split('\n');
}

function parseToGerritEvent(gerritEventString: string): GerritEvent {
    let gerritEvent;
    try {
        gerritEvent = parseJson(gerritEventString) as GerritEvent;
    } catch (err) {
        console.log('to-gerrit-event exception', err);
    }
    return gerritEvent;
}
