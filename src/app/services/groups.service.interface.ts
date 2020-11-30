import { BehaviorSubject } from 'rxjs';
import { ISearchSettings } from '../models';

export interface IGroupsService {
    initialize();
    groups: BehaviorSubject<any>;
    verbose: string;
    getGroups(search: ISearchSettings);
}