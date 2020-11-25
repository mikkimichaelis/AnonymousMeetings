import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models';

export interface IUserService {
    initialize();
    user: IUser;
    user$: BehaviorSubject<IUser>;
    saveUserAsync(user: IUser);
}