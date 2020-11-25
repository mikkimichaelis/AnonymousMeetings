import { Injectable, InjectionToken } from '@angular/core';

import * as luxon from 'luxon';

import { IGroup, ISchedule } from '../models';
import { IGroupBLLService } from './';

@Injectable({
  providedIn: 'root'
})
export class GroupBLLService implements IGroupBLLService {

  constructor() {}

  public getNextScheduledMeeting(group: IGroup): ISchedule {
    let week = 7 * 24 * 60 * 1000;  // 1 week in ms
    let now: any = luxon.DateTime.local();
    now = luxon.DateTime.fromObject( { year: 1970, month: 1, day: now.weekday, hour: now.hour, minute: now.min, second: now.second});
    now = now.toMillis();
    let schedule: ISchedule;
    group.schedule.forEach(s => {
      // ignore if not active
      if (s.active) {
        if (!schedule) {
          // special handle first schedule
          if( s.offset < now ) {
            // s happens next week if recurring otherwise ignore
            schedule = s.recurring ? s : null;
          } else {
            // s happens this week
            schedule = s;
          }
        } else if (s.offset > now) {
          // s happens this week
          schedule = s.offset < schedule.offset ? s : schedule; // s comes before schedule
        } else if (s.recurring) {
          // s happens next week
          if( schedule.offset < now ) { // schedule also happens next week
            schedule = s.offset < schedule.offset ? s : schedule; // s comes before schedule next week
          } else {
            // schedule happens this week so keep it
            // schedule = schedule;
          }
        }
      }
    });
    return schedule;
  }
}
