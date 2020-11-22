import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../models/group';
import { ISearchSettings } from '../models/search-settings';

import { IGroupsService } from './groups.service.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements IGroupsService {

  public groups: BehaviorSubject<Group> = new BehaviorSubject<Group>(<any>[]);

  private geo: geofirex.GeoFireClient;
  field = 'point';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  initialize() {
    this.geo = geofirex.init(firebase);
  }

  async getGroups(search: ISearchSettings) {
    //var position: GeolocationPosition = await Geolocation.getCurrentPosition();
    //const center = this.geo.point(position.coords.latitude, position.coords.longitude); 
    //const center = this.geo.point(39.8249268571429, -84.8946604285714);
    const center = this.geo.point(search.lat, search.lon);

    let query = this.geo.query('groups').within(center, search.radius, this.field);

    if( !search.byAnyDay ) {
      query = query.pipe(
        map(groups => {
          const rv = [];
          groups.forEach(m => {
            const day = search.byDay ? search.byDay 
              : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()];
            if ( (<any>m).schedule.day === day) {
              rv.push(m);
            }
          });
          return rv;
        })
      );
    }

    if (search.byRelativeTime) {
      query = query.pipe(
        map(groups => {
          const date = new Date();
          const time = date.toTimeString();
          const now = Date.parse('01/' + (date.getDay() + 1) + '/1970 ' + time.substring(0, time.indexOf(' ')) + ' UTC');
          const window = <number>search.byRelative.early * 60 * 1000;

          const rv = [];
          groups.forEach(m => {
            if (
              now <= ((<any>m).schedule.offset + <number>search.byRelative.late * 60 * 1000)
              && (now >= (<any>m).schedule.offset - window)) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    } else if( search.bySpecificTime ) {
      query = query.pipe(
        map(groups => {
          const rv = [];
          groups.forEach(m => {
            // TODO add range
            if ( (<any>m).schedule.time === search.bySpecific.start ) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    }

    query.subscribe(groups => {
      this.groups.next(<Group>(<any>groups));
    });
  }
}
