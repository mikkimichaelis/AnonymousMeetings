import { ReplaySubject } from 'rxjs';
import { User } from '../../shared/models';

export interface IUserService {
    
    chatUser: any; // CometChat.User;
    user: User;
    user$: ReplaySubject<User>;
    getUser(id: string, timeout?: number);
    saveUserAsync(user: User);

    createChatUser(user: any): Promise<any>;
    loginChatUser(chatUser: any);

    setName(firstName: string, lastInitial: string);
    makeHomeGroup(id: string);
    makeFavGroup(id: string, make: boolean);
}