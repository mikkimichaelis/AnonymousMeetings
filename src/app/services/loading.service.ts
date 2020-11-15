import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loader: any;

  constructor(private loadingController: LoadingController) { }

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
