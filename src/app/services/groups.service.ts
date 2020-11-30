import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase/app';
import * as geofirex from 'geofirex';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as luxon from 'luxon';
import LogRocket from 'logrocket';

import { IGroup } from '../../models';
import { IGroupsService, ILoadingService } from './';
import { LOADING_SERVICE } from './injection-tokens'
import { ISearchSettings } from '../models';


@Injectable({
  providedIn: 'root'
})
export class GroupsService implements IGroupsService {

  public groups: BehaviorSubject<IGroup> = new BehaviorSubject<IGroup>(<any>[]);
  public verbose: string;

  private geo: geofirex.GeoFireClient;
  field = 'point';

  constructor(
    private firestore: AngularFirestore, 
    private transSvc: TranslateService,
    @Inject(LOADING_SERVICE) private loadingService: ILoadingService) { }

  initialize() {
    this.geo = geofirex.init(firebase);
  }

  async getGroups(search: ISearchSettings) {
    await this.loadingService.present();
    //var position: GeolocationPosition = await Geolocation.getCurrentPosition();
    //const center = this.geo.point(position.coords.latitude, position.coords.longitude); 
    //const center = this.geo.point(39.8249268571429, -84.8946604285714);
    const center = this.geo.point(search.lat, search.lon);

    // ${await this.transSvc.get('POSTCODE').toPromise()} 
    this.verbose = search.gps ? `${await this.transSvc.get('CURRENT.GPS').toPromise()}` : `${search.zipcode}`
    //this.verbose = `${this.verbose} ${await this.transSvc.get('RADIUS').toPromise()} ${search.radius}m`;

    //const active; = .collection('users').where('status', '==', 'active');
    //const q = this.db.list('/meetings').snapshotChanges();
    
    let query = this.geo.query('meetings').within(center, search.radius, this.field);

    if (!search.byAnyDay) {
      const dayVerbose = search.byDay !== `${await this.transSvc.get('TODAY').toPromise()}` ? search.byDay
        : await this.transSvc.get(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()]).toPromise();

        // ${await this.transSvc.get('ON').toPromise()}
      this.verbose = `${this.verbose} ${dayVerbose}`;

      // `${await this.transSvc.get('TODAY').toPromise()}`
      const day = search.byDay !== 'today' ? search.byDay
      : await this.transSvc.get(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(new Date()).getDay()]).toPromise();

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
      
      let today = luxon.DateTime.local();
      let start = luxon.DateTime.fromISO(search.bySpecific.start);
      start = luxon.DateTime.fromObject({
        year: today.year,
        month: today.month,
        day: today.day,
        hour: start.hour,
        minute: start.minute
      })

      let end = luxon.DateTime.fromISO(search.bySpecific.end);
      end = luxon.DateTime.fromObject({
        year: today.year,
        month: today.month,
        day: today.day,
        hour: end.hour,
        minute: end.minute
      })
      
      query = query.pipe(
        map(groups => {
          const rv = [];
          groups.forEach(m => {
            let time = luxon.DateTime.fromFormat((<any>m).schedule.time, 't');
            if( time >= start && time <= end) {
              rv.push(m);
            }
          });
          return rv;
        })
      )
    } else {
      this.verbose = `${this.verbose} ${(await this.transSvc.get('ANYTIME').toPromise()).toLowerCase()}`;
    }

    query.subscribe(async groups => {
      this.groups.next(<IGroup>(<any>groups));
      await this.loadingService.dismiss();
    },
    async error => {
      LogRocket.error(error);
      await this.loadingService.dismiss();
    });
  }
}
