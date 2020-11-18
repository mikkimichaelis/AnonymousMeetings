import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingServiceInterface } from './loading.service.interface';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements LoadingServiceInterface {
  loader: any;

  constructor(private loadingController: LoadingController) { }

  async initialize() {}

  async present(content?: string) {
    this.dismiss();

    this.loader = await this.loadingController.create({ message: content ? content : 'Please wait...' });
    this.loader.present();
    
    this.loader.onDidDismiss(() => {
      this.loader = null;
    })
  }

  dismiss() {
    if (this.loader)
      this.loader.dismiss();
  }t 
}
