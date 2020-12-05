import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BusyService, GROUP_BLL_SERVICE, GROUP_SERVICE, IGroupBLLService, IGroupService } from '../../../services';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  constructor( 
    private route: ActivatedRoute, 
    private busySvc: BusyService,
    @Inject(GROUP_SERVICE) private groupSvc: IGroupService,
    @Inject(GROUP_BLL_SERVICE) private groupBLLSvc: IGroupBLLService ) { }

  async ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.busySvc.present();
    await this.groupSvc.getGroupAsync('00368d38-cbed-4c67-ab72-ba811d641d4d');
    this.busySvc.dismiss();
  }
}
