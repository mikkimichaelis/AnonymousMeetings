import { IUserSettings, ISearchSettings} from '../models';

export interface ISettingsService {
    settings: IUserSettings;
    load();
    save();
}