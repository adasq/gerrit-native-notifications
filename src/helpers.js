const config = require('../config/config');
const _ = require('underscore');

const JENKINS_FAILED_BUILD_REGEXP = config.jenkins+'(.+)\\s:\\sFAILURE';


function isTeamMember(account){
    return config.team.indexOf(account.email) > -1;
}

function isNotTeamMember(account){
    return !isTeamMember(account);
}

function isGerritAdmin(account){
    return account.name === 'Gerrit Admin';
}

function isProjectAllowed(change){
    return config.projects.indexOf(change.project) > -1;
}

function isProjectNotAllowed(change){
    return !isProjectAllowed(change);
}

function isMe(account){
    return account.email === config.me;
}

function isNotMe(account){
    return !isMe(account);
}
//----------------------------------
function parseComment(comment){
    comment = (comment || '');
    comment = comment.replace(/\n+/g, ' ');
    comment = comment.replace(/Patch Set \d+:/, '');
    comment = comment.trim();
    return comment;
}

function formatApprovals(approvals){
    if(approvals){
        return approvals.map((approval) => {
            var value = (+approval.value > 0) ? ('+'+approval.value) : approval.value;
            return approval.description + value;
        }).join(', ');
    }else{
        return '';
    }
}

function generateFailedBuildJenkinsUrl(comment){
    if(comment && config.jenkins){
        let result = comment.match(new RegExp(JENKINS_FAILED_BUILD_REGEXP));
        if(result && result[1]){
            return [config.jenkins, result[1]].join('');
        }
    }
}

module.exports = {
    isTeamMember,
    isNotTeamMember,
    isGerritAdmin,
    isProjectAllowed,
    isProjectNotAllowed,
    isMe,
    isNotMe,

    parseComment,
    formatApprovals,

    generateFailedBuildJenkinsUrl
};