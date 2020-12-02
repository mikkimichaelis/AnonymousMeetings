import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IUser } from '../../models';

export interface IUserService {
    user: IUser;
    user$: ReplaySubject<IUser>;
    getUser(authId: string, timeout?: number);
    saveUserAsync(user: IUser);
}