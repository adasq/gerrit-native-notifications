const helpers = require('../src/helpers.js');

function onClick(change){
  return change.url;  
}

module.exports =  {
    'patchset-created': {
        onClick: onClick,
        text: (uploader, change, patchSet) => `
            ${change.subject}
            ${patchSet.author.name}
            created new patchSet ${patchSet.number}
            ${change.branch}
        `
    },
    'change-merged': {
        onClick: onClick,
        text: (submitter, change) => `
            ${change.subject}
            ${submitter.name} merged change
            ${change.branch}
        `
    },
    'comment-added': {
        onClick: onClick,
        text: (author, approvals, change, comment) => `
            ${change.subject}
            ${author.name}: ${approvals ? helpers.formatApprovals(approvals) : helpers.parseComment(comment)}
            ${change.branch}
        `
    },
    'reviewer-added': {
        onClick: onClick,
        text: (reviewer, change) => `
            ${change.subject}
            You have been added as reviewer
            ${change.branch}
        `        
    }
};