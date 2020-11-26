import { BehaviorSubject } from 'rxjs';
import { ISearchSettings } from '../classes';

export interface IGroupsService {
    initialize();
    groups: BehaviorSubject<any>;
    verbose: string;
    getGroups(search: ISearchSettings);
}