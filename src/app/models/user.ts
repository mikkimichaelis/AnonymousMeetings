import { IAttend } from './attend';
import { IGroupFavorite } from './group-favorite';
import { IUserFriend } from './user-friend';

export interface IUser {
    anonymous: boolean;
    firstName: string;
    lastInitial: string;
    name: string;
    bday: string;
    homeGroupId: string;
    favGroups: IGroupFavorite[];
    attendance: IAttend [];
    lastActivity: string;   //  Date
    friends: IUserFriend[];
}



