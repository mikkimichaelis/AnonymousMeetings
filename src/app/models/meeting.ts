export interface IMeeting {
    gid: string;    // group id
    date: string;
    sid: string;    // secretary uid
    secretary: string;
    speaker: string;
    attendance: number;
    collection: number;
    birthdays: string[];
    firstTimers: string[];
    visitors: string[];
    topic: string;
    notes: string;
}