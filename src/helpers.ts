import { config } from '../config/config';
import * as _ from 'underscore';
import { GerritAccount, GerritChange, GerritApproval } from './interfaces/gerrit-event';

const JENKINS_FAILED_BUILD_REGEXP = config.jenkins+'(.+)\\s:\\sFAILURE';
const trackedChanges = {};

export function isChangeTracked(change: GerritChange) {
    return trackedChanges[change.id] === true;
}

export function isChangeNotTracked(change: GerritChange) {
    return !isChangeTracked(change);
}

export function trackChange(change: GerritChange) {
    trackedChanges[change.id] = true;
}

export function isTeamMember(account: GerritAccount){
    return config.team.indexOf(account.email) > -1;
}

export function isNotTeamMember(account: GerritAccount){
    return !isTeamMember(account);
}

export function isGerritAdmin(account: GerritAccount){
    return account.name === 'Gerrit Admin';
}

export function isProjectAllowed(change: GerritChange){
    return config.projects.indexOf(change.project) > -1;
}

export function isProjectNotAllowed(change: GerritChange){
    return !isProjectAllowed(change);
}

export function isMe(account: GerritAccount){
    return account.email === config.me;
}

export function isNotMe(account: GerritAccount){
    return !isMe(account);
}
//----------------------------------
export function parseComment(comment: string) {
    comment = (comment || '');
    comment = comment.replace(/\n+/g, ' ');
    comment = comment.replace(/Patch Set \d+:/, '');
    comment = comment.trim();
    return comment;
}

export function formatApprovals(approvals: GerritApproval[]) {
    if(approvals){
        return approvals.map((approval) => {
            var value = (+approval.value > 0) ? ('+'+approval.value) : approval.value;
            return approval.description + value;
        }).join(', ');
    }else{
        return '';
    }
}

export function generateFailedBuildJenkinsUrl(comment: string) {
    if(comment && config.jenkins){
        let result = comment.match(new RegExp(JENKINS_FAILED_BUILD_REGEXP));
        if(result && result[1]){
            return [config.jenkins, result[1]].join('');
        }
    }
}
