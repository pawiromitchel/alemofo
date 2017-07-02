import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarktplaatsPage } from './marktplaats';

@NgModule({
  declarations: [
    MarktplaatsPage,
  ],
  imports: [
    IonicPageModule.forChild(MarktplaatsPage),
  ],
  exports: [
    MarktplaatsPage
  ]
})
export class MarktplaatsPageModule {}
