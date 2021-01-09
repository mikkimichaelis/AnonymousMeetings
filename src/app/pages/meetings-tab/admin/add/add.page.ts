import { Component, Inject, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BusyService, BUSY_SERVICE } from 'src/app/services';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  meetingId: string = '333 3333 333';

  constructor(private modalCtrl: ModalController, @Inject(BUSY_SERVICE) private busyService: BusyService ){ }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  add() {
    this.busyService.present("Retrieving Zoom Meeting");
    
  }
}
