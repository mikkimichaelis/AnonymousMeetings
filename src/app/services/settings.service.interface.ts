import { IUserSettings } from '../models';

export interface ISettingsService {
    settings: IUserSettings;
    load();
    save();
}