import { ISearchSettings } from '../models/search-settings';
import { IUserSettings } from '../models/user-settings';

export interface ISettingsService {
    settings: IUserSettings;
    load();
    save();
}