import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { darkStyle } from './map-dark-style';
import { Observable } from 'rxjs';
import { MeetingsService } from '../../../services/meetings.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage {

  constructor(public platform: Platform,
    public meetingsService: MeetingsService) { }

  ionViewDidEnter() {
    // this.meetingsService.getMeetings();
  };

  mapClicked($event: MouseEvent) { 
    // console.log(event);
  }

  async ngAfterViewInit() { }
}
