import { SearchSettingsPage } from '../pages/groups-tab/search/search-settings/search-settings.page';
import { ISearchSettings } from './search-settings';

export interface IUserSettings {
    darkTheme: boolean;
    searchSettings: ISearchSettings;
}