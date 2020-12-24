import { CometChat } from '@cometchat-pro/chat';
import { ReplaySubject } from 'rxjs';
import { User } from '../../shared/models';

export interface IUserService {
    
    chatUser: CometChat.User;
    user: User;
    user$: ReplaySubject<User>;
    getUser(id: string, timeout?: number);
    saveUserAsync(user: User);

    createChatUser(user: any): Promise<CometChat.User>;
    loginChatUser(chatUser: CometChat.User);

    setName(firstName: string, lastInitial: string);
    makeHomeGroup(id: string);
    makeFavGroup(id: string, make: boolean);
}