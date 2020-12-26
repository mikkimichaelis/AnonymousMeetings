import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { IBusyService } from '.';

@Injectable({
  providedIn: 'root'
})
export class BusyService implements IBusyService {
  private loader: any;

  constructor(private loadingController: LoadingController) { }

  async initialize() { }

  async present(message?: string, duration?: number) {
    this.loader = await this.loadingController.create({
      message: message ? message : 'Please wait...',  // TODO remove hard coded defaults
      duration: duration ? duration : 10000
    });
    await this.loader.present();
  }

  async dismiss() {
    try {
      await this.loadingController.dismiss();
    } catch (e) { }
  }
}
