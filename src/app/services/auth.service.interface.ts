import { Platform } from '@ionic/angular';
import firebase from 'firebase/app';
import { ReplaySubject, Subject } from 'rxjs';

export interface IAuthService {
    
    auth: firebase.auth.Auth;
    authUser: firebase.User;
    authUser$: ReplaySubject<firebase.User>;
    logout$: Subject<boolean>;
    
    isAuthenticated: boolean;

    initialize();
    createAnonymous();
    logout();
    getUiConfig(platform: Platform): any;
}
    