import { BehaviorSubject } from 'rxjs';
import { ISearchSettings } from '../models/search-settings';

export interface IGroupsService {
    initialize();
    groups: BehaviorSubject<any>;
    getGroups(search: ISearchSettings);
}