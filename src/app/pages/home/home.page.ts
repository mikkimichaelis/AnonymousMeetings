import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/auth.service';
import { MeetingsService } from '../../providers/meetings.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor( private authService: AuthService, private meetingService: MeetingsService ) {}

  ngOnInit(): void {
    this.meetingService.updateMeetings(true);
  }

  logout() {
    this.authService.logout();
  }
}
