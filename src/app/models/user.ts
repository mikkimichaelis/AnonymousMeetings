import { IPoint } from '.';

export interface IUserStub {
    uid: string;
    name: string;
    lastActivity: string;
}

export interface IUser  extends IUserStub {
    anonymous: boolean;
    firstName: string;
    lastInitial: string;
    bday: string;
    homeGroup: {
        id: string;
        name: string;
        dateJoined: string;
    }
    favGroups: IUserFavorite[];
    attendance: IUserAttend [];
    friends: IUserFriend[];
}

export interface IUserFriend extends IUserStub {
    fid: string;
    requested: string;
    accepted: string;
}

export interface IUserAdmin extends IUserStub {
    gid: string;
    aid: string;
    role: string;
    perms: string [];
}

export interface IUserFavorite {
    uid: string;        // user id
    gid: string;        // group id
    sid: string;        // schedule id
    name: string;
    active: boolean;
}

export interface IUserBlock {
    uid: string;    // blocker user id
    buid: string;   // blocked user id
    reason: string; // for reporting abusive users
    date: string;  
}

export interface IUserAttend {
    uid: string;
    meeting: {
        mid: string;
        start: string;
        pointStart: IPoint;
        end: string;
        pointEnd: IPoint;
    }
    zoom: {
        mid: string;
        zoomUser: string;
        start: string;
        ipStart: string;
        end: string;
        ipEnd: string;
    }
}



