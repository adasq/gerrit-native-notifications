var through2 = require('through2');
var ignore = require('../ignore');

module.exports = function(){
    return through2.obj(function(event, enc, cb){
    		console.log('ignore-gerrit-event');
            if( ignore.isIgnored(event) ){
            	console.log('ignored...');
                cb(false);
            }else{
                cb(false, event);
            }
    });
};
