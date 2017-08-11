import * as through2 from 'through2';
import * as _ from 'underscore';
import * as parseJson from 'parse-json';

function getEventsListByChunk(chunk){
    return _.compact(chunk.toString().split('\n'));
}

export function TO_GERRIT_EVENT(){
    return through2.obj(function(chunk, enc, cb){
            var that = this, json = null;
            console.log('to gerrit event');
            getEventsListByChunk(chunk).forEach( (event) => {
                if(event){
                    try{
                        json = parseJson(event);
                        that.push(json);
                    }catch(ex){
                        console.log('to-gerrit-event exception', ex);
                        console.log(json);
                    }
                }
            });
            cb();
    });
}