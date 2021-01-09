import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddPage } from './add/add.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  meetings = [];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async addMeeting() {
    let modal = await this.modalController.create({
      component: AddPage,
    })

    
    modal.present();
    const { data } = await modal.onDidDismiss()
  }
}
