import { Injectable } from '@angular/core';
import { Plugins, GeolocationPosition, GeolocationOptions } from '@capacitor/core';
const { Geolocation } = Plugins;
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetingServiceInterface } from './meeting.service.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService implements MeetingServiceInterface {
  
  public meetings: Observable<any>;

  private geo: geofirex.GeoFireClient;
  distance = 20;
  early = 60;          
  late = 10;            
  field = 'point';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {}

  initialize() {
    this.geo = geofirex.init(firebase);
  }

  async updateMeetings(all?: boolean) {
    var position: GeolocationPosition = await Geolocation.getCurrentPosition();
    // const center = this.geo.point(position.coords.latitude, position.coords.longitude); 
    const center = this.geo.point(39.8249268571429, -84.8946604285714);

    let x = this.firestore.collection('meetings').doc('00b1444a-3503-4165-ad44-6ccaa3abea06').get().subscribe(doc => {
      if( doc.exists ) {
        console.log(doc.data());
      }
      else {
        console.log('does not exist');
      }
      },
      error => {
        console.log(error);
      });

    this.meetings = this.geo.query('meetings').within(center, this.distance, this.field) //, { log: true })
      .pipe(
        map(meetings => {
          const date = new Date();
          const time = date.toTimeString();
          const now = Date.parse('01/' + (date.getDay() + 1) + '/1970 ' + time.substring(0, time.indexOf(' ')) + ' UTC');
          const window = this.early * 60 * 1000; // minutes * 60s * 1000ms

          const rv = [];
          meetings.forEach(m => {
            // if ((<any>m).schedule.day === 'Monday') { debugger; }
            if (all || 
              now <= (<any>m).schedule.offset + (this.late * 60 * 1000)
              && (now >= (<any>m).schedule.offset - window)) {
              rv.push(m);
            }
          });
          return rv;
        })
      );
  }
}
