
const TO_GERRIT_EVENT = require('./src/streams/to-gerrit-event')();
const IGNORE_GERRIT_EVENT = require('./src/streams/ignore-gerrit-event')();
const TO_NATIVE_NOTIFICATION = require('./src/streams/to-native-notification')();

const Readable = require('stream').Readable;
const GERRIT_STREAM = Readable();
GERRIT_STREAM._read = function () {};


const eventObj = {
   "author":{  
      "name":"John Smith",
      "email":"john.smith@domain.com",
      "username":"johnsmith"
   },
   "approvals":[  
      {  
         "type":"Code-Review",
         "description":"Code-Review",
         "value":"1"
      }
   ],
   "comment":"Patch Set 4: Code-Review+1\n\n(2 comments)",
   "patchSet":{  
      "number":"4",
      "revision":"ec761b239a75704ac9fd882b8af80fb4f7eac48f",
      "parents":[  
         "a6d9bdb1e798a29bda0946ce5ec5ad5f203e4244"
      ],
      "ref":"refs/changes/82/50282/1",
      "uploader":{  
	      "name":"John Smith",
	      "email":"john.smith@domain.com",
	      "username":"johnsmith"
	   },
      "createdOn":1470046664,
      "author":{  
	      "name":"John Smith",
	      "email":"john.smith@domain.com",
	      "username":"johnsmith"
	   },
      "isDraft":false,
      "kind":"REWORK",
      "sizeInsertions":297,
      "sizeDeletions":-309
   },
   "change":{  
      "project":"newngmel",
      "branch":"master",
      "id":"Iec761b239a75704ac9fd882b8af80fb4f7eac48f",
      "number":"50282",
      "subject":"Fix authentication module unit tests",
      "owner":{  
	      "name":"John Smith",
	      "email":"john.smith@domain.com",
	      "username":"johnsmith"
	   },
      "url":"http://gerrit.domain.com/50282",
      "commitMessage":"Fix authentication module unit tests\n",
      "status":"NEW"
   },
   "type":"comment-added",
   "eventCreatedOn":1470051339
};

initialize();
simulateSSHStream(JSON.stringify(eventObj));

function initialize(){
  GERRIT_STREAM
  .pipe(TO_GERRIT_EVENT, { end: false })
  .pipe(TO_NATIVE_NOTIFICATION, { end: false });
}

function simulateSSHStream(data){
  GERRIT_STREAM.push(data);
}
