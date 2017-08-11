import * as helpers from '../src/helpers';
import { config } from './config';

export const events = {
    'patchset-created': {
        getUrl,
        getAuthorIcon,
        text: (change, patchSet, uploader) => `
            ${change.subject}
            New patchSet ${patchSet.number}
            ${uploader.name} - ${change.branch}
        `
    },
    'change-merged': {
        getUrl,
        getAuthorIcon,
        text: (submitter, change) => `
            ${change.subject}
            Change merged
            ${submitter.name} - ${change.branch}
        `
    },
    'comment-added': {
        getUrl: getUrlCommentAdded,
        getAuthorIcon,
        text: (author, change, comment, patchSet) => `
            ${change.subject}
            ${helpers.parseComment(comment)}
            ${author.name} - patchSet ${patchSet.number} - ${change.branch}
        `
    },
    'reviewer-added': {
        getUrl,
        getAuthorIcon,
        text: (change) => `
            ${change.subject}
            You have been added as reviewer
            ${change.branch}
        `
    }
};

function getUrl(change){
  return change.url;  
}

function getAuthorIcon(author, submitter, uploader, patchSet) {
    const authorObj = author || submitter || uploader || (patchSet && patchSet.uploader);
    const iconFileName = authorObj && config.icon[authorObj.email];
    return iconFileName || null;
}

function getUrlCommentAdded(comment, change){
    let failedBuildJenkinsUrl = helpers.generateFailedBuildJenkinsUrl(comment);
    return failedBuildJenkinsUrl || change.url;
}