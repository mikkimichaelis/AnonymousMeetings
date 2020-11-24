import { BehaviorSubject } from 'rxjs';
import { Group } from '../models/group';
import { ISearchSettings } from '../models/search-settings';

export interface IGroupService {
    initialize();
    group: BehaviorSubject<Group>;
    id: string;
    getGroup(id: string);
}