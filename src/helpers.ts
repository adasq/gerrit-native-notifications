import { config } from '../config/config';
import * as _ from 'underscore';

const JENKINS_FAILED_BUILD_REGEXP = config.jenkins+'(.+)\\s:\\sFAILURE';
const trackedChanges = {};

export function isChangeTracked(change) {
    return trackedChanges[change.id] === true;
}

export function isChangeNotTracked(change) {
    return !isChangeTracked(change);
}

export function trackChange(change) {
    trackedChanges[change.id] = true;
}

export function isTeamMember(account){
    return config.team.indexOf(account.email) > -1;
}

export function isNotTeamMember(account){
    return !isTeamMember(account);
}

export function isGerritAdmin(account){
    return account.name === 'Gerrit Admin';
}

export function isProjectAllowed(change){
    return config.projects.indexOf(change.project) > -1;
}

export function isProjectNotAllowed(change){
    return !isProjectAllowed(change);
}

export function isMe(account){
    return account.email === config.me;
}

export function isNotMe(account){
    return !isMe(account);
}
//----------------------------------
export function parseComment(comment) {
    comment = (comment || '');
    comment = comment.replace(/\n+/g, ' ');
    comment = comment.replace(/Patch Set \d+:/, '');
    comment = comment.trim();
    return comment;
}

export function formatApprovals(approvals) {
    if(approvals){
        return approvals.map((approval) => {
            var value = (+approval.value > 0) ? ('+'+approval.value) : approval.value;
            return approval.description + value;
        }).join(', ');
    }else{
        return '';
    }
}

export function generateFailedBuildJenkinsUrl(comment) {
    if(comment && config.jenkins){
        let result = comment.match(new RegExp(JENKINS_FAILED_BUILD_REGEXP));
        if(result && result[1]){
            return [config.jenkins, result[1]].join('');
        }
    }
}
