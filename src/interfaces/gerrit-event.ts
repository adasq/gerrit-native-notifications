export type GerritEvent = GeneralGerritEvent | PatchsetCreatedGerritEvent | CommentAddedGerritEvent | ChangeMergedGerritEvent;

export interface GeneralGerritEvent {
    type: string;
}

export interface GerritChange {
    owner: GerritAccount;
    id: number;
    project: string;
}

export interface GerritAccount {
    name: string;
    email: string;
    username: string;
}

export interface GerritPatchSet {
    number: string;
}

export interface GerritApproval {
    type: string;
    description: string;
    value: number;
    oldValue: number;
    grantedOn: number;
    by: GerritAccount
}

export interface PatchsetCreatedGerritEvent extends GeneralGerritEvent {
    change: GerritChange;
    uploader: GerritAccount;
}

export interface CommentAddedGerritEvent extends GeneralGerritEvent {
    change: GerritChange;
    patchSet: GerritPatchSet;
    author: GerritAccount;
    approvals: GerritApproval[]
    comment: string;
}

export interface ChangeMergedGerritEvent extends GeneralGerritEvent {
    change: GerritChange;
    patchSet: GerritPatchSet;
    submitter: GerritAccount;
}

export interface ReviewerAddedGerritEvent extends GeneralGerritEvent {
    change: GerritChange;
    patchSet: GerritPatchSet;
    reviewer: GerritAccount;
}