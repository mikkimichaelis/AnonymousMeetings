import { Subject } from 'rxjs';
import { Group } from 'src/shared/models';

export interface IGroupService {
    initialize();

    id: string;
    group$: Subject<Group>
    group: Group;
    
    getGroupAsync(id: string): Promise<Group>;
}