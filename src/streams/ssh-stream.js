var stream = require('stream');
var config = require('../../config/config');
var childProcess = require( 'child_process' );

function gerritProcess( host, port ) {
  return childProcess.spawn( 'ssh',
    [
      '-p ' + ( port || 29418 )
    , host
    , 'gerrit'
    , 'stream-events'
    ]
  );
}

module.exports = function(){
  return gerritProcess(config.gerrit.host, config.gerrit.port);
};