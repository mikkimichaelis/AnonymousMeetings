import { Observable } from 'rxjs';

export interface MeetingServiceInterface {
    initialize();
    meetings: Observable<any>;
    distance: number;
    early: number;          
    late: number;            
    field: string;

    updateMeetings(all?: boolean);
}