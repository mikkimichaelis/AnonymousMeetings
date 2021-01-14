import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IGroup, IMeeting, Meeting } from 'src/shared/models';

export interface IMeetingService {
    initialize();
    ownedMeetings$: ReplaySubject<Meeting[]>;
    meetings: IMeeting[];
    ownedMeetingsValueChanges();
    favoriteMeetingsValueChanges();

    add(meeting: IMeeting);
}