var through2 = require('through2');
var fs = require('fs');

module.exports = function(){
    return fs.createWriteStream('./stream', {flags: 'a'});
};