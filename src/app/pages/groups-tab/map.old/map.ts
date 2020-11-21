import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { darkStyle } from './map-dark-style';
import { Observable } from 'rxjs';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['./map.scss']
})
export class MapPage {

  constructor(public platform: Platform,
    public groupsService: GroupsService) { }

  ionViewDidEnter() {
    // this.groupsService.getGroups();
  };

  mapClicked($event: MouseEvent) { 
    // console.log(event);
  }

  async ngAfterViewInit() { }
}
