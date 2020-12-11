import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IGroup } from 'src/models';

import { BusyService, BUSY_SERVICE, GROUP_BLL_SERVICE, GROUP_SERVICE, IBusyService, IGroupBLLService, IGroupService, IToastService, IUserBLLService, IUserService, TOAST_SERVICE, USER_BLL_SERVICE, USER_SERVICE } from '../../../services';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {

  public get isHomeGroup(): boolean {
    return this.userBLLService.isHomeGroup( this.userService.user, this.groupSvc.group );
  }

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private busySvc: BusyService,
    @Inject(BUSY_SERVICE) private busyService: IBusyService,
    @Inject(TOAST_SERVICE) private toastService: IToastService,
    @Inject(USER_BLL_SERVICE) private userBLLService: IUserBLLService,
    @Inject(USER_SERVICE) private userService: IUserService,
    @Inject(GROUP_SERVICE) private groupSvc: IGroupService) { }

  async ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    try {
      this.busySvc.present();
      await this.groupSvc.getGroupAsync(id);
    } catch (e) {

    } finally {
      this.busySvc.dismiss();
    }
  }

  async makeHomegroup(group: IGroup) {
    const alert = await this.alertController.create({
      header: 'Homegroup',
      subHeader: 'Confirm',
      message: `Make ${group.name} your homegroup?`,
      buttons: ['Cancel',
        {
          text: 'OK',
          handler: async () => {
            try {
              this.busyService.present('Saving Changes');
              await this.userService.makeHomeGroup(group.id)
            } catch (e) {
              this.toastService.present('Error saving changes')
            } finally {
              this.busyService.dismiss();
            }
          }
        }]
    });
    alert.present();
  }
}
