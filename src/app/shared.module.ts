import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    TranslateModule.forChild()
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HttpClientModule
  ],
  providers: [
  ]
})
export class SharedModule { }
