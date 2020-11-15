import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

export interface UserServiceInterface {
    user$: BehaviorSubject<User>;
    saveUserAsync();
}