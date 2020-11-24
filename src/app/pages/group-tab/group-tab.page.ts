import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-tab',
  templateUrl: './group-tab.page.html',
  styleUrls: ['./group-tab.page.scss'],
})
export class GroupTabPage implements OnInit {

  constructor(private route: ActivatedRoute, private groupSvc: GroupService) { }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if( this.groupSvc.id !== id ) {
      this.groupSvc.getGroup(id);
    }
  }
}
