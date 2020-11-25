import { BehaviorSubject } from 'rxjs';

export interface IAuthService {
    initialize();
    
    firebaseUi: any;
    authUser: firebase.User;
    authUser$: BehaviorSubject<firebase.User>;

    isAuthenticated(): boolean;
    isAnonymous: boolean;
}
    