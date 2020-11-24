import { BehaviorSubject } from 'rxjs';
import { IGroup } from '../models/group';
import { ISchedule } from '../models/schedule';
import { ISearchSettings } from '../models/search-settings';



export interface IGroupService {
    initialize();

    id: string;
    group$: BehaviorSubject<IGroup>;
    group: IGroup;
    schedule$: BehaviorSubject<ISchedule>;
    schedule: ISchedule;
    
    getGroup(id: string);
}