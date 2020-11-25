import { InjectionToken } from '@angular/core';

export const ANGULAR_FIRE_AUTH = new InjectionToken<string>('AngularFireAuth');

export const AUTH_BLL_SERVICE = new InjectionToken<string>('AuthBLLService');
export const AUTH_SERVICE = new InjectionToken<string>('AuthService');

export const GROUP_BLL_SERVICE = new InjectionToken<string>('GroupBLLService');
export const GROUP_SERVICE = new InjectionToken<string>('GroupService');

export const GROUPS_BLL_SERVICE = new InjectionToken<string>('GroupsBLLService');
export const GROUPS_SERVICE = new InjectionToken<string>('GroupsService');

export const INITIALIZE_SERVICE = new InjectionToken<string>('InitializeService');
export const LOADING_SERVICE = new InjectionToken<string>('LoadingService');
export const LOCATION_SERVICE = new InjectionToken<string>('LocationService');
export const LOG_SERVICE = new InjectionToken<string>('LogService');
export const SETTINGS_SERVICE = new InjectionToken<string>('SettingsService');

export const USER_BLL_SERVICE = new InjectionToken<string>('UserBLLService');
export const USER_SERVICE = new InjectionToken<string>('UserService');
