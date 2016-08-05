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

The `config` dir is a place where you can configure the application

- Fill the `config.js` file with your configuration. You can copy template file update it.

```
$ cp config/config.js.dist config/config.js
$ vi config/config.js
```
- `events.js` lets you format notification message as well as interactive behaviour, such as click action.
Consider following entry:
```js
    'patchset-created': {
        onClick: (change) => change.url,
        text: (change, patchSet) => `
            ${change.subject}
            New patchSet ${patchSet.number}
            ${patchSet.author.name} - ${change.branch}
        `
    },

```

We have notification description for `patchset-created` action. 
Using `text` we are able to format our notification text. It's simple function, which uses Dependency Injection to pass event related properties for futher formatting. Here we have `change` and `patchSet` which are `patchset-created` event specific fields, but you can pass more fields here. For full parameter list see ['patchset creaded' event documentation](https://gerrit-review.googlesource.com/Documentation/cmd-stream-events.html#_patchset_created)

- `ignore.js` lets you decide, which events are important for you and will be displayed. The file contains list of functions. When we receive event, we will call each function. If any returns `true`, the passed event will be ignored and will not be displayed as notification. Consider function:

```js
  (event) => (event.type === 'ref-updated'),
```
Whenever we receive event, with type `ref-updated`, we will ignore it.
## Run

```
$ npm start
```

## Test your gerrit events stream via CLI
```
$ ssh -p 29418 your-username@gerrit-host gerrit stream-events
```