import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverAlemboPage } from './over-alembo';

@NgModule({
  declarations: [
    OverAlemboPage,
  ],
  imports: [
    IonicPageModule.forChild(OverAlemboPage),
  ],
  exports: [
    OverAlemboPage
  ]
})
export class OverAlemboPageModule {}
