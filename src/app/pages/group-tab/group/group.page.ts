import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService, GROUP_SERVICE, IGroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  constructor( @Inject(GROUP_SERVICE) private groupSvc: IGroupService ) { }

  ngOnInit() {
  }

}
