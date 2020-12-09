import firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs';

export interface IAuthService {
    initialize();
    
    firebaseUi: any;
    authUser: firebase.User;
    authUser$: ReplaySubject<firebase.User>;

    isAuthenticated(): boolean;
    isAnonymous: boolean;

    createAnonymous();
    
    logout();
    getUiConfig();
}
    