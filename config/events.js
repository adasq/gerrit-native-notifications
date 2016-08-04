const helpers = require('../src/helpers.js');

function onClick(change){
  return change.url;  
}

function onClickCommentAdded(comment, change){
    let failedBuildJenkinsUrl = helpers.generateFailedBuildJenkinsUrl(comment);
    return failedBuildJenkinsUrl || change.url;
}

module.exports =  {
    'patchset-created': {
        onClick,
        text: (uploader, change, patchSet) => `
            ${change.subject}
            New patchSet ${patchSet.number}
            ${patchSet.author.name} - ${change.branch}
        `
    },
    'change-merged': {
        onClick,
        text: (submitter, change) => `
            ${change.subject}
            Change merged
            ${submitter.name} - ${change.branch}
        `
    },
    'comment-added': {
        onClick: onClickCommentAdded,
        text: (author, approvals, change, comment, patchSet) => `
            ${change.subject}
            ${helpers.parseComment(comment)}
            ${author.name} - patchSet ${patchSet.number} - ${change.branch}
        `
    },
    'reviewer-added': {
        onClick,
        text: (reviewer, change) => `
            ${change.subject}
            You have been added as reviewer
            ${change.branch}
        `        
    }
};