import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

export interface UserServiceInterface {
    user: any;
    user$: BehaviorSubject<any>;
    saveUserAsync(user: any);
}