import { ReplaySubject } from 'rxjs';
import { IGroup, IHomeGroup, IUser } from '../../models';

export interface IUserService {
    user: IUser;
    user$: ReplaySubject<IUser>;
    getUser(id: string, timeout?: number);
    saveUserAsync(user: IUser);

    setName(firstName: string, lastInitial: string);
    makeHomeGroup(user: IUser, group: IGroup);
}