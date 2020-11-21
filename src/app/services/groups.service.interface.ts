import { BehaviorSubject } from 'rxjs';

export interface GroupsServiceInterface {
    initialize();
    groups: BehaviorSubject<any>;
    getGroups(lat: number, lon: number, radius: number, byTime?: string, byWindow?: { early: number, late: number }, byDay?: string);
}