import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user';

export interface UserServiceInterface {
    initialize();
    user: IUser;
    user$: BehaviorSubject<IUser>;
    saveUserAsync(user: IUser);
}