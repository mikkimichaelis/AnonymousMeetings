import { ReplaySubject } from 'rxjs';

export interface AuthServiceInterface {
    authUser: firebase.User;
    isAuthenticated(): boolean;
    isAnonymous: boolean;
    firebaseUi: any;
    authStateUser: ReplaySubject<firebase.User>;
}