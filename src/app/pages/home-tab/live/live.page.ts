import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusyService, IMeetingService, IUserService, MEETING_SERVICE, USER_SERVICE } from 'src/app/services';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {

  constructor(private router: Router, private busySvc: BusyService, 
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
    
  }

  ngOnInit() {
  }

}
