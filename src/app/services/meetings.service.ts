import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meeting } from '../models/meeting';
import { MeetingInterface } from '../models/meeting.interface';

import { MeetingServiceInterface } from './meeting.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService implements MeetingServiceInterface {

  public meetings: BehaviorSubject<Meeting> = new BehaviorSubject<Meeting>(<any>[]);

  private geo: geofirex.GeoFireClient;
  early = 60;
  late = 10;
  field = 'point';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  initialize() {
    this.geo = geofirex.init(firebase);
  }

  async getMeetings(lat: number, lon: number, radius: number, byTime?: string, byWindow?: { early: number, late: number }, byDay?: string) {
    //var position: GeolocationPosition = await Geolocation.getCurrentPosition();
    //const center = this.geo.point(position.coords.latitude, position.coords.longitude); 
    //const center = this.geo.point(39.8249268571429, -84.8946604285714);
    const center = this.geo.point(lat, lon);

    let query = this.geo.query('meetings').within(center, radius, this.field);

    if (byWindow) {
      query = query.pipe(
        map(meetings => {
          const date = new Date();
          const time = date.toTimeString();
          const now = Date.parse('01/' + (date.getDay() + 1) + '/1970 ' + time.substring(0, time.indexOf(' ')) + ' UTC');
          const window = byWindow.early * 60 * 1000;

          const rv = [];
          meetings.forEach(m => {
            if (
              now <= (<any>m).schedule.offset + (byWindow.late * 60 * 1000)
              && (now >= (<any>m).schedule.offset - window)) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    }

    if (byTime) {
      query = query.pipe(
        map(meetings => {
          const rv = [];
          meetings.forEach(m => {
            if ( (<any>m).schedule.time === byTime ) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    }

    if (byDay) {
      query = query.pipe(
        map(meetings => {
          const rv = [];
          meetings.forEach(m => {
            if ( (<any>m).schedule.day === byDay ) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    }

    query.subscribe(meetings => {
      this.meetings.next(<Meeting>(<any>meetings));
    });
  }
}
