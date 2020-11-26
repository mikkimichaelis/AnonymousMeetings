import { IRideRequest, IUserAdmin, IPoint, IUserAttend, IUserStub } from '.';

export interface IZoomMeeting extends IMeeting {
    zid: string;
    zUsersAttend: string[]; // Zoom users in attendance
}

export interface IMeeting {
    gid: string;        // group id
    sid: string;        // schedule
    aid: IUserAdmin;    // secretary uid
    point: IPoint;
    start: string;
    end: string;
    secretary: string;
    speaker: string;
    collection: number;
    attendance: number;
    usersAttend: IUserStub[];
    birthdays: string[];
    firstTimers: string[];
    visitors: string[];
    topic: string;
    notes: string;
    rideRequests: IRideRequest[]
}