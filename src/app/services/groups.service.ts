import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from '../models/group';
import { ISearchSettings } from '../models/search-settings';
import * as luxon from 'luxon';

import { IGroupsService } from './groups.service.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService implements IGroupsService {

  public groups: BehaviorSubject<Group> = new BehaviorSubject<Group>(<any>[]);
  public verbose: string;

  private geo: geofirex.GeoFireClient;
  field = 'point';

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore, private transSvc: TranslateService) { }

  initialize() {
    this.geo = geofirex.init(firebase);
  }

  async getGroups(search: ISearchSettings) {
    //var position: GeolocationPosition = await Geolocation.getCurrentPosition();
    //const center = this.geo.point(position.coords.latitude, position.coords.longitude); 
    //const center = this.geo.point(39.8249268571429, -84.8946604285714);
    const center = this.geo.point(search.lat, search.lon);

    // ${await this.transSvc.get('POSTCODE').toPromise()} 
    this.verbose = search.gps ? `${await this.transSvc.get('CURRENT.GPS').toPromise()}` : `${search.zipcode}`
    //this.verbose = `${this.verbose} ${await this.transSvc.get('RADIUS').toPromise()} ${search.radius}m`;

    let query = this.geo.query('groups').within(center, search.radius, this.field);

    if (!search.byAnyDay) {
      const day = search.byDay !== `${await this.transSvc.get('TODAY').toPromise()}` ? search.byDay
        : await this.transSvc.get(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()]);

        // ${await this.transSvc.get('ON').toPromise()}
      this.verbose = `${this.verbose} ${day}`;

      query = query.pipe(
        map(groups => {
          const rv = [];
          groups.forEach(m => {
            if ((<any>m).schedule.day === day) {
              rv.push(m);
            }
          });
          return rv;
        })
      );
    } else {
      this.verbose = `${this.verbose} ${(await this.transSvc.get('ANYDAY').toPromise()).toLowerCase()}`;
    }

    if (search.byRelativeTime) {
      const within = `${await this.transSvc.get('WITHIN').toPromise()}`;
      query = query.pipe(
        map(groups => {
          const date = new Date();
          const time = date.toTimeString();
          const now = Date.parse('01/' + (date.getDay() + 1) + '/1970 ' + time.substring(0, time.indexOf(' ')) + ' UTC');
          const window = <number>search.byRelative.early * 60 * 1000;

          this.verbose = `${this.verbose} ${within} ${search.byRelative.early} hour(s)`;

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
    } else if (search.bySpecificTime) {
      const between = `${await this.transSvc.get('BETWEEN').toPromise()}`;
      this.verbose = `${this.verbose} ${between} ${luxon.DateTime.fromISO(search.bySpecific.start).toLocaleString(luxon.DateTime.TIME_SIMPLE)} - ${luxon.DateTime.fromISO(search.bySpecific.end).toLocaleString(luxon.DateTime.TIME_SIMPLE)}`;
      query = query.pipe(
        map(groups => {
          const rv = [];
          groups.forEach(m => {
            // TODO add range
            if ((<any>m).schedule.time === search.bySpecific.start) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    } else {
      this.verbose = `${this.verbose} ${(await this.transSvc.get('ANYTIME').toPromise()).toLowerCase()}`;
    }

    query.subscribe(groups => {
      this.groups.next(<Group>(<any>groups));
    });
  }
}
