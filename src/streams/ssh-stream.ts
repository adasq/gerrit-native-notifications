import * as fs from 'fs';
import { Client } from 'ssh2';
import * as stream from 'stream';
import { config } from '../../config/config';

//read stream:
var rs = new stream.Readable();
rs._read = function () { };
function pushData(data) {
  rs.push(data);
}

rs.on('close', () => {
  console.log('rs:close');
});

rs.on('error', (err) => {
  console.log('rs:close', err)
});

const { host, port, username } = config.gerrit;

let conn;

const connectionConfig = {
  host,
  port,
  username,
  privateKey: fs.readFileSync(config.privateKey),
  passphrase: 'passphrase' in config.gerrit? config.gerrit['passphrase']: null,
  keepaliveInterval: config.keepaliveInterval || 1000
};

function initialize() {
  conn = new Client();

  conn.on('ready', function () {
    console.log('conn::ready');
    conn.exec('gerrit stream-events', function (err, stream) {
      console.log('gerrit stream-events');
      if (err) {
        console.log('gerrit stream-events error', err);
        return reConnect();
      }
      stream.on('close', () => {
        console.log('stream::close');
      });
      stream.on('error', (err) => {
        console.log('stream::error', err);
      });
      stream.on('data', (data) => {
        console.log('stream::data', data + '');
        pushData(data);
      });
    });
  });
  conn.on('close', (hadError) => {
    console.log('conn::close');
  });

  conn.on('end', () => {
    console.log('conn::end');
  });

  conn.on('error', (err) => {
    console.log('conn::error', err + '');
    conn.end();
    reConnect();
  });

  connect();
}

function connect() {
  console.log('connecting...');
  conn.connect(connectionConfig);
}

function reConnect() {
  setTimeout(connect, config.reconnectionTimeout);
}

initialize();

export function GERRIT_STREAM() {
  return rs;
}