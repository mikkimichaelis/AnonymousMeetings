import { BehaviorSubject } from 'rxjs';

export interface MeetingServiceInterface {
    initialize();
    meetings: BehaviorSubject<any>;
    getMeetings(lat: number, lon: number, radius: number, byTime?: string, byWindow?: { early: number, late: number }, byDay?: string);
}