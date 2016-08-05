# gerrit-native-notifications

It lets you see gerrit messages as your native OS notifications.

## How it works?

**gerrit-native-notifications** subscribes for 
[gerrit events](https://gerrit-review.googlesource.com/Documentation/cmd-stream-events.html) 
stream via SSH 
([ssh2](https://github.com/mscdex/ssh2)) 
and displays it as OS native notifiaction, using 
[node-notifier](https://github.com/mikaelbr/node-notifier/).

## Requirements

- Access to Gerrit via SSH. [Read official documentation](https://gerrit-review.googlesource.com/Documentation/cmd-stream-events.html#_access) for more info.

## Installation

```
$ npm install
```

## Configuration

Copy template file and change it.

```
$ cp config/config.js.dist config/config.js
$ vi config/config.js
```

## Run

```
$ npm start
```

## Test your gerrit events stream via CLI
```
$ ssh -p 29418 your-username@gerrit-host gerrit stream-events
```