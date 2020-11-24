import { IPoint } from './point';

export interface IMeeting {
    gid: string;    // group id
    sid: string;    // schedule
    date: string;
    uid: string;    // secretary uid
    secretary: string;
    speaker: string;
    attendance: number;
    collection: number;
    birthdays: string[];
    firstTimers: string[];
    visitors: string[];
    topic: string;
    notes: string;
    point: IPoint;
}