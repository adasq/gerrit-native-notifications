
const TO_GERRIT_EVENT = require('./src/streams/to-gerrit-event')();
const IGNORE_GERRIT_EVENT = require('./src/streams/ignore-gerrit-event')();
const TO_NATIVE_NOTIFICATION = require('./src/streams/to-native-notification')();
const REGISTER_REVIEWER_ADDED = require('./src/streams/register-reviewer-added')();

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


const reviewerAdded = {
   "reviewer":{  
      "name":"Adam Płócieniak",
      "email":"adam.plocieniak@pearson.com",
      "username":"adamplocieniak"
   },
   "patchSet":{  
      "number":"7",
      "revision":"bdb1a3750edf80263b4b5816850f283f856db038",
      "parents":[  
         "691e07c32e3087111fc550636cf3d18bdd3e3b71"
      ],
      "ref":"refs/changes/36/59836/7",
      "uploader":{  
         "name":"Krzysztof Jankowski",
         "email":"krzysztof.jankowski@pearson.com",
         "username":"krzysztofjankowski"
      },
      "createdOn":1499782915,
      "author":{  
         "name":"Krzysztof Jankowski",
         "email":"krzysztof.jankowski@pearson.com",
         "username":"krzysztofjankowski"
      },
      "isDraft":false,
      "kind":"REWORK",
      "sizeInsertions":37,
      "sizeDeletions":-136
   },
   "change":{  
      "project":"newngmel",
      "branch":"develop",
      "id":"I72a97ca645b865338eaab8b0e81eb7f4667764b1",
      "number":"59836",
      "subject":"ELTCD-9520 Extend support for multiple model answers",
      "owner":{  
         "name":"Krzysztof Jankowski",
         "email":"krzysztof.jankowski@pearson.com",
         "username":"krzysztofjankowski"
      },
      "url":"http://gerrit.ioki.com.pl/59836",
      "commitMessage":"ELTCD-9520 Extend support for multiple model answers\n\nChange-Id: I72a97ca645b865338eaab8b0e81eb7f4667764b1\n",
      "status":"NEW"
   },
   "type":"reviewer-added",
   "eventCreatedOn":1499847345
}

initialize();
simulateSSHStream(JSON.stringify(reviewerAdded));
// setTimeout(() => {
//   simulateSSHStream(JSON.stringify(eventObj));
// }, 200)

function initialize(){
  GERRIT_STREAM
  .pipe(TO_GERRIT_EVENT, { end: false })
  .pipe(REGISTER_REVIEWER_ADDED, { end: false })
  .pipe(TO_NATIVE_NOTIFICATION, { end: false });
}

function simulateSSHStream(data){
  GERRIT_STREAM.push(data);
}
