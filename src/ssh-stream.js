var config = require('../config/config');
var fs = require('fs');
var Client = require('ssh2').Client;

var conn, connectionConfig = {
  host: config.gerrit.host,
  port: config.gerrit.port,
  username: config.gerrit.username,
  privateKey: fs.readFileSync(config.privateKey)
};

module.exports = function(cb){
  conn = new Client();
  conn.connect(connectionConfig);
  conn.on('ready', function() {
    conn.exec('gerrit stream-events', function(err, stream){
      cb(err, stream);
      if(!err){
        stream.on('close', function() {
          conn.end();
        });
      }
    });
  });
};