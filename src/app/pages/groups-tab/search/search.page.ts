import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private groupsService: GroupsService ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // this.groupsService.updateGroups();
  };

}
