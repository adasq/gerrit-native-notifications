var through2 = require('through2');
var communicationManager = require('../communication-manager');

module.exports = function(){
    return through2.obj(function(message, enc, cb){
            var result = communicationManager.send(message);
    		console.log('sending to chrome...', result);
            cb(false, message);
    });
};
