import { Subject } from 'rxjs';
import { Group } from 'src/shared/models';

export interface IGroupService {
    initialize();

    group$: Subject<Group>
    group: Group;
    
    getGroupAsync(id: string): Promise<Group>;
}