import * as h from '../src/helpers';
import { IgnoreFunction } from '../src/interfaces/ignore-function';
import { PatchsetCreatedGerritEvent, CommentAddedGerritEvent, ChangeMergedGerritEvent, GerritEvent, ReviewerAddedGerritEvent } from '../src/interfaces/gerrit-event';

//ignore event, when...
export const ignoreList: IgnoreFunction[] = [
    (event: GerritEvent) => (event.type === 'change-abandoned'),

    (event: ChangeMergedGerritEvent) => (event.type === 'change-merged' && h.isNotTeamMember(event.submitter)),

    (event: GerritEvent) => (event.type === 'change-restored'),

    (event: CommentAddedGerritEvent) => (event.type === 'comment-added' && h.isNotTeamMember(event.change.owner) && h.isChangeNotTracked(event.change)), //when comment added to change, which is not owned by team member
    (event: CommentAddedGerritEvent) => (event.type === 'comment-added' && h.isGerritAdmin(event.author) && !event.approvals), //when gerrit admin add comments w/o approvals

    (event: GerritEvent) => (event.type === 'draft-published'),
    (event: GerritEvent) => (event.type === 'dropped-output'),
    (event: GerritEvent) => (event.type === 'hashtags-changed'),
    (event: GerritEvent) => (event.type === 'project-created'),
    (event: GerritEvent) => (event.type === 'merge-failed'),

    (event: PatchsetCreatedGerritEvent) => (event.type === 'patchset-created' && h.isNotTeamMember(event.uploader) && h.isChangeNotTracked(event.change)),

    (event: GerritEvent) => (event.type === 'ref-updated'),

    (event: ReviewerAddedGerritEvent) => (event.type === 'reviewer-added' && h.isNotMe(event.reviewer)),
    (event: ReviewerAddedGerritEvent) => (event.type === 'reviewer-added' && h.isTeamMember(event.change.owner)),

    (event: GerritEvent) => (event.type === 'topic-changed')
];