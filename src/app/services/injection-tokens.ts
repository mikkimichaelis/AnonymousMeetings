import { InjectionToken } from '@angular/core';

export const ANGULAR_FIRESTORE = new InjectionToken<string>('AngularFirestore');
export const ANGULAR_FIRE_AUTH = new InjectionToken<string>('AngularFireAuth');
export const FIRESTORE_SERVICE = new InjectionToken<string>('FirestoreService');
export const ANGULAR_FIRE_FUNCTIONS = new InjectionToken<string>('AngularFireFunctions');
export const TRANSLATE_SERVICE = new InjectionToken<string>('TranslateService');

export const AUTH_SERVICE = new InjectionToken<string>('AuthService');
export const GROUP_SERVICE = new InjectionToken<string>('GroupService');
export const GROUPS_SERVICE = new InjectionToken<string>('GroupsService');
export const USER_SERVICE = new InjectionToken<string>('UserService');

export const INITIALIZE_SERVICE = new InjectionToken<string>('InitializeService');
export const BUSY_SERVICE = new InjectionToken<string>('BusyService');
export const TOAST_SERVICE = new InjectionToken<string>('ToastService');
export const LOCATION_SERVICE = new InjectionToken<string>('LocationService');
export const LOG_SERVICE = new InjectionToken<string>('LogService');
export const SETTINGS_SERVICE = new InjectionToken<string>('SettingsService');
