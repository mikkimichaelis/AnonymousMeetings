import { IUserSettings } from '../classes';

export interface ISettingsService {
    settings: IUserSettings;
    load();
    save();
}