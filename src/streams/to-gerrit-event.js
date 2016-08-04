var through2 = require('through2');
var _ = require('underscore');
var parseJson = require('parse-json');

module.exports = function streamToObjectFn(){
    return through2.obj(function(chunk, enc, cb){
            
            var that = this, json = null, error = false, events;
            try{
                events = _.compact(chunk.toString().split('\n'));

                console.log('to gerrit event', events.length);
                events.forEach( (event) => {
                    if(event){
                        json = parseJson(event);
                        try{
                            that.push(json);
                        }catch(ex){
                            console.log('ERR3', ex);
                            console.log(json);
                        }
                    }
                });
                cb();
            }catch(ex){
                console.log('ERR', ex);
            }
            
    });
}