var through2 = require('through2');
var parseJson = require('parse-json');

module.exports = function streamToObjectFn(){
    return through2.obj(function(chunk, enc, cb){
            var that = this, json = null, error = false;

            var events = chunk.toString().split('\n');

            events.forEach( (event) => {
                if(event){
                    try{
                        json = parseJson(event);
                        that.push(json);
                    }catch(ex){
                    
                    }
                }
            });

            cb();
    });
}