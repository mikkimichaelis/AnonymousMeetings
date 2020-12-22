import { IUserSettings } from '../models';

export interface ISettingsService {
    settings: IUserSettings;
    environment: any;
    cometChat: any;
    googleCloud: any;
    logRocket: any;
    initialize(auth: boolean);
    load();
    save();
}