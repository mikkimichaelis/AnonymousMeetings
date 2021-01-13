import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IGroup, IMeeting, Meeting } from 'src/shared/models';

export interface IMeetingService {
    initialize();
    meetings$: ReplaySubject<Meeting[]>;
    meetings: IGroup[];
    // ßverbose: string;
    getMeetingsAsync(search: any): Promise<IMeeting[]>;

    add(meeting: IMeeting);
}