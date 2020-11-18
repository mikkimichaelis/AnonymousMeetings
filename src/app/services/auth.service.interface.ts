import { ReplaySubject } from 'rxjs';

export interface AuthServiceInterface {
    initialize();
    
    firebaseUi: any;
    authUser: firebase.User;
    authUser$: ReplaySubject<firebase.User>;

    isAuthenticated(): boolean;
    isAnonymous: boolean;
}
    