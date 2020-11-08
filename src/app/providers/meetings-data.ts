import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LatLngBounds, LatLng } from 'leaflet';

import { UserData } from './user-data';

@Injectable({
  providedIn: 'root'
})
export class MeetingsData {
  meetings: any;

  constructor(public http: HttpClient, public user: UserData) {}

  load(): any {
    if (this.meetings) {
      return of(this.meetings);
    } else {
      return this.http
        // .get('assets/data/meetings.json')
        .get('assets/data/indyaa.gps.json')
        .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    this.meetings = data.meetings;

    // loop through each meeting
    this.meetings.forEach((meeting: any) => {
      meeting.latLng = new LatLng(meeting.lat, meeting.lon);
      meeting.bounds = new LatLngBounds(
        new LatLng(meeting.boundingbox[1], meeting.boundingbox[3]),
        new LatLng(meeting.boundingbox[0], meeting.boundingbox[2]))
        // new LatLng(gc.bbox['_northEast'].lat, gc.bbox['_northEast'].lng),
        // new LatLng(gc.bbox['_southWest'].lat, gc.bbox['_southWest'].lng));
    });

    return this.meetings;
  }

  isAtMeeting(lat, lon): boolean {
    
    let bounds: LatLngBounds 

    return false;
  }

  getMeetings() {
    return this.load().pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  filterSession(
    session: any,
    queryWords: string[],
    excludeTracks: any[],
    segment: string
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach((trackName: string) => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  // getSpeakers() {
  //   return this.load().pipe(
  //     map((data: any) => {
  //       return data.speakers.sort((a: any, b: any) => {
  //         const aName = a.name.split(' ').pop();
  //         const bName = b.name.split(' ').pop();
  //         return aName.localeCompare(bName);
  //       });
  //     })
  //   );
  // }

  // getTracks() {
  //   return this.load().pipe(
  //     map((data: any) => {
  //       return data.tracks.sort();
  //     })
  //   );
  // }

  // getMap() {
  //   return this.load().pipe(
  //     map((data: any) => {
  //       return data.map;
  //     })
  //   );
  // }
}
