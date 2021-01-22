import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusyService, IMeetingService, IUserService, MEETING_SERVICE, USER_SERVICE } from 'src/app/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(private router: Router, private busySvc: BusyService, 
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(MEETING_SERVICE) private meetingService: IMeetingService) {
    
  }

  ngOnInit() {
  }

}
