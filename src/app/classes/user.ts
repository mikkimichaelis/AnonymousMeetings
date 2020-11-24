import { Base } from './base';
import { IAttend } from '../models/attend';
import { IUser } from '../models/user';
import { IMessage } from '../models/message';
import { IGroupFavorite } from '../models/group-favorite';
import { IUserFriend } from '../models/user-friend';

export class User extends Base implements IUser  {
    anonymous: boolean = true;
    firstName: string = '';
    lastInitial: string = '';
    name: string = '';
    bday: string = '';
    homeGroupId: string = '';
    favGroups: IGroupFavorite[] = [];
    attendance: IAttend[] = [];
    lastActivity: string = '';
    friends: IUserFriend[];
    messages: IMessage[]

    constructor(userRecord: any) {
        super();
        this.anonymous = userRecord.isAnonymous;
        this.lastActivity = new Date().toUTCString();
        this.setNames(userRecord.displayName, userRecord.isAnonymous);
    }
    
    setNames(name: string, anonymous: boolean) {
        if (anonymous
            || !name
            || !name.includes(' ')
            || name.length < 3
            || name.split(' ').length < 2) {
                this.firstName = 'ANONYMOUS';
                this.lastInitial = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        } else {
            let names = name.split(' ');
            this.firstName = names[0];
            this.lastInitial = names[1][0].toUpperCase();
        }
        this.name = `${this.firstName} ${this.lastInitial}.`;
    }
}