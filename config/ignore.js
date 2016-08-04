const h = require('../src/helpers.js');

//ignore activity, when...
module.exports = [
     (event) => (event.type === 'change-abandoned'),

     (event) => (event.type === 'change-merged' && h.isNotTeamMember(event.submitter)),

     (event) => (event.type === 'change-restored'),

     (event) => (event.type === 'comment-added' && h.isNotTeamMember(event.change.owner)), //when comment added to change, which is not owned by team member
     (event) => (event.type === 'comment-added' && h.isGerritAdmin(event.author) && !event.approvals), //when gerrit admin add comments w/o approvals

     (event) => (event.type === 'draft-published'),
     (event) => (event.type === 'dropped-output'),
     (event) => (event.type === 'hashtags-changed'),
     (event) => (event.type === 'project-created'),
     (event) => (event.type === 'merge-failed'),

     (event) => (event.type === 'patchset-created' && h.isNotTeamMember(event.uploader) ),

     (event) => (event.type === 'ref-updated'),
     
     (event) => (event.type === 'reviewer-added' && h.isNotMe(event.reviewer) ),
     (event) => (event.type === 'reviewer-added' && h.isTeamMember(event.change.owner) ),

     (event) => (event.type === 'topic-changed')
];