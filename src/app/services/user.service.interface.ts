import { ReplaySubject } from 'rxjs';
import { IGroup, User } from '../../shared/models';

export interface IUserService {
    user: User;
    user$: ReplaySubject<User>;
    getUser(id: string, timeout?: number);
    saveUserAsync(user: User);

    setName(firstName: string, lastInitial: string);
    makeHomeGroup(id: string);
}