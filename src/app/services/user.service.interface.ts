import { ReplaySubject } from 'rxjs';
import { Meeting, User } from '../../shared/models';

export interface IUserService {
    
    _user: User;
    user$: ReplaySubject<User>;

    _homeMeeting: Meeting;
    homeMeeting$: ReplaySubject<Meeting>;

    getUser(id: string, timeout?: number);
    saveUserAsync(user: User);

    createChatUser(user: any): Promise<any>;
    loginChatUser(chatUser: any);

    setName(firstName: string, lastInitial: string);
    makeHomeGroup(id: string);
    makeFavGroup(id: string, make: boolean);

    unsubscribe();
}