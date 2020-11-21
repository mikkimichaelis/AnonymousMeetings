import { IAttend } from './attend';
import { IFavGroup } from './group';

export interface IUser {
    anonymous: boolean;
    firstName: string;
    lastInitial: string;
    name: string;
    bday: string;
    homeGroupId: string;
    favGroups: IFavGroup[];
    attendance: IAttend [];
    lastActivity: string;   //  Date
    friends: IFriendUser[];
}

export interface IFriendUser {
    uid: string;
    name: string;
    lastActivity: string;
}

export interface IMemberUser {
    uid: string;
    name: string;
    lastActivity: string;
}