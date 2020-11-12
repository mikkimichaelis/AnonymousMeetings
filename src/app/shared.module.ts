import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  providers: [
  ]
})
export class SharedModule { }
