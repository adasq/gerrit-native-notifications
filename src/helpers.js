const config = require('../config/config');
const _ = require('underscore');

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
    return (comment || '').replace(/\\n/, '').trim();
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

module.exports = {
    isTeamMember,
    isNotTeamMember,
    isGerritAdmin,
    isProjectAllowed,
    isProjectNotAllowed,
    isMe,
    isNotMe,

    parseComment,
    formatApprovals
};