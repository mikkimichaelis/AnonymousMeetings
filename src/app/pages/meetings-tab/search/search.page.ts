import { Component, OnInit } from '@angular/core';
import { MeetingsService } from 'src/app/services/meetings.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private meetingsService: MeetingsService ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // this.meetingsService.updateMeetings();
  };

}
