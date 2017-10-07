import { GerritEvent } from './gerrit-event';

export interface IgnoreFunction {
    (event: GerritEvent): boolean;
}