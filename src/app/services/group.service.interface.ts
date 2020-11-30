import { BehaviorSubject } from 'rxjs';
import { IGroup, ISchedule } from '../../models';

export interface IGroupService {
    initialize();

    id: string;
    group$: BehaviorSubject<IGroup>;
    group: IGroup;
    schedule$: BehaviorSubject<ISchedule>;
    schedule: ISchedule;
    
    getGroup(id: string);
}