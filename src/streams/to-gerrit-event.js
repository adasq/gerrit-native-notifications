var through2 = require('through2');
var _ = require('underscore');
var parseJson = require('parse-json');

module.exports = function streamToObjectFn(){
    return through2.obj(function(chunk, enc, cb){
            var that = this, json = null, error = false, events = chunk.toString().split('\n');
            events = _.compact(events);
            console.log(events);
            
            events.forEach( (event) => {
                if(event){
                    try{
                        json = parseJson(event);
                        that.push(json);
                    }catch(ex){}
                }
            });
            cb();
    });
}