import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { IGroup, IMeeting, Meeting } from 'src/shared/models';

export interface IMeetingService {
    initialize();
    
    ownedMeetings$: ReplaySubject<Meeting[]>;
    favoriteMeetings$: ReplaySubject<Meeting[]>;
    liveMeetings$: ReplaySubject<Meeting[]>;
    searchMeetings$: ReplaySubject<Meeting[]>;

    ownedMeetingsValueChanges();
    favoriteMeetingsValueChanges();
    liveMeetingsValueChanges();

    add(meeting: IMeeting): Promise<boolean>;
    update(meeting: IMeeting): Promise<boolean>;
}