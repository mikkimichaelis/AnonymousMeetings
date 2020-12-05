import { Subject } from 'rxjs';
import { IGroup, ISchedule } from '../../models';

export interface IGroupService {
    initialize();

    id: string;
    group$: Subject<IGroup>
    group: IGroup;
    
    getGroupAsync(id: string): Promise<IGroup>;
}