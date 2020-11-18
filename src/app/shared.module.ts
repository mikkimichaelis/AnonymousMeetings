import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  providers: [
  ]
})
export class SharedModule { }
