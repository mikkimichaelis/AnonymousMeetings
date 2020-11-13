import { ReplaySubject } from 'rxjs';
import { User } from '../models/user';

export interface UserServiceInterface {
    User: ReplaySubject<User>;
    saveUser();
}