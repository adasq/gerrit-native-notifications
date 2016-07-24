var through2 = require('through2');
var ignore = require('../ignore');

module.exports = function(){
    return through2.obj(function(event, enc, cb){
            if( ignore.isIgnored(event) ){
                cb(false);
            }else{
                cb(false, event);
            }
    });
};
