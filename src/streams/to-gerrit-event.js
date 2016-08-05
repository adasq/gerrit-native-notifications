var through2 = require('through2');
var _ = require('underscore');
var parseJson = require('parse-json');

function getEventsListByChunk(chunk){
    return _.compact(chunk.toString().split('\n'));
}

module.exports = function streamToObjectFn(){
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