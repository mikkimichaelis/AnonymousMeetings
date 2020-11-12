import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonicModule,
  ],
  providers: [
  ]
})
export class SharedModule { }
