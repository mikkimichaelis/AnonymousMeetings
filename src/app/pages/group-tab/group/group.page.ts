import { Component, Inject, OnInit } from '@angular/core';

import { GROUP_BLL_SERVICE, GROUP_SERVICE, IGroupBLLService, IGroupService } from '../../../services';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  constructor( 
    @Inject(GROUP_SERVICE) private groupSvc: IGroupService,
    @Inject(GROUP_BLL_SERVICE) private groupBLLSvc: IGroupBLLService ) { }

  ngOnInit() {
  }

}
