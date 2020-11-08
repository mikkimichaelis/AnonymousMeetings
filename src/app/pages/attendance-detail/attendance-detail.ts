import { Component } from '@angular/core';

import { MeetingsData } from '../../providers/meetings-data';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-attendance-detail',
  styleUrls: ['./attendance-detail.scss'],
  templateUrl: 'attendance-detail.html'
})
export class AttendanceDetailPage {
  attendance: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: MeetingsData,
    private userProvider: UserData,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.attendance && data.attendance[0] && data.attendance[0].groups) {
        const attendanceId = this.route.snapshot.paramMap.get('attendanceId');
        for (const group of data.attendance[0].groups) {
          if (group && group.attendances) {
            for (const attendance of group.attendances) {
              if (attendance && attendance.id === attendanceId) {
                this.attendance = attendance;

                this.isFavorite = this.userProvider.hasFavorite(
                  this.attendance.name
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/attendance`;
  }

  attendanceClick(item: string) {
    console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.userProvider.hasFavorite(this.attendance.name)) {
      this.userProvider.removeFavorite(this.attendance.name);
      this.isFavorite = false;
    } else {
      this.userProvider.addFavorite(this.attendance.name);
      this.isFavorite = true;
    }
  }

  shareAttendance() {
    console.log('Clicked share attendance');
  }
}
